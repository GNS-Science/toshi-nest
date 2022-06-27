import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SpectralAccelerationChart from './SpectralAccelerationChart';
import { saChartTestColors, saChartTestData } from './spectralAccelerationChartTestData';

export default {
  title: 'Charts/SpectralAccelerationChart',
  component: SpectralAccelerationChart,
} as ComponentMeta<typeof SpectralAccelerationChart>;

const Template: ComponentStory<typeof SpectralAccelerationChart> = (args) => <SpectralAccelerationChart {...args} />;

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
