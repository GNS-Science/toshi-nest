import React from 'react';
import MultiSelect from './MultiSelect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MultiSelect', () => {
  const Wrapper = () => {
    const [sampleSelection, setSampleSelection] = React.useState<string[]>(['1']);
    return <MultiSelect name={'test'} selection={sampleSelection} options={['1', '2', '3']} setSelection={setSampleSelection} />;
  };
  const NoSelectionWrapper = () => {
    const [sampleSelection, setSampleSelection] = React.useState<string[]>([]);
    return <MultiSelect name={'test'} selection={sampleSelection} options={['1', '2', '3']} setSelection={setSampleSelection} />;
  };
  const user = userEvent.setup();

  test('should show first item on option list when initially rendering', () => {
    render(<Wrapper />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('should show all items on option list once expanded', async () => {
    render(<Wrapper />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('should show multiple selected once multiple selected', async () => {
    render(<Wrapper />);
    expect(screen.getByRole('combobox').textContent).toBe('1');
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /3/i }));
    expect(screen.getByText(/multiple selected/i)).toBeInTheDocument();
  });

  test('should show selected with one selected', async () => {
    render(<NoSelectionWrapper />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /3/i }));
    expect(screen.getAllByText(/3/i)).toHaveLength(2);
  });
});
