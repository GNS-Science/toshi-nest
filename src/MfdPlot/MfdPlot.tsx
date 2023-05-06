import React from 'react';
import { Axis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';

import { MfdPlotProps, Datum } from './MfdPlot.types';
export const MfdPlot = ({ data, width, height, xLabel, yLabel, labelProps, xLabelOffset, yLabelOffset }: MfdPlotProps) => {
  const minMagnitude = Math.min(...data.map((e) => e.bin_center));
  const maxMagnitude = Math.max(...data.map((e) => e.bin_center));

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <XYChart height={height} width={width} xScale={{ type: 'linear', domain: [minMagnitude, maxMagnitude], zero: false }} yScale={{ type: 'log', domain: [1e-5, 1] }}>
        <Axis numTicks={5} orientation="bottom" label={xLabel} labelProps={labelProps} labelOffset={xLabelOffset} />
        <Axis orientation="left" label={yLabel} labelProps={labelProps} labelOffset={yLabelOffset} />
        <RectClipPath id={'clip'} x={50} y={-50} width={width} height={height} />
        <Group clipPath={'url(#clip)'}>
          <AnimatedLineSeries dataKey="key" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.rate} stroke={'blue'} />;
          <AnimatedLineSeries dataKey="cumulativeKey" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.cumulative_rate} stroke={'red'} />;
        </Group>
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData }) => {
            const datum = tooltipData?.nearestDatum?.datum as Datum;
            return (
              <>
                <Typography>Rate: {datum?.rate?.toExponential(2)}</Typography>
                <Typography>Cumulative Rate: {datum?.cumulative_rate?.toExponential(2)}</Typography>
              </>
            );
          }}
        />
        <LegendOrdinal
          direction="column"
          scale={scaleOrdinal({
            domain: ['Rate', 'Cumulative Rate'],
            range: ['blue', 'red'],
          })}
          shape="line"
          shapeHeight={width * 0.02}
          style={{
            fontSize: width * 0.02,
            position: 'absolute',
            top: width * 0.1,
            left: width * 0.5,
            display: 'flex',
          }}
        />
      </XYChart>
    </div>
  );
};
export default MfdPlot;
