import React from 'react';
import { ParentSize } from '@visx/responsive';

import SpectralAccelChart from '../SpectralAccelChart/SpectralAccelChart';
import { SpectralAccelChartResponsiveProps } from './spectralAccelChartResponsive.type';

const SpectralAccelChartResponsive: React.FC<SpectralAccelChartResponsiveProps> = (props: SpectralAccelChartResponsiveProps) => {
  const { colors, data, heading, subHeading } = props;
  return (
    <>
      <ParentSize>
        {(parent) => <SpectralAccelChart data={data} colors={colors} heading={heading} subHeading={subHeading} width={parent.width} parentRef={parent.ref} resizeParent={parent.resize} />}
      </ParentSize>
    </>
  );
};

export default SpectralAccelChartResponsive;
