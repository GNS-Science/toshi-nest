import React from 'react';
import { ParentSize } from '@visx/responsive';
import HazardCurves from './HazardCurves';
import { HazardCurveColors, HazardTableFilteredData, XYChartScaleConfig } from '../interfaces/HazardView';

interface ResponsiveHazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  heading?: string;
  subHeading?: string;
  gridNumTicks: number;
  POE: 'None' | '2%' | '10%';
}

const ResponsiveHazardCurves: React.FC<ResponsiveHazardCurvesProps> = ({ curves, scalesConfig, colors, heading, subHeading, gridNumTicks, POE }: ResponsiveHazardCurvesProps) => {
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
            POE={POE}
          />
        )}
      </ParentSize>
    </>
  );
};

export default ResponsiveHazardCurves;
