import { render } from '@testing-library/react';
import { AssistenteIAPage } from '@/components/views/assistente-ia-page';

describe('AssistenteIAPage', () => {
  it('renders without crashing', () => {
    render(<AssistenteIAPage />);
  });
});
