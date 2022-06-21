import React from 'react';
import { ParentSize } from '@visx/responsive';

import HazardCurves from '../HazardCurves/HazardCurves';
import { HazardCurvesResponsiveProps } from '../types/hazardCurves.types';

const HazardCurvesResponsive: React.FC<HazardCurvesResponsiveProps> = ({ curves, scalesConfig, colors, heading, subHeading, gridNumTicks, poe }: HazardCurvesResponsiveProps) => {
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

export default HazardCurvesResponsive;
