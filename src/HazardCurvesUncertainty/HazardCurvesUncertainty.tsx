import React, { useCallback, useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { Line } from '@visx/shape';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';

import { HazardCurvesUncertaintyProps, HazardCurveUncertaintyGroup } from './hazardCurvesUncertainty.types';
import { getAreaData } from './hazardCurvesUncertainty.service';

const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { scaleType, xLimits, yLimits, gridColor, backgroundColor, numTickX, numTickY, width, curves } = props;
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

  type ToolTipData = string;
  const { containerBounds, TooltipInPortal } = useTooltipInPortal({ scroll: true, detectBounds: true });
  const {
    showTooltip,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<ToolTipData>({
    tooltipOpen: true,
    tooltipData: 'this is a tooltip',
  });

  const meanCurves: number[][] = [];

  curves.map((curveGroup) => {
    curveGroup['mean'].data.forEach((point) => {
      meanCurves.push(point);
    });
  });

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const point = localPoint(event) || { x: 0, y: 0 };
      if (!point) return;

      const x = xScale.invert(point.x);
      const y = yScale.invert(point.y);

      const bisectData = bisector(function (d: any) {
        return d[0];
      }).left;

      const index = bisectData(meanCurves, x, y);

      const xValue = xScale(meanCurves[index][0]);
      const yValue = yScale(meanCurves[index][1]);

      showTooltip({
        tooltipLeft: xValue,
        tooltipTop: yValue,
        tooltipData: `moving mouse weewoo wee`,
      });
    },
    [showTooltip, containerBounds],
  );

  return (
    <>
      <div onMouseMove={handlePointerMove}>
        <svg width={width} height={height} ref={svgRef}>
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
            {tooltipOpen && (
              <g>
                <Line from={{ x: tooltipLeft, y: 0 }} to={{ x: tooltipLeft, y: yMax }} stroke="#e6550d" strokeWidth={2} pointerEvents="none" strokeDasharray="5,2" />
                <Line from={{ x: 0, y: tooltipTop }} to={{ x: xMax, y: tooltipTop }} stroke="#e6550d" strokeWidth={2} pointerEvents="none" strokeDasharray="5,2" />
                <circle cx={tooltipLeft} cy={tooltipTop + 1} r={4} fill="#e6550d" fillOpacity={0.7} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none" />
              </g>
            )}
            {/* {tooltipOpen && (
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
                <TooltipInPortal key={Math.random()} left={tooltipLeft} top={tooltipTop}>
                  <p>tooltip</p>
                  <p>{tooltipData}</p>
                </TooltipInPortal>
              </div>
            )} */}
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
