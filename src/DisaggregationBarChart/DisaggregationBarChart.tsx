import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { DisaggregationBarChartProps } from './DisaggregationBarChart.types';

export const DisaggregationBarChart = ({ barData, colourArray, width, height, verticalMargin, xLabel, yLabel, xNumTicks, yNumTicks, leftMargin }: DisaggregationBarChartProps) => {
  // bounds
  const xMax = width - leftMargin;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: barData.x,
        padding: 0.1,
      }),
    [barData, xMax],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...barData.y1, ...barData.y2)],
      }),
    [barData, yMax],
  );

  return width < 10 ? null : (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2} left={leftMargin}>
          <AxisLeft label={yLabel} scale={yScale} top={0} stroke="#1b1a1e" tickStroke="#1b1a1e" numTicks={yNumTicks || 10} />
          <AxisBottom label={xLabel} top={yMax} scale={xScale} tickFormat={(x) => x.toFixed(2)} stroke="#1b1a1e" tickStroke="#1b1a1e" numTicks={xNumTicks || 10} />
          {barData.y1.map((data, i) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(data) ?? 0);
            const barX = xScale(barData.x[i]);
            const barY = yMax - barHeight;
            return <Bar key={`bar-${data}`} x={barX} y={barY} width={barWidth} height={barHeight} fill={colourArray[0]} />;
          })}
          {barData.y2.map((data, i) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(data) ?? 0);
            const barX = xScale(barData.x[i]);
            const barY = yMax - barHeight;
            return <Bar key={`bar-${data}`} x={barX} y={barY} width={barWidth} height={barHeight} fill={colourArray[1]} />;
          })}
        </Group>
      </svg>
    </div>
  );
};

export default DisaggregationBarChart;
