import React from 'react';
import { render, screen } from '@testing-library/react';
import JogadoresPage from '@/app/(public)/jogadores/page';

// Mocking fetch for getPlayers
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('JogadoresPage', () => {
  it('renders without crashing', async () => {
    const Page = await JogadoresPage();
    render(Page);
    expect(screen.getByText('Estrelas dos eSports')).toBeInTheDocument();
  });
});
