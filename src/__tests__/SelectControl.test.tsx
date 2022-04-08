import React from 'react';
import SelectControl from '../common/SelectControl';
import { render, screen } from '@testing-library/react';

describe('SelectControl', () => {
  test('should show first item on option list when initially rendering', () => {
    const Wrapper = () => {
      const [sampleSelection, setSampleSelection] = React.useState<string>('1');
      return <SelectControl name={'test'} options={['1', '2', '3']} setOptions={setSampleSelection} />;
    };
    render(<Wrapper />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
