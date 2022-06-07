import React from 'react';
import SelectControl from './SelectControl';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SelectControl', () => {
  const Wrapper = () => {
    const [sampleSelection, setSampleSelection] = React.useState<string>('1');
    return <SelectControl name={'test'} options={['1', '2', '3']} selection={sampleSelection} setSelection={setSampleSelection} />;
  };
  const user = userEvent.setup();

  test('should show first item on option list when initially rendering', () => {
    render(<Wrapper />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('should show all items on option list once expanded', async () => {
    render(<Wrapper />);
    await user.click(screen.getByRole('button'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('should show selected item once selected', async () => {
    render(<Wrapper />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: /3/i }));
    expect(screen.getByRole('button', { name: /3/i })).toBeInTheDocument();
  });
});
