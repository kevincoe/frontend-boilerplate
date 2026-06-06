import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { api } from '../lib/api';
import { Product, ProductSchema } from '../types/product';

const ProductsResponseSchema = z.array(ProductSchema);

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/products');
      
      // Parse and validate the response data at runtime
      const validatedData = ProductsResponseSchema.parse(response.data);
      setProducts(validatedData);
      
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setError(new Error('Invalid data format received from the server.'));
      } else if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unexpected error occurred.'));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}
