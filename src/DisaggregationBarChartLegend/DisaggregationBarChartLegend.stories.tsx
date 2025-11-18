import React from 'react';
import { Meta } from '@storybook/react';
import DisaggregationBarChartLegend from './DisaggregationBarChartLegend';

export default {
  title: 'Charts/DisaggregationBarChartLegend',
  component: DisaggregationBarChartLegend,
} as Meta<typeof DisaggregationBarChartLegend>;

export const Primary = () => {
  const colourArray = ['grey', 'blue'];
  const domain = ['one', 'two'];
  return <DisaggregationBarChartLegend colourArray={colourArray} legendGlyphSize={20} domain={domain} legendTitle="Legend" />;
};
