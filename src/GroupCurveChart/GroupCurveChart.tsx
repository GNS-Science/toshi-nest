import React, { useMemo, useCallback, useState } from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear, scaleOrdinal } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { BoxPlot } from '@visx/stats';
import { RectClipPath } from '@visx/clip-path';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { Line } from '@visx/shape';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';
import { Legend, LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { GlyphSquare } from '@visx/glyph';

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
    timePeriod,
  } = props;
  const height = width * 0.75;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginBottom - marginTop;

  const [boxPlotToolTipActive, setBoxPlotToolTipActive] = useState(false);

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

  const legendGlyphSize = 15;

  const ordinalColorScale = useMemo(() => {
    if (!spectral) {
      return scaleOrdinal({
        domain: !poe ? [...curvesDomain.domain] : [...curvesDomain.domain, !spectral && `POE ${poe * 100}% (${timePeriod} Yrs)`],
        range: !poe ? [...curvesDomain.range] : [...curvesDomain.range, !spectral && '#989C9C'],
      });
    } else {
      return scaleOrdinal({
        domain: [...curvesDomain.domain],
        range: [...curvesDomain.range],
      });
    }
  }, [curvesDomain, poe, spectral, timePeriod]);

  const poeLine = useMemo(() => {
    const getPoE = (poeValue: number) => {
      const yValue = -Math.log(1 - poeValue) / timePeriod;
      return [
        { x: 1e-3, y: yValue },
        { x: 10, y: yValue },
      ];
    };
    return poe ? getPoE(poe) : [];
  }, [poe, timePeriod]);

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const locations = [...new Set(Object.keys(curves).map((k) => k.split(' ')[2]))];
  const vs30s = [...new Set(Object.keys(curves).map((k) => k.split(' ')[0]))];
  const imts = [...new Set(Object.keys(curves).map((k) => k.split(' ')[1]))];

  const locationsWithVs30 = locations.map((location) => {
    return vs30s.map((vs30) => {
      return curvesDomain.domain.filter((k) => ~k.indexOf(vs30) && ~k.indexOf(location));
    });
  });

  const generateLegendRange = () => {
    const domain = locationsWithVs30.flat(1);

    return domain
      .map((d, i) => {
        switch (d.length) {
          case 1:
            return [<rect key={'a' + i} fill={curvesDomain.range[i * imts.length]} width={legendGlyphSize} height={legendGlyphSize / 5} y={7} />];
          case 2:
            return [
              <rect key={'a' + i} fill={curvesDomain.range[i * imts.length]} width={legendGlyphSize} height={legendGlyphSize / 5} y={7} />,
              <line key={'b' + i} stroke={curvesDomain.range[i * imts.length]} x1="0" y1="10" x2="250" y2="10" strokeDasharray="4,5" y={7} strokeWidth={legendGlyphSize / 5} />,
            ];
          case 3:
            return [
              <rect key={'a' + i} fill={curvesDomain.range[i * imts.length]} width={legendGlyphSize} height={legendGlyphSize / 5} y={7} />,
              <line key={'b' + i} stroke={curvesDomain.range[i * imts.length]} x1="0" y1="10" x2="250" y2="10" strokeDasharray="4,5" y={7} strokeWidth={legendGlyphSize / 5} />,
              <line key={'c' + i} stroke={curvesDomain.range[i * imts.length]} x1="0" y1="10" x2="250" y2="10" strokeDasharray="1,3" y={7} strokeWidth={legendGlyphSize / 5} />,
            ];
          default:
            return [];
        }
      })
      .flat();
  };

  const legendRange = generateLegendRange();

  const legendDomain = locationsWithVs30.flat(2);

  if (!spectral && poe) {
    legendDomain.push(`POE ${poe * 100}% (${timePeriod} Yrs)`);
    legendRange.push(<rect key={'poe'} fill={'#989C9C'} width={legendGlyphSize} height={legendGlyphSize / 5} y={7} />);
  }

  const shapeScale = scaleOrdinal<string, React.FC | React.ReactNode>({
    domain: legendDomain,
    range: legendRange,
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

      if (scaleType === 'log' && index <= 0) {
        setBoxPlotToolTipActive(true);
      } else {
        setBoxPlotToolTipActive(false);
      }

      showTooltip({
        tooltipLeft: xScale(closest[0]),
        tooltipTop: yScale(closest[1]),
        tooltipData: [...closest, rangeIndex, pga] ?? [0, 0, ''],
      });
    },
    [showTooltip, meanCurves, xScale, yScale, scaleType],
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
                      {scaleType === 'log' && spectral && (
                        <BoxPlot
                          min={curves[key]['lower2'].data[0][1]}
                          max={curves[key]['upper2'].data[0][1]}
                          left={xScale(curves[key]['mean'].data[0][0])}
                          firstQuartile={curves[key]['lower1'].data[0][1]}
                          thirdQuartile={curves[key]['upper1'].data[0][1]}
                          median={curves[key]['mean'].data[0][1]}
                          boxWidth={10}
                          fill={curves[key]['upper1'].strokeColor}
                          fillOpacity={0.5}
                          stroke={curves[key]['upper1'].strokeColor}
                          valueScale={yScale}
                        />
                      )}
                      {Object.keys(curves[key]).map((curveType, index) => (
                        <LinePath
                          key={`${index}-${key}`}
                          role="curve"
                          data={curves[key][curveType].data}
                          x={(d) => xScale(d[0])}
                          y={(d) => yScale(d[1])}
                          stroke={curves[key]['upper1'].strokeColor}
                          strokeOpacity={curves[key][curveType].strokeOpacity ?? 1}
                          strokeDasharray={curves[key][curveType].strokeDashArray ?? '0'}
                          strokeWidth={1.3}
                          defined={(d, index) => {
                            if (scaleType === 'log' && index === 0) {
                              return false;
                            }
                            return true;
                          }}
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
                          fillOpacity: 0.2,
                        }}
                        defined={(d, index) => {
                          if (scaleType === 'log' && index === 0) {
                            return false;
                          }
                          return true;
                        }}
                      />
                    </Group>
                  ))}
                </>
              ) : (
                <>
                  {Object.keys(curves).map((key, index) => (
                    <Group key={key}>
                      {scaleType === 'log' && spectral && (
                        <GlyphSquare key={key} size={50} fill={curves[key]['upper1'].strokeColor} left={xScale(curves[key]['mean'].data[0][0])} top={yScale(curves[key]['mean'].data[0][1])} />
                      )}
                      <LinePath
                        key={`${index}-${key}`}
                        role="curve"
                        data={curves[key]['mean'].data}
                        x={(d) => xScale(d[0])}
                        y={(d) => yScale(d[1])}
                        markerMid="url(#marker-x)"
                        stroke={curves[key]['upper1'].strokeColor}
                        strokeOpacity={curves[key]['mean'].strokeOpacity ?? 1}
                        strokeDasharray={spectral ? '0' : curves[key]['mean'].strokeDashArray}
                        strokeWidth={1.3}
                        defined={(d, index) => {
                          if (scaleType === 'log' && index === 0) {
                            return false;
                          }
                          return true;
                        }}
                      />
                    </Group>
                  ))}
                </>
              )}
              {poe && !spectral && <LinePath role="POE" data={poeLine} x={(d) => xScale(d.x)} y={(d) => yScale(d.y)} stroke="#989C9C" />}
            </Group>
            {crosshair && tooltipOpen && !boxPlotToolTipActive && (
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
                    <strong>{tooltipData && Object.keys(curves)[tooltipData[6]]}</strong>
                  </p>
                  <p>
                    {xLabel}: {tooltipData && spectral && tooltipData[7] ? 'PGA' : tooltipData && tooltipData[0].toExponential(1)}
                  </p>
                  <p>
                    {yLabel}: {tooltipData && tooltipData[1].toExponential(1)}
                  </p>
                </TooltipInPortal>
              </div>
            )}
          </Group>
        </svg>
        <div style={{ width: width * 0.24, position: 'absolute', top: marginTop, left: width * 0.8, display: 'flex' }}>
          {spectral ? (
            <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: width * 0.016 <= 13 ? 13 : width * 0.015 }} shapeHeight={width * 0.02} />
          ) : (
            <Legend scale={shapeScale}>
              {(labels) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {labels.map((label, i) => {
                    const shape = shapeScale(label.datum);
                    const isValidElement = React.isValidElement(shape);
                    return (
                      <LegendItem
                        key={`legend-quantile-${i}`}
                        flexDirection="row"
                        style={{ display: 'flex', alignItems: 'center', fontSize: width * 0.016 <= 13 ? 13 : width * 0.015, flex: '1 1 0%', margin: '0px' }}
                      >
                        <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '0px 4px' }}>
                          {isValidElement ? React.cloneElement(shape as React.ReactElement) : React.createElement(shape as React.ComponentType<{ fill: string }>)}
                        </svg>
                        <LegendLabel style={{ margin: '2px', width: '90px' }} align="left">
                          {label.text}
                        </LegendLabel>
                      </LegendItem>
                    );
                  })}
                </div>
              )}
            </Legend>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupCurveChart;
