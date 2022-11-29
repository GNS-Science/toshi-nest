import FaultModelTable from './faultModelTable';
import { ComponentMeta } from '@storybook/react';
import solvisResponse from '../__tests__/testData/leafletMapTestData';

export default {
  title: 'Utils/FaultModelTable',
  component: FaultModelTable,
} as ComponentMeta<typeof FaultModelTable>;

export const Primary = () => {
  const id = solvisResponse.solution_id;
  const data = solvisResponse.ruptures;
  return <FaultModelTable id={id} data={data} />;
};
