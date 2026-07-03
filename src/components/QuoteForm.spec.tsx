import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { QuoteForm } from './QuoteForm';

describe('QuoteForm component', () => {
  it('should render the form fields correctly', () => {
    render(<QuoteForm onSubmit={vi.fn()} />);

    // Should render name, email, phone, document, pickUpDate, returnDate
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf\/cnpj/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de retirada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de devolução/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /solicitar cotação/i })).toBeInTheDocument();
  });

  it('should update state when inputs change and call onSubmit with data', () => {
    const mockOnSubmit = vi.fn();
    render(<QuoteForm onSubmit={mockOnSubmit} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByLabelText(/cpf\/cnpj/i), { target: { value: '12345678901' } });
    fireEvent.change(screen.getByLabelText(/data de retirada/i), { target: { value: '2023-10-10' } });
    fireEvent.change(screen.getByLabelText(/data de devolução/i), { target: { value: '2023-10-12' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /solicitar cotação/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      customer: {
        name: 'João da Silva',
        email: 'joao@email.com',
        phone: '11999999999',
        document: '12345678901',
      },
      items: [],
      pickUpDate: '2023-10-10',
      returnDate: '2023-10-12',
    });
  });

  it('should display loading state', () => {
    render(<QuoteForm onSubmit={vi.fn()} loading={true} />);
    
    // The button text usually changes or gets disabled, depending on implementation
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/processando/i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    const errorMessage = 'Ocorreu um erro ao enviar a cotação';
    render(<QuoteForm onSubmit={vi.fn()} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
