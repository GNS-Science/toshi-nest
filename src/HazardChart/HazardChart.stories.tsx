import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HazardChart from './HazardChart';
import { hazardChartCurves, hazardChartColors, hazardChartScalesConfig } from './hazardChartTestData';

export default {
  title: 'Charts/HazardChart',
  component: HazardChart,
} as ComponentMeta<typeof HazardChart>;

const Template: ComponentStory<typeof HazardChart> = (args) => <HazardChart {...args} />;

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
