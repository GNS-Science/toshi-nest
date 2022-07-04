import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HazardCurvesUncertianty from './HazardCurvesUncertainty';

export default {
  title: 'Charts/HazardCurvesUncertainty',
  component: HazardCurvesUncertianty,
} as ComponentMeta<typeof HazardCurvesUncertianty>;

const Template: ComponentStory<typeof HazardCurvesUncertianty> = (args) => <HazardCurvesUncertianty {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id: '',
  width: 600,
};
