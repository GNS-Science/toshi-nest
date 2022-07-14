import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TooltipLearn from './TooltipLearn';

export default {
  title: 'Charts/TooltipLearn',
  component: TooltipLearn,
} as ComponentMeta<typeof TooltipLearn>;

const Template: ComponentStory<typeof TooltipLearn> = (args) => <TooltipLearn {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: 700,
  height: 700,
  showControls: true,
};
