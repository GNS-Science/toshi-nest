import React from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft, AxisTop, AxisRight } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLinear, scaleLog } from '@visx/scale';
import { LinePath } from '@visx/shape';

export interface HazardCurvesUncertaintyProps {
  id: string;
  width: number;
}
const HazardCurvesUncertianty: React.FC<HazardCurvesUncertaintyProps> = (props: HazardCurvesUncertaintyProps) => {
  const { id, width } = props;
  const height = width * 0.75;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginBottom - marginTop;
  const gridColor = '#e0e0e0';

  const xScale = scaleLog<number>({
    domain: [1, 100],
    range: [1, xMax],
  });

  const yScale = scaleLog<number>({
    domain: [100, 1],
    range: [marginBottom, yMax],
  });

  return (
    <>
      <p>thingy is thingy</p>
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={'#f3f3f3'} rx={14} />
          <Group left={marginLeft}>
            <AxisBottom top={yMax} scale={xScale} />
            <AxisLeft scale={yScale} />
            <GridColumns scale={xScale} top={marginTop} width={xMax} height={yMax} stroke={gridColor} />
            <GridRows scale={yScale} width={xMax} height={yMax} stroke={gridColor} />
            <LinePath
              data={[
                [1, 1],
                [2, 2],
                [3, 3],
                [100, 100],
              ]}
              x={(d) => xScale(d[0])}
              y={(d) => yScale(d[1])}
              stroke="#222"
            />
          </Group>
        </svg>
      </div>
    </>
  );
};

export default HazardCurvesUncertianty;
