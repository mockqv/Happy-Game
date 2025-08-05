import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from './page';


jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      displayName: 'Jogador Teste',
      email: 'teste@exemplo.com',
    },
  }),
}));

jest.mock('@/components/charts/acessos-semana-chart', () => ({
  AcessosSemanaChart: () => <div data-testid="acessos-chart-mock">Gráfico de Acessos</div>,
}));

jest.mock('@/components/charts/categorias-pie-chart', () => ({
  CategoriasPieChart: () => <div data-testid="categorias-chart-mock">Gráfico de Categorias</div>,
}));


describe('DashboardPage', () => {
  beforeEach(() => {
    render(<DashboardPage />);
  });

  it('deve exibir a mensagem de boas-vindas com o nome do usuário', () => {
    const welcomeMessage = screen.getByRole('heading', { name: /Olá, Jogador Teste!/i });
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('deve renderizar os 4 cards de KPI (Métricas)', () => {
    expect(screen.getByText(/Total de Acessos/i)).toBeInTheDocument();
    expect(screen.getByText(/Novos Usuários/i)).toBeInTheDocument();
    expect(screen.getByText(/Comentários/i)).toBeInTheDocument();
    expect(screen.getByText(/Engajamento/i)).toBeInTheDocument();
  });

  it('deve renderizar os componentes de gráfico (mocados)', () => {
    expect(screen.getByTestId('acessos-chart-mock')).toBeInTheDocument();
    expect(screen.getByTestId('categorias-chart-mock')).toBeInTheDocument();
  });
});