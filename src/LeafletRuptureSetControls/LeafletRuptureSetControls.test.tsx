import React, { useState } from 'react';
import LeafletRuptureSetControls from './LeafletRuptureSetControls';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LeafletRuptureSetControls', () => {
  const Wrapper = () => {
    const [sampleSelection, setSampleSelection] = useState(['Wellington']);
    const [magnitude, setMagnitude] = useState<number[]>([5, 10]);
    const [ruptureRate, setRuptureRate] = useState<number[]>([-20, 1]);
    const cities = ['Wellington', 'Auckland', 'Christchurch', 'Hamilton', 'Dunedin', 'Palmerston North', 'Napier'];
    const ruptureSetControlSelectName = 'Cities';
    const magInputProps = {
      step: 0.1,
      min: 5,
      max: 10,
      type: 'number',
    };

    const ruptureRateInputProps = {
      step: 1,
      min: -20,
      max: 0,
      type: 'number',
    };
    return (
      <LeafletRuptureSetControls
        name={ruptureSetControlSelectName}
        options={cities}
        selection={sampleSelection}
        setSelection={setSampleSelection}
        magnitude={magnitude}
        setMagnitude={setMagnitude}
        ruptureRate={ruptureRate}
        setRuptureRate={setRuptureRate}
        magnitudeInputProps={magInputProps}
        ruptureRateInputProps={ruptureRateInputProps}
      />
    );
  };
  userEvent.setup();

  test('renders the label', () => {
    render(<Wrapper />);
    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  test('renders the initial values', () => {
    render(<Wrapper />);
    expect(screen.getByText('Wellington')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Magnitude')).toBeInTheDocument();
    expect(screen.getByText('Rupture Rate')).toBeInTheDocument();
  });
});
