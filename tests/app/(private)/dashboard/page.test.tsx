import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/(private)/dashboard/page';


jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({
    size: 100,
    docs: [
      { data: () => ({ documentType: 'game', documentId: '1', timestamp: { toDate: () => new Date() } }) },
      { data: () => ({ documentType: 'player', documentId: '2', timestamp: { toDate: () => new Date() } }) },
      { data: () => ({ documentType: 'tournament', documentId: '3', timestamp: { toDate: () => new Date() } }) },
    ],
  })),
}));

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

jest.mock('@/components/views/detalhes-categoria-page', () => ({
  DetalhesCategoriaPage: () => <div data-testid="detalhes-categoria-mock">Detalhes Categoria</div>,
}));

jest.mock('@/components/views/assistente-ia-page', () => ({
  AssistenteIAPage: () => <div data-testid="assistente-ia-mock">Assistente IA</div>,
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