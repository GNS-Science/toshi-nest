import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React from 'react';

interface HazardCurvesProps {
  parentWidth: number;
}

const HazardCurves: React.FC<HazardCurvesProps> = ({ parentWidth }: HazardCurvesProps) => {
  return (
    <>
      <p>hazard curves</p>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart height={parentWidth * 0.75} width={parentWidth} xScale={{ type: 'log', domain: [1e-3, 10] }} yScale={{ type: 'log', domain: [1e-5, 1] }}>
          <AnimatedAxis label="Acceleration (g)" orientation="bottom" />
          <AnimatedAxis label={`Probability of Exceedance in ${timeSpan} Years`} labelOffset={20} orientation="left" />
          <Tooltip
            showHorizontalCrosshair
            showVerticalCrosshair
            snapTooltipToDatumX
            snapTooltipToDatumY
            showDatumGlyph
            glyphStyle={{ fill: '#000' }}
            renderTooltip={({ tooltipData }) => {
              const datum = tooltipData?.nearestDatum?.datum as XY;
              const key = tooltipData?.nearestDatum?.key as string;
              if (key !== '2%' && key !== '10%' && datum) {
                return (
                  <>
                    <Typography>
                      <span
                        style={{
                          background: ordinalColorScale(key as string),
                          width: 8,
                          height: 8,
                          display: 'inline-block',
                          marginRight: 4,
                          borderRadius: 8,
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      {key}
                    </Typography>
                    <Typography>x: {datum.x.toExponential(2)}</Typography>
                    <Typography>y: {datum.y.toExponential(2)}</Typography>
                  </>
                );
              }
            }}
          />
          <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={10} />
          {Object.keys(data).map((key) => {
            return <AnimatedLineSeries key={key} dataKey={key} data={data[key]} xAccessor={(d: XY) => d?.x} yAccessor={(d: XY) => d?.y} stroke={curveColors[key]} />;
          })}
          {POE !== 'None' && <AnimatedLineSeries dataKey={POE} data={POEdata} xAccessor={(d) => d.x} yAccessor={(d) => d.y} stroke={'#989C9C'} />}
        </XYChart>
        <div style={{ width: 100, height: 100, position: 'absolute', top: parentWidth * 0.35, left: 70, display: 'flex' }}>
          <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: parentWidth * 0.02 }} shapeHeight={parentWidth * 0.02} />
        </div>
      </div>
    </>
  );
};

export default HazardCurves;
