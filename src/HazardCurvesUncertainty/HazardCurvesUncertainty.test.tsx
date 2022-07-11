import React from 'react';
import { render, screen } from '@testing-library/react';

import HazardCurvesUncertianty, { HazardCurvesUncertaintyProps } from './HazardCurvesUncertainty';
import { area, curves } from './uncertaintyTestData';

const props: HazardCurvesUncertaintyProps = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  gridColor: '#e0e0e0',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: curves,
  area: area,
};

const Wrapper = () => {
  return <HazardCurvesUncertianty {...props} />;
};

test('graph is displayed', () => {
  render(<Wrapper />);

  expect(screen.getAllByRole('curve')).toHaveLength(5);
});
