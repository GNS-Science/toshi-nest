import React from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';

import { HazardCurvesUncertaintyProps, HazardCurveUncertaintyGroup } from './hazardCurvesUncertainty.types';

const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const { scaleType, xLimits, yLimits, gridColor, backgroundColor, numTickX, numTickY, width, curves } = props;
  const height = width * 0.75;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginBottom - marginTop;

  const xScaleLog = scaleLog<number>({
    domain: xLimits,
    range: [0, xMax],
  });

  const xScaleLinear = scaleLinear<number>({
    domain: xLimits,
    range: [0, xMax],
  });

  const xScale = scaleType === 'linear' ? xScaleLinear : xScaleLog;

  const yScale = scaleLog<number>({
    domain: yLimits,
    range: [yMax, 0],
  });

  const getAreaData = (curveGroup: HazardCurveUncertaintyGroup) => {
    const area: number[][] = [];

    curveGroup['lower1'].data.map((point, index) => {
      const areaPoint: number[] = [];
      areaPoint.push(point[0]);
      areaPoint.push(point[1]);
      areaPoint.push(curveGroup['upper1'].data[index][1]);
      !areaPoint.includes(0) && area.push(areaPoint);
    });

    return area;
  };

  return (
    <>
      <div>
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
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
