import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
  });
});
