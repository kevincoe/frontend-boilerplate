import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { z } from "zod";
import api from "../lib/api";
import { type Product, ProductSchema } from "../types/product";

// O schema do produto agora é chamado de Equipamento
const EquipmentResponseSchema = z.object({
  data: z.array(ProductSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

interface ApiErrorResponse {
  status: string;
  message: string;
}

export function useEquipment() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEquipment = useCallback(
    async (params?: { search?: string; category?: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        // O endpoint correto no backend é /products
        const response = await api.get("/products", {
          params: {
            page: 1,
            limit: 10,
            search: params?.search,
            category: params?.category,
          },
        });

        // Parse and validate the response data at runtime
        const validatedData = EquipmentResponseSchema.parse(response.data);
        setProducts(validatedData.data);
      } catch (err: unknown) {
        // Log para auxiliar o time de desenvolvimento a identificar o erro real no console
        console.error("[useProducts] Error fetching products:", err);

        if (err instanceof z.ZodError) {
          const fields = err.issues.map((i) => i.path.join(".")).join(", ");
          setError(new Error(`Erro de contrato nos campos: ${fields}`));
        } else if (axios.isAxiosError<ApiErrorResponse>(err)) {
          if (err.response?.status === 404) {
            setError(
              new Error(
                `Endpoint não encontrado (404). Verifique se a rota '/api/equipment' está registrada no backend.`,
              ),
            );
          } else {
            // Alinhamento com AppError do backend: { status, message }
            const apiMessage = err.response?.data?.message ?? err.message;
            setError(new Error(apiMessage));
          }
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred."));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;

    // Defer execution to avoid calling setState synchronously within the effect body.
    // This prevents cascading renders and satisfies the react-hooks/set-state-in-effect rule.
    queueMicrotask(() => {
      if (isMounted) {
        void fetchEquipment();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchEquipment]);

  return { products, isLoading, error, refetch: fetchEquipment };
}
