import React from 'react';
import { Meta } from '@storybook/react-webpack5';
import DisaggregationHeatMap from './DisaggregationHeatMap';
import { ParentSize } from '@visx/responsive';
import { getSeededRandom } from '@visx/mock-data';
import genBins from '@visx/mock-data/lib/generators/genBins';

export default {
  title: 'Charts/DisaggregationHeatMap',
  component: DisaggregationHeatMap,
} as Meta<typeof DisaggregationHeatMap>;

export const Primary = () => {
  const cool1 = '#122549';
  const cool2 = '#b4fbde';

  const seededRandom = getSeededRandom(0.41);

  const binData = genBins(
    /* length = */ 16,
    /* height = */ 16,
    /** binFunc */ (idx) => 150 * idx,
    /** countFunc */ (i, number) => 25 * (number - i) * seededRandom(),
  );

  return (
    <div style={{ height: '100vh' }}>
      <ParentSize>
        {(parent) => (
          <DisaggregationHeatMap
            width={parent.width}
            height={parent.height}
            background={'#fff'}
            colours={[cool1, cool2]}
            binData={binData}
            xAxisLabel={'x axis'}
            yAxisLabel={'y axis'}
            colourScaleLabel={'colour scale'}
            colourScaleTicks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            colourScaleValues={['#E2E5E9', '#CFD5DB', '#C7CFD6', '#B4C3C9', '#A7C3C3', '#A4CEC6', '#ADEAD4', '#b4fbde']}
          />
        )}
      </ParentSize>
    </div>
  );
};
