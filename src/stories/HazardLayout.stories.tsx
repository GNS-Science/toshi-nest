import React from 'react';
import { ComponentMeta } from '@storybook/react';

import HazardUncertaintyChart from '../HazardUncertaintyChart';
import SpectralAccelChart from '../SpectralAccelChart';

export default {
  title: 'Layouts/Hazard',
  component: HazardUncertaintyChart,
  subcomponents: { SpectralAccelChart },
} as ComponentMeta<typeof HazardUncertaintyChart>;
