import { ComponentMeta } from '@storybook/react';
import DisaggregationHeatMap from './DisaggregationHeatMap';
import { ParentSize } from '@visx/responsive';

export default {
  title: 'Charts/DisaggregationHeatMap',
  component: DisaggregationHeatMap,
} as ComponentMeta<typeof DisaggregationHeatMap>;

export const Primary = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ParentSize>{(parent) => <DisaggregationHeatMap width={parent.width} height={parent.height} background={'#fff'} />}</ParentSize>
    </div>
  );
};
