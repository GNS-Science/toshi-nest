import React from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';

import { HazardCurvesUncertaintyProps } from './hazardCurvesUncertainty.types';

const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const { scaleType, xLimits, yLimits, gridColor, backgroundColor, numTickX, numTickY, width, curves, area } = props;
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

  const colors: Record<string, string> = {
    mean: '#2b8cbe',
    '0.025': '#4eb3d3',
    '0.2': '#4eb3d3',
    '0.8': '#4eb3d3',
    '0.975': '#4eb3d3',
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
              <Threshold<number[]>
                id={'hazard-uncertianty-area'}
                data={area}
                x={(d) => xScale(d[0])}
                y0={(d) => yScale(d[2])}
                y1={(d) => yScale(d[1])}
                clipAboveTo={0}
                clipBelowTo={yMax}
                aboveAreaProps={{
                  fill: '#4eb3de',
                  fillOpacity: 0.4,
                }}
              />
              {Object.keys(curves).map((key) => (
                <LinePath key={key} role="curve" data={curves[key]} x={(d) => xScale(d[0])} y={(d) => yScale(d[1])} stroke={colors[key]} />
              ))}
            </Group>
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
