import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';

import SelectControl from './SelectControl';

export default {
  title: 'Controls/SelectControl',
  component: SelectControl,
} as ComponentMeta<typeof SelectControl>;

export const Primary = () => {
  // Sets the hooks for both the label and primary props
  const [selected, setSelected] = useState<string>('1');

  // Sets a click handler to change the label's value

  return <SelectControl options={['1', '2', '3']} name="name" selection={selected} setSelection={setSelected} tooltip="lorem ipsum" />;
};
