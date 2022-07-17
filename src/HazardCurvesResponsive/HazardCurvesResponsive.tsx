import React from 'react';
import { ParentSize } from '@visx/responsive';

import HazardChart from '../HazardChart/HazardChart';
import { HazardChartResponsiveProps } from '../types/hazardCurves.types';

const HazardCurvesResponsive: React.FC<HazardChartResponsiveProps> = ({ curves, scalesConfig, colors, heading, subHeading, gridNumTicks, poe }: HazardChartResponsiveProps) => {
  return (
    <>
      <ParentSize>
        {(parent) => (
          <HazardChart
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
