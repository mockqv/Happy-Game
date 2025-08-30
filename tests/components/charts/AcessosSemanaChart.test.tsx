import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AcessosSemanaChart } from '@/components/charts/acessos-semana-chart';

describe('AcessosSemanaChart', () => {

  const warnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});

  afterEach(() => {
    warnMock.mockRestore();
  });

  it('deve renderizar o card com o título e a descrição corretos', () => {
    render(<AcessosSemanaChart />);

    const title = screen.getByText(/Acessos na Última Semana/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/Um resumo das visualizações de página nos últimos 7 dias./i);
    expect(description).toBeInTheDocument();
  });
});