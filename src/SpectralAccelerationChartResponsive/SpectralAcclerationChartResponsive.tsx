import React from 'react';
import { ParentSize } from '@visx/responsive';

import SpectralAccelerationChart from '../SpectralAccelerationChart/SpectralAccelerationChart';
import { SpectralAccelerationChartResponsiveProps } from './spectralAccelerationChartResponsive.type';

const SpectralAccelerationChartResponsive: React.FC<SpectralAccelerationChartResponsiveProps> = (props: SpectralAccelerationChartResponsiveProps) => {
  const { colors, data, heading, subHeading } = props;
  return (
    <>
      <ParentSize>
        {(parent) => <SpectralAccelerationChart data={data} colors={colors} heading={heading} subHeading={subHeading} width={parent.width} parentRef={parent.ref} resizeParent={parent.resize} />}
      </ParentSize>
    </>
  );
};

export default SpectralAccelerationChartResponsive;
