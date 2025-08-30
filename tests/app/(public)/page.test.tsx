import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(public)/page';

describe('Home', () => {
  it('renders the home page', () => {
    render(<Home />);
    expect(screen.getByText('Seu Universo Gamer')).toBeInTheDocument();
  });
});
