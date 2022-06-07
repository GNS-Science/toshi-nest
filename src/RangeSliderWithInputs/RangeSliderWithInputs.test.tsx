import React, { useState } from 'react';
import RangeSliderWithInputs from './RangeSliderWithInputs';
import { render, screen, fireEvent } from '@testing-library/react';

describe('RangeSliderWithInputs', () => {
  const Wrapper = () => {
    const label = 'test';
    const inputProps = {
      step: 1,
      min: 0,
      max: 100,
      type: 'number',
    };
    const [values, setValues] = useState([0, 100]);
    return <RangeSliderWithInputs label={label} inputProps={inputProps} valuesRange={values} setValues={setValues} />;
  };

  test('renders the label', () => {
    render(<Wrapper />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('renders the initial values', () => {
    render(<Wrapper />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
