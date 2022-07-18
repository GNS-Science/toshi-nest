import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SpectralAccelChart from './SpectralAccelChart';
import { saChartTestColors, saChartTestData } from '../__tests__/testData/spectralAccelChartTestData';

export default {
  title: 'Charts/SpectralAccelChart',
  component: SpectralAccelChart,
} as ComponentMeta<typeof SpectralAccelChart>;

const Template: ComponentStory<typeof SpectralAccelChart> = (args) => <SpectralAccelChart {...args} />;

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
