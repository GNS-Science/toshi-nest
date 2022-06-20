import React, { useMemo } from 'react';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal } from '@visx/legend';

import { XY } from '../types/common.types';
import { Typography } from '@mui/material';
import { HazardCurvesProps, HazardColorScale } from '../types/hazardCurves.types';
import PlotHeadings from '../common/PlotHeadings';

const HazardCurves: React.FC<HazardCurvesProps> = (props: HazardCurvesProps) => {
  const { curves, scalesConfig, colors, width, heading, subHeading, parentRef, gridNumTicks, POE } = props;

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
      domain: POE === 'None' ? [...curvesDomain.domain] : [...curvesDomain.domain, `PoE ${POE}`],
      range: POE === 'None' ? [...curvesDomain.range] : [...curvesDomain.range, '#989C9C'],
    });
  }, [POE, curvesDomain]);

  const POEline = useMemo(() => {
    const getPoE = () => {
      const yValue = POE === '2%' ? -Math.log(1 - 0.02) / 50 : -Math.log(1 - 0.1) / 50;
      return [
        { x: 1e-3, y: yValue },
        { x: 10, y: yValue },
      ];
    };
    if (POE !== 'None') {
    }
    return getPoE();
  }, [POE]);

  return (
    <>
      <div style={{ position: 'relative', width: width }}>
        <XYChart height={width * 0.75} width={width} xScale={scalesConfig.x} yScale={scalesConfig.y}>
          <PlotHeadings heading={heading} subHeading={subHeading} width={width} />
          <AnimatedAxis label="Acceleration (g)" orientation="bottom" />
          <AnimatedAxis label={`Annual Probability of Exceedance`} labelOffset={20} orientation="left" />
          <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={gridNumTicks} />
          <RectClipPath id={parentRef ? 'responsive-clip' : 'clip'} x={50} y={-50} width={width} height={width * 0.75} />
          <Group clipPath={parentRef ? 'url(#responsive-clip)' : 'url(#clip)'}>
            {Object.keys(curves).map((key) => {
              return <AnimatedLineSeries role="curve" key={key} dataKey={key} data={curves[key]} xAccessor={(d: XY) => d?.x} yAccessor={(d: XY) => d?.y} stroke={colors[key]} />;
            })}
            {POE !== 'None' && <AnimatedLineSeries role="POE" dataKey={POE} data={POEline} xAccessor={(d) => d.x} yAccessor={(d) => d.y} stroke={'#989C9C'} />}
          </Group>
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
        </XYChart>
        <div style={{ width: 100, height: 100, position: 'absolute', top: width * 0.35, left: 70, display: 'flex' }}>
          <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: width * 0.02 }} shapeHeight={width * 0.02} />
        </div>
      </div>
    </>
  );
};

export default HazardCurves;
