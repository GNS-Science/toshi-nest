import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

import SpectralAccelChart from './SpectralAccelChart';
import { saChartTestColors, saChartTestData } from '../__tests__/testData/spectralAccelChartTestData';

export default {
  title: 'Charts/SpectralAccelChart',
  component: SpectralAccelChart,
} as Meta<typeof SpectralAccelChart>;

const Template: StoryFn<typeof SpectralAccelChart> = (args) => <SpectralAccelChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: saChartTestData,
  colors: saChartTestColors,
  width: 500,
  heading: 'Heading',
  subHeading: 'subHeading',
};

// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, label: '😄👍😍💯' };
