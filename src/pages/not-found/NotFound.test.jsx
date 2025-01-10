// NotFound.test.jsx
import React from 'react';
import { render, screen, test } from '@testing-library/react';
import NotFound from './index';

describe('NotFound Component', () => {
  test('renders NotFound page with correct text', () => {
    render(<NotFound />);

    // Check if "Welcome to" text exists
    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();

    // Check if "NotFound Page" text exists with correct styling
    const notFoundText = screen.getByText(/notfound page/i);
    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText).toHaveClass('text-lg', 'font-bold');
  });
});
