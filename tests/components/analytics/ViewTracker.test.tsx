import { render } from '@testing-library/react';
import { ViewTracker } from '@/components/analytics/ViewTracker';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe('ViewTracker', () => {
  it('renders without crashing', () => {
    render(<ViewTracker documentId="1" documentType="game" documentName="Test Game" />);
  });
});
