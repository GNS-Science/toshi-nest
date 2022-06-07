import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeafletDrawer from './LeafletDrawer';

describe('LeafletDrawer', () => {
  const Wrapper = () => {
    return (
      <LeafletDrawer>
        <div>Test</div>
      </LeafletDrawer>
    );
  };

  const user = userEvent.setup();

  test('should render', () => {
    render(<Wrapper />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should expand drawer once button clicked', async () => {
    render(<Wrapper />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
