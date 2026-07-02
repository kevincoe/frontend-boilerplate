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