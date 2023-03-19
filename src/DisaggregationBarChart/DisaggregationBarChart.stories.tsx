import { ComponentMeta } from '@storybook/react';
import DisaggregationBarChart from './DisaggregationBarChart';
import { ParentSize } from '@visx/responsive';
import { sampleData } from '../__tests__/testData/sample_data_1dbar';

export default {
  title: 'Charts/DisaggregationBarChart',
  component: DisaggregationBarChart,
} as ComponentMeta<typeof DisaggregationBarChart>;

export const Primary = () => {
  const colourArray = ['grey', 'blue'];
  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <ParentSize>{({ width, height }) => <DisaggregationBarChart colourArray={colourArray} barData={sampleData} width={width} height={height} verticalMargin={120} />}</ParentSize>
    </div>
  );
};
