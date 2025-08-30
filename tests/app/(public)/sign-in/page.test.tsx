import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import loginWithEmailAndPassword from '@/functions/sign-in';
import SignInPage from '@/app/(public)/sign-in/page';

jest.mock('@/functions/sign-in');

jest.mock('database/firebase');

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockedLogin = loginWithEmailAndPassword as jest.Mock;

describe('SignInPage', () => {
  beforeEach(() => {
    mockedLogin.mockClear();
  });

  it('deve renderizar o formulário de login corretamente', () => {
    render(<SignInPage />);
    expect(screen.getByRole('heading', { name: /Acesse sua Conta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('deve chamar a função de login com os dados corretos ao submeter o formulário', async () => {
    mockedLogin.mockResolvedValue({
      user: {
        uid: '123',
        getIdToken: async () => 'fake-token',
      },
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'teste@exemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'senha123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({
        email: 'teste@exemplo.com',
        password: 'senha123',
      });
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('deve exibir uma mensagem de erro se o login falhar', async () => {
    const error = { code: 'auth/invalid-credential', message: 'Credencial inválida.' };
    mockedLogin.mockRejectedValue(error);

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'errado@exemplo.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'senhaerrada' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(/Email ou senha inválidos/i);
  });
});