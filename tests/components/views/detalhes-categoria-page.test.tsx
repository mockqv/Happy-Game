import { render } from '@testing-library/react';
import { DetalhesCategoriaPage } from '@/components/views/detalhes-categoria-page';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
}));

describe('DetalhesCategoriaPage', () => {
  it('renders without crashing', () => {
    render(<DetalhesCategoriaPage tipo="game" nome="Games" />);
  });
});
