import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react-webpack5';

import MultiSelect from './MultiSelect';

export default {
  title: 'Controls/MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

export const Primary = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return <MultiSelect options={['1', '2', '3']} name="name" selection={selected} setSelection={setSelected} />;
};
