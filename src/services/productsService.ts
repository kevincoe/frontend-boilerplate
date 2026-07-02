import apiClient from '../lib/api';
import { type Product } from '../types/index';

// Fetch all products with pagination
export const fetchProducts = async (page: number = 1, limit: number = 10, category?: string, search?: string) => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (category) params.append('category', category);
  if (search) params.append('search', search);

  const response = await apiClient.get<{ data: Product[]; total: number; page: number; limit: number }>(`/products?${params}`);
  return response.data;
};

// Fetch single product
export const fetchProduct = async (id: string) => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

// Create new product
export const createProduct = async (data: Omit<Product, 'id' | 'isAvailable' | 'totalStock' | 'availableStock'> & { stock: number }) => {
  const response = await apiClient.post<Product>('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: Partial<Omit<Product, 'id' | 'isAvailable' | 'totalStock' | 'availableStock'>>) => {
  const response = await apiClient.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const updateProductStock = async (id: string, newStockQuantity: number) => {
  const response = await apiClient.patch<Product>(`/products/${id}/stock`, { newStockQuantity });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/products/${id}`);
};