import React from 'react';
import { render, screen } from '@testing-library/react';

import GroupCurveChart from './GroupCurveChart';
import { GroupCurveChartProps } from './groupCurveChart.types';
import { curveGroup1, curveGroup2 } from '../__tests__/testData/uncertaintyTestData';

const props: GroupCurveChartProps = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  gridColor: '#e0e0e0',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: false,
  crosshair: false,
  heading: 'heading',
  subHeading: 'subHeading',
  poe: 0.02,
  uncertainty: true,
  timePeriod: 100,
};

const Wrapper = () => {
  return <GroupCurveChart {...props} />;
};

test('graph is displayed', () => {
  render(<Wrapper />);

  expect(screen.getAllByRole('curve')).toHaveLength(10);
});
