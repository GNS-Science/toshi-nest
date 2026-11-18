import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

import HazardChart from './HazardChart';
import { hazardChartCurves, hazardChartColors, hazardChartScalesConfig } from './hazardChartTestData';

export default {
  title: 'Charts/HazardChart',
  component: HazardChart,
} as Meta<typeof HazardChart>;

const Template: StoryFn<typeof HazardChart> = (args) => <HazardChart {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  curves: hazardChartCurves,
  colors: hazardChartColors,
  width: 500,
  scalesConfig: hazardChartScalesConfig,
  heading: 'Hazard Chart',
  subHeading: 'PGA',
  timePeriod: 100,
};
