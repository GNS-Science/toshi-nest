import React from 'react';
import { ParentSize } from '@visx/responsive';

import SpectralAccelerationChart from './SpectralAccelerationChart';
import { SpectralAccelerationChartResponsiveProps } from '../types/spectralAccelerationChart.types';

const SpectralAccelerationChartResponsive: React.FC<SpectralAccelerationChartResponsiveProps> = (props: SpectralAccelerationChartResponsiveProps) => {
  const { data, heading, subHeading } = props;
  return (
    <>
      <ParentSize>
        {(parent) => <SpectralAccelerationChart data={data} heading={heading} subHeading={subHeading} width={parent.width} parentRef={parent.ref} resizeParent={parent.resize} />}
      </ParentSize>
    </>
  );
};

export default SpectralAccelerationChartResponsive;
