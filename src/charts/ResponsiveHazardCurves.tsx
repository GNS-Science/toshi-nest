import React from 'react';
import { ParentSize } from '@visx/responsive';
import HazardCurves, { HazardCurveColors, HazardTableFilteredData, XYChartScaleConfig } from './HazardCurves';

interface ResponsiveHazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  width: number;
  heading?: string;
  subHeading?: string;
  gridNumTicks: number;
}

const ResponsiveHazardCurves: React.FC<ResponsiveHazardCurvesProps> = ({ curves, scalesConfig, colors, width, heading, subHeading, gridNumTicks }: ResponsiveHazardCurvesProps) => {
  return (
    <>
      <ParentSize>
        {(parent) => (
          <HazardCurves
            curves={curves}
            scalesConfig={scalesConfig}
            colors={colors}
            heading={heading}
            subHeading={subHeading}
            width={parent.width}
            parentRef={parent.ref}
            resizeParent={parent.resize}
            gridNumTicks={gridNumTicks}
          />
        )}
      </ParentSize>
    </>
  );
};

export default ResponsiveHazardCurves;
