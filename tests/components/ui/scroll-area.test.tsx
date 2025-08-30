import { render } from '@testing-library/react';
import { ScrollArea } from '@/components/ui/scroll-area';

describe('ScrollArea', () => {
  it('renders without crashing', () => {
    render(<ScrollArea />);
  });
});
