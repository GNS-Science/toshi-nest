import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HazardCurvesUncertianty from './HazardCurvesUncertainty';
import { curveGroup2, curveGroup1 } from './uncertaintyTestData';

export default {
  title: 'Charts/HazardCurvesUncertainty',
  component: HazardCurvesUncertianty,
} as ComponentMeta<typeof HazardCurvesUncertianty>;

const Template: ComponentStory<typeof HazardCurvesUncertianty> = (args) => <HazardCurvesUncertianty {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  gridColor: '#e0e0e0',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: [curveGroup1, curveGroup2],
};
