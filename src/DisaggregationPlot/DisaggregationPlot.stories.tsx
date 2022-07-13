import { ComponentMeta } from '@storybook/react';
import DisaggregationPlot from './DisaggregationPlot';

export default {
  title: 'Charts/DisaggregationPlot',
  component: DisaggregationPlot,
} as ComponentMeta<typeof DisaggregationPlot>;

export const Primary = () => {
  return <DisaggregationPlot />;
};
