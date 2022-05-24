import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { curveLinear } from '@visx/curve';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';

import { SpectralAccelerationChartProps } from './spectralAccelerationChart.types';
import { XY } from '../types/common.types';

const SpectralAccelerationChart: React.FC<SpectralAccelerationChartProps> = ({ data, heading, subHeading, width }: SpectralAccelerationChartProps) => {
  const [headingSize, setHeadingSize] = useState<number>(0);
  const [subHeadingSize, setSubHeadingSize] = useState<number>(0);

  const headingProps = {
    alignmnetbaseline: 'middle',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  };

  useEffect(() => {
    width * 0.035 >= 24 ? setHeadingSize(24) : setHeadingSize(width * 0.035);
    width * 0.025 >= 15 ? setSubHeadingSize(15) : setSubHeadingSize(width * 0.025);
  }, [width]);

  return (
    <>
      <div style={{ position: 'relative', width: width }}>
        <XYChart height={width * 0.75} width={width} xScale={{ type: 'linear', domain: [-1, 10] }} yScale={{ type: 'linear', domain: [0, 3] }}>
          <text y={18} x={'50%'} {...headingProps} fontSize={headingSize} fontWeight="bold">
            {heading}
          </text>
          <text y={headingSize + 18} x={'50%'} {...headingProps} fontSize={subHeadingSize} style={{ margin: 10 }}>
            {subHeading}
          </text>
          <AnimatedAxis label="Spectral Period (s)" orientation="bottom" />
          <AnimatedAxis label="Pseudo-Spectral Acceleration (g)" orientation="left" />
          <Tooltip
            showHorizontalCrosshair
            showVerticalCrosshair
            snapTooltipToDatumX
            snapTooltipToDatumY
            showDatumGlyph
            glyphStyle={{ fill: '#000' }}
            renderTooltip={({ tooltipData }) => {
              const datum = tooltipData?.nearestDatum?.datum as XY;
              if (datum) {
                return (
                  <>
                    <Typography>x: {datum.x === 0.01 ? 0 : datum.x}</Typography>
                    <Typography>y: {datum.y.toExponential(2)}</Typography>
                  </>
                );
              }
            }}
          />
          <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={6} />
          <AnimatedLineSeries role="curve" dataKey="Spectral Acceleration" data={data} xAccessor={(d) => d.x} yAccessor={(d) => d.y} curve={curveLinear} />
        </XYChart>
      </div>
    </>
  );
};

export default SpectralAccelerationChart;
