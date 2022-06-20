import React from 'react';
import { ParentSize } from '@visx/responsive';

import HazardCurves from '../HazardCurves/HazardCurves';
import { ResponsiveHazardCurvesProps } from '../types/hazardCurves.types';

const ResponsiveHazardCurves: React.FC<ResponsiveHazardCurvesProps> = ({ curves, scalesConfig, colors, heading, subHeading, gridNumTicks, poe }: ResponsiveHazardCurvesProps) => {
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
            poe={poe}
          />
        )}
      </ParentSize>
    </>
  );
};

export default ResponsiveHazardCurves;
