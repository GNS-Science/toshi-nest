import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HazardCurvesUncertianty from './HazardCurvesUncertainty';
import { area, curves } from './uncertaintyTestData';

export default {
  title: 'Charts/HazardCurvesUncertainty',
  component: HazardCurvesUncertianty,
} as ComponentMeta<typeof HazardCurvesUncertianty>;

const Template: ComponentStory<typeof HazardCurvesUncertianty> = (args) => <HazardCurvesUncertianty {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: 600,
  curves: curves,
  area: area,
};
