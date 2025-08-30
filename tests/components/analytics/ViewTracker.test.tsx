import { render } from '@testing-library/react';
import { ViewTracker } from '@/components/analytics/ViewTracker';

jest.mock('database/firebase');

describe('ViewTracker', () => {
  it('renders without crashing', () => {
    render(<ViewTracker documentId="1" documentType="game" documentName="Test Game" />);
  });
});
