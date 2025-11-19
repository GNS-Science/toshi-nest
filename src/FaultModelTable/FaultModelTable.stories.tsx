import React from 'react';
import FaultModelTable from './FaultModelTable';
import { Meta } from '@storybook/react-webpack5';
import solvisResponse from '../__tests__/testData/leafletMapTestData';

export default {
  title: 'Utils/FaultModelTable',
  component: FaultModelTable,
} as Meta<typeof FaultModelTable>;

export const Primary = () => {
  const id = solvisResponse.solution_id;
  const data = solvisResponse.ruptures;
  return <FaultModelTable id={id} data={data} />;
};
