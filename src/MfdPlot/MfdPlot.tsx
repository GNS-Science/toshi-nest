import React from 'react';
import { Axis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';

import { MfdPlotProps, Datum } from './MfdPlot.types';
export const MfdPlot = ({ data, width, height, xLabel, yLabel, labelProps, xLabelOffset, yLabelOffset, header, lineColours, yScaleDomain, legendDomain }: MfdPlotProps) => {
  const minMagnitude = Math.min(...data.map((e) => e.bin_center));
  const maxMagnitude = Math.max(...data.map((e) => e.bin_center));

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <XYChart height={height} width={width} xScale={{ type: 'linear', domain: [minMagnitude, maxMagnitude], zero: false }} yScale={{ type: 'log', domain: yScaleDomain }}>
        <text y={18} x={'50%'} alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize={'large'} fontWeight="bold" fontFamily={'"Roboto","Helvetica","Arial",sans-serif'}>
          {header}
        </text>
        <Axis numTicks={5} orientation="bottom" label={xLabel} labelProps={labelProps} labelOffset={xLabelOffset} />
        <Axis orientation="left" label={yLabel} labelProps={labelProps} labelOffset={yLabelOffset} />
        <RectClipPath id={'clip'} x={50} y={-50} width={width} height={height} />
        <Group clipPath={'url(#clip)'}>
          <AnimatedLineSeries dataKey="key" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.rate} stroke={lineColours[0]} />;
          <AnimatedLineSeries dataKey="cumulativeKey" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.cumulative_rate} stroke={lineColours[1]} />;
        </Group>
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          style={{ zIndex: 120000 }}
          renderTooltip={({ tooltipData }) => {
            const datum = tooltipData?.nearestDatum?.datum as Datum;
            return (
              <>
                <Typography>Rate: {datum?.rate?.toExponential(2)}</Typography>
                <Typography>Cumulative Rate: {datum?.cumulative_rate?.toExponential(2)}</Typography>
                <Typography>Magnitude: {datum?.bin_center.toPrecision(2)}</Typography>
              </>
            );
          }}
        />
      </XYChart>
      <LegendOrdinal
        direction="column"
        scale={scaleOrdinal({
          domain: legendDomain,
          range: lineColours,
        })}
        shape="line"
        shapeHeight={width * 0.02}
        style={{
          zIndex: 120001,
          fontSize: width * 0.03,
          position: 'absolute',
          top: width * 0.1,
          left: width * 0.6,
          display: 'flex',
        }}
        legendLabelProps={{ style: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' } }}
      />
    </div>
  );
};
export default MfdPlot;
