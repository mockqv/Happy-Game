import React from 'react';
import { render, screen } from '@testing-library/react';
import SobrePage from '@/app/(public)/sobre/page';

describe('SobrePage', () => {
  it('renders the about page', () => {
    render(<SobrePage />);
    expect(screen.getByText('Sobre o Happy Game')).toBeInTheDocument();
  });
});
