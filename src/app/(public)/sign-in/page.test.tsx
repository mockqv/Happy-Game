// __tests__/SignInPage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from './page';


jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('SignInPage', () => {
  
  it('deve renderizar o formulário de login com todos os campos', () => {
    render(<SignInPage />);

    expect(screen.getByRole('heading', { name: /acesse sua conta/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /esqueceu sua senha?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cadastre-se/i })).toBeInTheDocument();
  });

  it('deve permitir que o usuário digite nos campos de email e senha', () => {
    render(<SignInPage />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'jogador@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });

    expect(emailInput.value).toBe('jogador@email.com');
    expect(passwordInput.value).toBe('senha123');
  });

  it('deve mostrar uma mensagem de erro se o formulário for enviado com campos vazios', () => {
    render(<SignInPage />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.click(submitButton);

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Por favor, preencha todos os campos.');
  });
  
  it('não deve mostrar mensagem de erro ao preencher os campos e submeter', () => {
    render(<SignInPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'jogador@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });

    fireEvent.click(submitButton);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});