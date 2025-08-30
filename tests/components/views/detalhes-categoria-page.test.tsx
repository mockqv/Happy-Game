import { render } from '@testing-library/react';
import { DetalhesCategoriaPage } from '@/components/views/detalhes-categoria-page';

jest.mock('database/firebase');

describe('DetalhesCategoriaPage', () => {
  it('renders without crashing', () => {
    render(<DetalhesCategoriaPage tipo="game" nome="Games" />);
  });
});
