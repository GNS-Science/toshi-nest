import React from 'react';
import HazardCurves from '../../charts/HazardCurves';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { XY } from '../../interfaces/common';
import { HazardCurveColors, XYChartScaleConfig } from '../../interfaces/HazardView';
import { render } from '@testing-library/react';
import { testData } from '../testData/hazardCurveTestData';
import userEvent from '@testing-library/user-event';

const colors: HazardCurveColors = {
  PGA: '#000000',
  0.1: '#FE1100',
};

const scalesConfig: XYChartScaleConfig = {
  x: { type: 'log', domain: [1e-3, 10] },
  y: { type: 'log', domain: [1e-5, 1] },
};

describe('Hazard Curves works as expected', () => {
  const Wrapper = () => {
    return <HazardCurves curves={testData} width={500} scalesConfig={scalesConfig} colors={colors} heading={'Test Heading'} subHeading={'Test Subheading'} gridNumTicks={5} POE={'None'} />;
  };
  const user = userEvent.setup();

  test('graph is deplayed', () => {
    render(<Wrapper />);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    expect(screen.getByText('Acceleration (g)')).toBeInTheDocument();
    expect(screen.getByText('Probability of Exceedance')).toBeInTheDocument();
    expect(screen.getByText('PGA')).toBeInTheDocument();
    expect(screen.getByText('0.1')).toBeInTheDocument();
  });

  test('two curves are printed', async () => {
    render(<Wrapper />);
    const curves = screen.getAllByRole('curve');
    expect(curves.length).toBe(2);
  });
});

test('displays POE line when given a value', () => {
  const Wrapper = () => {
    return <HazardCurves curves={testData} width={500} scalesConfig={scalesConfig} colors={colors} heading={'Test Heading'} subHeading={'Test Subheading'} gridNumTicks={5} POE={'2%'} />;
  };
  render(<Wrapper />);
  const POEline = screen.getByRole('POE');
  expect(POEline).toBeInTheDocument();
});
