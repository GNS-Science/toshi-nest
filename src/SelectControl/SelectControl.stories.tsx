import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectControl from './SelectControl';

export default {
  title: 'Example/SelectControl',
  component: SelectControl,
  argTypes: {
    options: {},
  },
} as ComponentMeta<typeof SelectControl>;

const Template: ComponentStory<typeof SelectControl> = (args) => <SelectControl {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'Label',
  options: ['1', '2', '3'],
};
