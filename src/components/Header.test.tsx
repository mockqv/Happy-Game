// src/components/Header.test.tsx (CORRIGIDO)
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// Mock do componente ToggleDarkMode para evitar erros relacionados a 'next-themes' no teste
jest.mock('./ToggleDarkMode', () => {
  return function DummyToggleDarkMode() {
    return <div data-testid="toggle-dark-mode-mock"></div>;
  };
});

// Mock do componente Link do Next.js
jest.mock('next/link', () => {
    return ({children, href}: {children: React.ReactNode, href: string}) => {
        return <a href={href}>{children}</a>
    }
})


describe('Componente Header', () => {
  it('deve abrir e fechar o menu mobile ao clicar no botão', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByLabelText('Abrir menu');

    expect(screen.queryByTestId('mobile-menu')).toBeNull();

    await user.click(menuButton);

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();

    expect(mobileMenu).toHaveTextContent('Notícias');

    await user.click(menuButton);

    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });
});