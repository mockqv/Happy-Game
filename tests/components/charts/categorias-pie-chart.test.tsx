import { render } from '@testing-library/react';
import { CategoriasPieChart } from '@/components/charts/categorias-pie-chart';

describe('CategoriasPieChart', () => {
  it('renders without crashing', () => {
    const data = [
      { name: 'game', value: 10 },
      { name: 'player', value: 20 },
      { name: 'tournament', value: 30 },
    ];
    render(<CategoriasPieChart data={data} />);
  });
});
