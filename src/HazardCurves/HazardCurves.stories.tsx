import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HazardCurves from './HazardCurves';
import { hazardCurves, hazardCurvesColors, hazardCurvesScalesConfig } from './hazardCurvesTestData';

export default {
  title: 'Charts/HazardCurves',
  component: HazardCurves,
} as ComponentMeta<typeof HazardCurves>;

const Template: ComponentStory<typeof HazardCurves> = (args) => <HazardCurves {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  curves: hazardCurves,
  colors: hazardCurvesColors,
  width: 500,
  scalesConfig: hazardCurvesScalesConfig,
  heading: 'Hazard Chart',
  subHeading: 'PGA',
};
