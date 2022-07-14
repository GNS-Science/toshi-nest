import React from 'react';
import { render, screen } from '@testing-library/react';

import HazardCurvesUncertianty from './HazardCurvesUncertainty';
import { HazardCurvesUncertaintyProps } from './hazardCurvesUncertainty.types';
import { curveGroup1, curveGroup2 } from './uncertaintyTestData';

const props: HazardCurvesUncertaintyProps = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  gridColor: '#e0e0e0',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: [curveGroup1, curveGroup2],
  tooltip: false,
  crosshair: false,
};

const Wrapper = () => {
  return <HazardCurvesUncertianty {...props} />;
};

test('graph is displayed', () => {
  render(<Wrapper />);

  expect(screen.getAllByRole('curve')).toHaveLength(10);
});
