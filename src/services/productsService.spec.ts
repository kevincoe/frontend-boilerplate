import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from '../lib/api';
import {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct
} from './productsService';
import type { Product } from '../types/product';

// Mock the apiClient
vi.mock('../lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
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

describe('productsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchProducts', () => {
    it('should fetch products with default pagination', async () => {
      const mockResponse = { data: [mockProduct], total: 1, page: 1, limit: 10 };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchProducts();

      expect(apiClient.get).toHaveBeenCalledWith('/products?page=1&limit=10');
      expect(result).toEqual(mockResponse);
    });

    it('should fetch products with specific category and search', async () => {
      const mockResponse = { data: [mockProduct], total: 1, page: 2, limit: 5 };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchProducts(2, 5, 'MOVEIS', 'Mesa');

      expect(apiClient.get).toHaveBeenCalledWith('/products?page=2&limit=5&category=MOVEIS&search=Mesa');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchProduct', () => {
    it('should fetch a single product by ID', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProduct });

      const result = await fetchProduct('product-1');

      expect(apiClient.get).toHaveBeenCalledWith('/products/product-1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const payload = {
        name: 'Mesa de Jantar',
        description: 'Mesa de madeira maciça.',
        pricePerDay: 100,
        category: 'MOVEIS',
        imageUrl: '',
        stock: 10,
      };

      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockProduct });

      const result = await createProduct(payload);

      expect(apiClient.post).toHaveBeenCalledWith('/products', payload);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const payload = { pricePerDay: 120 };
      const updatedProduct = { ...mockProduct, pricePerDay: 120 };

      vi.mocked(apiClient.put).mockResolvedValueOnce({ data: updatedProduct });

      const result = await updateProduct('product-1', payload);

      expect(apiClient.put).toHaveBeenCalledWith('/products/product-1', payload);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('updateProductStock', () => {
    it('should update the product stock', async () => {
      const updatedProduct = { ...mockProduct, totalStock: 15, availableStock: 15 };
      
      vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: updatedProduct });

      const result = await updateProductStock('product-1', 15);

      expect(apiClient.patch).toHaveBeenCalledWith('/products/product-1/stock', { newStockQuantity: 15 });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      vi.mocked(apiClient.delete).mockResolvedValueOnce({});

      await deleteProduct('product-1');

      expect(apiClient.delete).toHaveBeenCalledWith('/products/product-1');
    });
  });
});
