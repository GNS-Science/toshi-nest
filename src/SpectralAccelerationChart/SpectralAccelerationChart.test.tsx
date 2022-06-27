import React from 'react';
import { screen, render } from '@testing-library/react';

import SpectralAccelerationChart from './SpectralAccelerationChart';

const testData = {
  'test curve': [
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
};

describe('Spectral Acceleration Chart as expected', () => {
  const Wrapper = () => {
    return <SpectralAccelerationChart data={testData} colors={{ 'test curve': '#000000' }} width={500} heading={'test heading'} subHeading={'test subHeading'} />;
  };

  test('graph is displayed with headings', () => {
    render(<Wrapper />);
    expect(screen.getByText('test heading')).toBeInTheDocument();
    expect(screen.getByText('test subHeading')).toBeInTheDocument();
  });

  test('graph is displayed with headings', () => {
    render(<Wrapper />);
    const curves = screen.getAllByRole('curve');
    expect(curves.length).toBe(1);
  });
});
