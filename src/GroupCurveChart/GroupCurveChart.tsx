import React, { useCallback, useMemo } from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear, scaleOrdinal } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { Line } from '@visx/shape';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';
import { LegendOrdinal } from '@visx/legend';

import { GroupCurveChartProps, Datum } from './groupCurveChart.types';
import { getAreaData, getSortedMeanCurves } from './groupCurveChart.service';
import PlotHeadings from '../common/PlotHeadings';
import { HazardColorScale } from '../types/hazardCharts.types';
import AxisLabel from '../common/AxisLabel';

const GroupCurveChart: React.FC<GroupCurveChartProps> = (props: GroupCurveChartProps) => {
  const {
    spectral,
    scaleType,
    yScaleType,
    xLabel,
    yLabel,
    xLimits,
    yLimits,
    gridColor,
    backgroundColor,
    numTickX,
    numTickY,
    width,
    curves,
    tooltip,
    crosshair,
    heading,
    subHeading,
    poe,
    uncertainty,
  } = props;
  const height = width * 0.75;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginBottom - marginTop;

  const xScale = useMemo(() => {
    return scaleType === 'linear'
      ? scaleLinear<number>({
          domain: xLimits,
          range: [0, xMax],
        })
      : scaleLog<number>({
          domain: xLimits,
          range: [0, xMax],
        });
  }, [scaleType, xLimits, xMax]);

  const yScale = useMemo(() => {
    return yScaleType === 'linear'
      ? scaleLinear<number>({
          domain: yLimits,
          range: [yMax, 0],
        })
      : scaleLog<number>({
          domain: yLimits,
          range: [yMax, 0],
        });
  }, [yScaleType, yLimits, yMax]);

  const curvesDomain = useMemo(() => {
    const colorScale: HazardColorScale = {
      domain: [],
      range: [],
    };

    Object.keys(curves).forEach((key) => {
      colorScale.domain.push(key);
      colorScale.range.push(curves[key]['upper1'].strokeColor ?? '#000000');
    });
    return colorScale;
  }, [curves]);

  const ordinalColorScale = useMemo(() => {
    if (!spectral) {
      return scaleOrdinal({
        domain: !poe ? [...curvesDomain.domain] : [...curvesDomain.domain, !spectral && `POE ${poe * 100}% (50 Yrs)`],
        range: !poe ? [...curvesDomain.range] : [...curvesDomain.range, !spectral && '#989C9C'],
      });
    } else {
      return scaleOrdinal({
        domain: [...curvesDomain.domain],
        range: [...curvesDomain.range],
      });
    }
  }, [curvesDomain, poe, spectral]);

  const poeLine = useMemo(() => {
    const getPoE = (poeValue: number) => {
      const yValue = -Math.log(1 - poeValue) / 50;
      return [
        { x: 1e-3, y: yValue },
        { x: 10, y: yValue },
      ];
    };
    return poe ? getPoE(poe) : [];
  }, [poe]);

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const {
    showTooltip,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<Datum>({
    tooltipOpen: false,
  });

  const meanCurves = useMemo(() => getSortedMeanCurves(curves), [curves]);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const point = localPoint(event) || { x: 0, y: 0 };

      const x = xScale.invert(point.x - 50);

      const bisectData = bisector(function (d: Datum) {
        return d[0];
      }).right;

      const lengthOfCurve = new Set(meanCurves.map((d) => d[0])).size;
      const numOfCurves = meanCurves.length / lengthOfCurve;
      const indexLeft = bisectData(meanCurves, x) - numOfCurves;
      const indexRight = bisectData(meanCurves, x);
      const leftDatum = meanCurves[indexLeft] ?? [0, 0];
      const rightDatum = meanCurves[indexRight] ?? [0, 0];
      const indexLeftRange = Math.abs(leftDatum[0] - x);
      const indexRightRange = Math.abs(rightDatum[0] - x);
      let index = 0;
      if (indexLeftRange > indexRightRange) {
        index = indexRight;
      } else {
        index = indexLeft;
      }
      const rangeMouse = point.y - 50;

      const dArray = meanCurves.slice(index, index + numOfCurves);
      const rangeArray = dArray.map((d) => Math.abs(yScale(d[1]) - rangeMouse));
      const rangeIndex = rangeArray.indexOf(Math.min(...rangeArray));
      const closest = dArray[rangeIndex];
      const pga = index === 0 ? 1 : 0;

      showTooltip({
        tooltipLeft: xScale(closest[0]),
        tooltipTop: yScale(closest[1]),
        tooltipData: [...closest, rangeIndex, pga] ?? [0, 0, ''],
      });
    },
    [showTooltip, meanCurves, xScale, yScale],
  );

  return (
    <>
      <div style={{ position: 'relative' }} ref={containerRef} onMouseMove={handlePointerMove} onMouseLeave={() => hideTooltip()}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={backgroundColor ?? '#ffffff'} rx={14} />
          <PlotHeadings heading={heading} subHeading={subHeading} width={width} />
          <AxisLabel label={xLabel as string} width={width} height={height} orientation="bottom" />
          <AxisLabel label={yLabel as string} width={width} height={height} orientation="left" />
          <Group left={marginLeft} top={marginTop}>
            <AxisBottom top={yMax} scale={xScale} numTicks={numTickX ?? 5} stroke={gridColor} tickLength={3} tickStroke={gridColor} />
            <AxisLeft scale={yScale} numTicks={numTickY ?? 5} stroke={gridColor} tickLength={3} tickStroke={gridColor} />
            <GridColumns scale={xScale} width={xMax} height={yMax} stroke={gridColor ?? '#efefef'} />
            <GridRows scale={yScale} width={xMax} height={yMax} stroke={gridColor ?? '#efefef'} />
            <RectClipPath id="uncertainty-clip" height={yMax} width={xMax} />
            <Group clipPath={'url(#uncertainty-clip'}>
              {uncertainty ? (
                <>
                  {Object.keys(curves).map((key, index) => (
                    <Group key={key}>
                      {Object.keys(curves[key]).map((curveType, index) => (
                        <LinePath
                          key={`${index}-${key}`}
                          role="curve"
                          data={curves[key][curveType].data}
                          x={(d) => xScale(d[0])}
                          y={(d) => yScale(d[1])}
                          stroke={curves[key][curveType].strokeColor ?? ''}
                          strokeOpacity={curves[key][curveType].strokeOpacity ?? 1}
                        />
                      ))}
                      <Threshold<number[]>
                        id={spectral ? `uncertainty-area-spectral-${index}` : `uncertainty-area-${index}`}
                        data={getAreaData(curves[key], scaleType)}
                        x={(d) => xScale(d[0])}
                        y0={(d) => yScale(d[2])}
                        y1={(d) => yScale(d[1])}
                        clipAboveTo={0}
                        clipBelowTo={yMax}
                        aboveAreaProps={{
                          fill: curves[key]['upper1'].strokeColor,
                          fillOpacity: 0.4,
                        }}
                      />
                    </Group>
                  ))}
                </>
              ) : (
                <>
                  {Object.keys(curves).map((key, index) => (
                    <LinePath
                      key={`${index}-${key}`}
                      role="curve"
                      data={curves[key]['mean'].data}
                      x={(d) => xScale(d[0])}
                      y={(d) => yScale(d[1])}
                      stroke={curves[key]['mean'].strokeColor ?? ''}
                      strokeWidth={2.0}
                    />
                  ))}
                </>
              )}
              {poe && !spectral && <LinePath role="POE" data={poeLine} x={(d) => xScale(d.x)} y={(d) => yScale(d.y)} stroke="#989C9C" />}
            </Group>
            {crosshair && tooltipOpen && (
              <g>
                <Line from={{ x: tooltipLeft, y: 0 }} to={{ x: tooltipLeft, y: yMax }} stroke="#bdbdbd" strokeWidth={2} pointerEvents="none" strokeDasharray="5,2" />
                <Line from={{ x: 0, y: tooltipTop }} to={{ x: xMax, y: tooltipTop }} stroke="#bdbdbd" strokeWidth={2} pointerEvents="none" strokeDasharray="5,2" />
                <circle cx={tooltipLeft} cy={tooltipTop} r={4} fill="#bdbdbd" fillOpacity={0.7} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none" />
              </g>
            )}
            {tooltip && tooltipOpen && (
              <div>
                <div
                  className="position-indicator"
                  style={{
                    transform: `translate(${tooltipLeft}px, ${tooltipLeft}px)`,
                    borderRadius: '50%',
                    background: '#35477d',
                    position: 'absolute',
                  }}
                />
                <TooltipInPortal key={Math.random()} left={tooltipLeft + marginLeft + 10} top={tooltipTop + marginTop + 10}>
                  <p>
                    <strong>{tooltipData && Object.keys(curves)[tooltipData[2]]}</strong>
                  </p>
                  <p>
                    {xLabel}: {tooltipData && spectral && tooltipData[3] ? 'PGA' : tooltipData && tooltipData[0].toExponential(1)}
                  </p>
                  <p>
                    {yLabel}: {tooltipData && tooltipData[1].toExponential(1)}
                  </p>
                </TooltipInPortal>
              </div>
            )}
          </Group>
        </svg>
        <div style={{ width: width * 0.24, height: 100, position: 'absolute', top: marginTop, left: width * 0.7, display: 'flex' }}>
          <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: width * 0.016 <= 13 ? 13 : width * 0.015 }} shapeHeight={width * 0.02} />
        </div>
      </div>
    </>
  );
};

export default GroupCurveChart;
