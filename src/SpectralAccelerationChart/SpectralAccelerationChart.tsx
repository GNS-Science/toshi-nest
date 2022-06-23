import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import { curveLinear } from '@visx/curve';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';

import { SpectralAccelerationChartProps } from './spectralAccelerationChart.types';
import { XY } from '../types/common.types';
import PlotHeadings from '../common/PlotHeadings';
import { HazardColorScale } from '../types/hazardCurves.types';

const SpectralAccelerationChart: React.FC<SpectralAccelerationChartProps> = ({ data, colors, heading, subHeading, width }: SpectralAccelerationChartProps) => {
  const curvesDomain = useMemo(() => {
    const colorScale: HazardColorScale = {
      domain: [],
      range: [],
    };

    Object.keys(colors).map((key) => {
      colorScale.domain.push(key);
      colorScale.range.push(colors[key]);
    });
    return colorScale;
  }, [colors]);

  const ordinalColorScale = useMemo(() => {
    return scaleOrdinal({
      domain: curvesDomain.domain,
      range: curvesDomain.range,
    });
  }, [curvesDomain]);

  return (
    <>
      <div style={{ position: 'relative', width: width }}>
        <XYChart height={width * 0.75} width={width} xScale={{ type: 'linear', domain: [-1, 10] }} yScale={{ type: 'linear', domain: [0, 3] }}>
          <PlotHeadings heading={heading} subHeading={subHeading} width={width} />
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
          {Object.keys(data).map((key) => {
            return <AnimatedLineSeries key={key} role="curve" dataKey="Spectral Acceleration" data={data[key]} xAccessor={(d) => d.x} yAccessor={(d) => d.y} curve={curveLinear} />;
          })}
        </XYChart>
        <div style={{ width: 200, height: 100, position: 'absolute', top: width * 0.35, left: 70, display: 'flex' }}>
          <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: width * 0.02 }} shapeHeight={width * 0.02} />
        </div>
      </div>
    </>
  );
};

export default SpectralAccelerationChart;
