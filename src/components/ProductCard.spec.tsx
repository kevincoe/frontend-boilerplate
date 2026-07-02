import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';
import { describe, it, expect, vi } from 'vitest';

const mockProduct: Product = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Cadeira Gamer',
  description: 'Cadeira ergonômica para desenvolvedores.',
  pricePerDay: 45.0,
  imageUrl: 'https://example.com/image.jpg',
  isAvailable: true,
  category: 'Test Category',
  totalStock: 10,
  availableStock: 5,
};

import '@testing-library/jest-dom';

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Cadeira Gamer')).toBeInTheDocument();
    expect(screen.getByText('Cadeira ergonômica para desenvolvedores.')).toBeInTheDocument();
    expect(screen.getByText(/45\.00/)).toBeInTheDocument();
  });

  it('should call onAddToCart when clicked and product is available', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const button = screen.getByRole('button', { name: /alugar/i });
    fireEvent.click(button);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should disable the button when product is not available', () => {
    const handleAddToCart = vi.fn();
    const unavailableProduct = { ...mockProduct, availableStock: 0 };
    
    render(<ProductCard product={unavailableProduct} onAddToCart={handleAddToCart} />);

    const button = screen.getByRole('button', { name: /esgotado/i });
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleAddToCart).not.toHaveBeenCalled();
  });
});
