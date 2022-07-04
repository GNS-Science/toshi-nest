import React from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft, AxisTop, AxisRight } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLog } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { RectClipPath } from '@visx/clip-path';

export interface HazardCurvesUncertaintyProps {
  width: number;
  curves: Record<string, number[][]>;
  area: number[][];
}
const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const { width, curves, area } = props;
  const height = width * 0.75;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginBottom - marginTop;
  const gridColor = '#e0e0e0';

  const xScale = scaleLog<number>({
    domain: [0.01, 5],
    range: [1, xMax],
  });

  const yScale = scaleLog<number>({
    domain: [1, 0.01],
    range: [marginBottom, yMax],
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
      <p>Uncertainty</p>
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={'#f3f3f3'} rx={14} />
          <Group left={marginLeft}>
            <AxisBottom top={yMax} scale={xScale} />
            <AxisLeft scale={yScale} />
            <GridColumns scale={xScale} top={marginTop} width={xMax} height={yMax} stroke={gridColor} />
            <GridRows scale={yScale} width={xMax} height={yMax} stroke={gridColor} />
            <RectClipPath id="clip-path" height={yMax} width={xMax} x={marginLeft} y={marginTop} />
            <Threshold<number[]>
              id={`${Math.random()}`}
              data={area}
              x={(d) => xScale(d[0])}
              y0={(d) => yScale(d[2])}
              y1={(d) => yScale(d[1])}
              clipAboveTo={marginTop}
              clipBelowTo={yMax}
              belowAreaProps={{
                fill: '#4eb3d3',
                fillOpacity: 0.4,
              }}
              aboveAreaProps={{
                fill: '#4eb3de',
                fillOpacity: 0.4,
              }}
            />
            {Object.keys(curves).map((key) => (
              <LinePath key={key} data={curves[key]} x={(d) => xScale(d[0])} y={(d) => yScale(d[1])} stroke={colors[key]} />
            ))}
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
