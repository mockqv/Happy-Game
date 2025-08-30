import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Componente Footer', () => {
  it('deve renderizar o texto de copyright corretamente', () => {
    render(<Footer />);
    
    const copyrightElement = screen.getByText(/Todos os direitos reservados/i);

    expect(copyrightElement).toBeInTheDocument();
  });
});