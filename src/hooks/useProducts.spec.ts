import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../lib/api';
import { useEquipment } from './useProducts';
import type { Product } from '../types/product';

vi.mock('../lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockProduct: Product = {
  id: 'product-1',
  name: 'Mesa de Jantar',
  description: 'Mesa de madeira maciça.',
  pricePerDay: 100,
  category: 'MOVEIS',
  imageUrl: '',
  isAvailable: true,
  totalStock: 10,
  availableStock: 10,
};

describe('useEquipment hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return products successfully', async () => {
    const mockResponse = {
      data: [mockProduct],
      total: 1,
      page: 1,
      limit: 10,
    };
    
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useEquipment());

    // Inicialmente isLoading é true e products é array vazio
    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    // Esperar o fetch terminar
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([mockProduct]);
    expect(result.current.error).toBeNull();
    expect(api.get).toHaveBeenCalledWith('/products', {
      params: { page: 1, limit: 10, search: undefined, category: undefined }
    });
  });

  it('should handle API errors correctly', async () => {
    vi.mocked(api.get).mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useEquipment());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network Error');
  });

  it('should allow refetching with parameters', async () => {
    const mockResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
    };
    
    vi.mocked(api.get).mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useEquipment());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Chama o refetch com params
    result.current.refetch({ search: 'cadeira', category: 'MOVEIS' });

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith('/products', {
        params: { page: 1, limit: 10, search: 'cadeira', category: 'MOVEIS' }
      });
    });
  });
});
