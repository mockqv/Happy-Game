import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NoticiasPage from '@/app/(public)/noticias/page';

global.fetch = jest.fn();

describe('Página de Notícias', () => {
  it('deve renderizar os jogos buscados da API', async () => {
    const mockGames = {
      results: [
        {
          id: 1,
          name: 'Super Mock Game 1',
          background_image: 'url/para/imagem1.jpg',
          metacritic: 95,
          parent_platforms: [{ platform: { name: 'PC' } }],
        },
        {
          id: 2,
          name: 'Awesome Test Game 2',
          background_image: 'url/para/imagem2.jpg',
          metacritic: 92,
          parent_platforms: [{ platform: { name: 'Playstation' } }],
        },
      ],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGames,
    });
    const PageComponent = await NoticiasPage();
    render(PageComponent);

    const headings = await screen.findAllByRole('heading', { level: 3 });
    const gameTitles = headings.map(h => h.textContent);

    expect(gameTitles).toContain('Super Mock Game 1');
    expect(gameTitles).toContain('Awesome Test Game 2');
    
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();
  });
});