import React from 'react';
import { ParentSize } from '@visx/responsive';
import HazardCurves, { HazardTableFilteredData, XYChartScaleConfig } from './HazardCurves';

interface ResponsiveHazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: string[];
  width: number;
  heading?: string;
  subHeading?: string;
}

const ResponsiveHazardCurves: React.FC<ResponsiveHazardCurvesProps> = ({ curves, scalesConfig, colors, width, heading, subHeading }: ResponsiveHazardCurvesProps) => {
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
          />
        )}
      </ParentSize>
    </>
  );
};

export default ResponsiveHazardCurves;
