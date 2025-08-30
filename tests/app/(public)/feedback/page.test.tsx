import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackPage from '@/app/(public)/feedback/page';

jest.mock('database/firebase');

describe('FeedbackPage', () => {
  it('renders the feedback form', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('Página de Feedback')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Feedback')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar Feedback' })).toBeInTheDocument();
  });
});
