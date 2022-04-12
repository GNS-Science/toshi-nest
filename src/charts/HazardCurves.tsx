import React, { useEffect, useState, useMemo } from 'react';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';

import { XY } from '../interfaces/common';

export type HazardTableFilteredData = Record<string, XY[]>;

export interface ScaleConfig {
  type: 'log' | 'linear' | 'band';
  domain: number[];
}

export interface XYChartScaleConfig {
  x: ScaleConfig;
  y: ScaleConfig;
}

export type HazardCurveColors = Record<string, string>;

interface HazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  width: number;
  heading?: string;
  subHeading?: string;
  parentRef?: HTMLDivElement | null;
  resizeParent?: (state: any) => void;
  gridNumTicks: number;
}

const HazardCurves: React.FC<HazardCurvesProps> = ({ curves, scalesConfig, colors, width, heading, subHeading, parentRef, gridNumTicks }: HazardCurvesProps) => {
  const [headingSize, setHeadingSize] = useState<number>(0);
  const [subHeadingSize, setSubHeadingSize] = useState<number>(0);

  const headingProps = {
    alignmnetBaseline: 'middle',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  };

  useEffect(() => {
    width * 0.035 >= 24 ? setHeadingSize(24) : setHeadingSize(width * 0.035);
    width * 0.025 >= 15 ? setSubHeadingSize(15) : setSubHeadingSize(width * 0.025);
  }, [width]);

  return (
    <>
      <XYChart height={width * 0.75} width={width} xScale={scalesConfig.x} yScale={scalesConfig.y}>
        {heading && (
          <text y={18} x={'50%'} {...headingProps}>
            {heading}
          </text>
        )}
        {subHeading && (
          <text y={headingSize + 18} x={'50%'} {...headingProps} fontSize={subHeadingSize}>
            {subHeading}
          </text>
        )}
        <AnimatedAxis label="Acceleration (g)" orientation="bottom" />
        <AnimatedAxis label={`Probability of Exceedance`} labelOffset={20} orientation="left" />
        <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={gridNumTicks} />
        <RectClipPath id={parentRef ? 'responsive-clip' : 'clip'} x={50} y={-50} width={width} height={width * 0.75} />
        <Group clipPath={parentRef ? 'url(#responsive-clip)' : 'url(#clip)'}>
          {Object.keys(curves).map((key, index) => {
            return <AnimatedLineSeries key={key} dataKey={key} data={curves[key]} xAccessor={(d: XY) => d?.x} yAccessor={(d: XY) => d?.y} stroke={colors[key]} />;
          })}
        </Group>
      </XYChart>
    </>
  );
};

export default HazardCurves;
