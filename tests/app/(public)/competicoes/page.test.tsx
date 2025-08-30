import React from 'react';
import { render, screen } from '@testing-library/react';
import CompeticoesPage from '@/app/(public)/competicoes/page';

// Mocking fetch for getTournaments
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('CompeticoesPage', () => {
  it('renders without crashing', async () => {
    const Page = await CompeticoesPage();
    render(Page);
    expect(screen.getByText('Competições e Torneios')).toBeInTheDocument();
  });
});
