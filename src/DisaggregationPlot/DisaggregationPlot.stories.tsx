import React from 'react';
import { Meta } from '@storybook/react';
import DisaggregationPlot from './DisaggregationPlot';
import { data } from '../__tests__/testData/disaggregationPlotTestData';

export default {
  title: 'Charts/DisaggregationPlot',
  component: DisaggregationPlot,
} as Meta<typeof DisaggregationPlot>;

const parsedData = JSON.parse(data);

export const Primary = () => {
  return <DisaggregationPlot data={parsedData.data} layout={parsedData.layout} />;
};
