import React, { useCallback, useMemo } from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';
import { useTooltip, TooltipWithBounds, useTooltipInPortal } from '@visx/tooltip';
import { Line } from '@visx/shape';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';

import { HazardCurvesUncertaintyProps, HazardCurveUncertaintyGroup, UncertaintyDatum } from './hazardCurvesUncertainty.types';
import { getAreaData, getSortedMeanCurves } from './hazardCurvesUncertainty.service';

const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const { scaleType, xLimits, yLimits, gridColor, backgroundColor, numTickX, numTickY, width, curves, tooltip, crosshair } = props;
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

  const yScale = useMemo(
    () =>
      scaleLog<number>({
        domain: yLimits,
        range: [yMax, 0],
      }),
    [yLimits, yMax],
  );

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
  } = useTooltip<UncertaintyDatum>({
    tooltipOpen: true,
  });

  const meanCurves = useMemo(() => getSortedMeanCurves(curves), [curves]);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const point = localPoint(event) || { x: 0, y: 0 };

      const x = xScale.invert(point.x - 50);

      const bisectData = bisector(function (d: UncertaintyDatum) {
        return d[0];
      }).right;

      const index = bisectData(meanCurves, x);
      const d0 = meanCurves[index + 1];
      const d1 = meanCurves[index];

      const range0 = yScale(d0[1]);
      const range1 = yScale(d1[1]);
      const rangeMouse = point.y - 50;

      const closest = Math.abs(range0 - rangeMouse) > Math.abs(range1 - rangeMouse) ? d1 : d0;

      showTooltip({
        tooltipLeft: xScale(closest[0]),
        tooltipTop: yScale(closest[1]),
        tooltipData: closest ?? [0, 0],
      });
    },
    [showTooltip, meanCurves, xScale, yScale],
  );

  return (
    <>
      <div ref={containerRef} onMouseMove={handlePointerMove} onMouseLeave={() => hideTooltip()}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={backgroundColor} rx={14} />
          <Group left={marginLeft} top={marginTop}>
            <AxisBottom top={yMax} scale={xScale} numTicks={numTickX} stroke={gridColor} tickLength={3} tickStroke={gridColor} />
            <AxisLeft scale={yScale} numTicks={numTickY} stroke={gridColor} tickLength={3} tickStroke={gridColor} />
            <GridColumns scale={xScale} width={xMax} height={yMax} stroke={gridColor} />
            <GridRows scale={yScale} width={xMax} height={yMax} stroke={gridColor} />
            <RectClipPath id="uncertainty-clip" height={yMax} width={xMax} />
            <Group clipPath={'url(#uncertainty-clip'}>
              {curves.map((curveGroup: HazardCurveUncertaintyGroup, index) => (
                <Group key={index}>
                  {Object.keys(curveGroup).map((key, index) => (
                    <LinePath key={`${index}-${key}`} role="curve" data={curveGroup[key].data} x={(d) => xScale(d[0])} y={(d) => yScale(d[1])} stroke={curveGroup[key].strokeColor ?? ''} />
                  ))}
                  <Threshold<number[]>
                    id={`uncertianty-area-${index}`}
                    data={getAreaData(curveGroup)}
                    x={(d) => xScale(d[0])}
                    y0={(d) => yScale(d[2])}
                    y1={(d) => yScale(d[1])}
                    clipAboveTo={0}
                    clipBelowTo={yMax}
                    aboveAreaProps={{
                      fill: curveGroup['upper1'].strokeColor,
                      fillOpacity: 0.4,
                    }}
                  />
                </Group>
              ))}
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
                  <p>x: {tooltipData && tooltipData[0].toExponential()}</p>
                  <p>y: {tooltipData && tooltipData[1].toExponential()}</p>
                </TooltipInPortal>
              </div>
            )}
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
