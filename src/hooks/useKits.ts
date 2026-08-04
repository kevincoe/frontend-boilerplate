import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { z } from "zod";
import api from "../lib/api";
import type { Kit, CreateKitRequest } from "../types/index";
import { ProductSchema } from "../types/product";

const KitItemSchema = z.object({
  productBaseId: z.string(),
  quantity: z.number(),
  product: ProductSchema.optional(),
});

const KitSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isFavorited: z.boolean(),
  items: z.array(KitItemSchema),
});

const KitsResponseSchema = z.array(KitSchema);

interface ApiErrorResponse {
  status: string;
  message: string;
}

export function useKits() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchKits = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/kits");
      const validatedData = KitsResponseSchema.parse(response.data);
      setKits(validatedData);
    } catch (err: unknown) {
      console.error("[useKits] Error fetching kits:", err);

      if (err instanceof z.ZodError) {
        const fields = err.issues.map((i) => i.path.join(".")).join(", ");
        setError(new Error(`Erro de contrato nos campos: ${fields}`));
      } else if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const apiMessage = err.response?.data?.message ?? err.message;
        setError(new Error(apiMessage));
      } else if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unexpected error occurred."));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createKit = async (data: CreateKitRequest) => {
    try {
      await api.post("/kits", data);
      await fetchKits(); // recarrega a lista
    } catch (err: unknown) {
      console.error("[useKits] Error creating kit:", err);
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        throw new Error(err.response?.data?.message ?? err.message, {
          cause: err,
        });
      }
      throw err;
    }
  };

  const toggleFavorite = async (kitId: string, isFavorited: boolean) => {
    try {
      await api.patch(`/kits/${kitId}/favorite`, { isFavorited });
      // Atualiza o estado local de forma otimista
      setKits((prevKits) =>
        prevKits.map((k) => (k.id === kitId ? { ...k, isFavorited } : k)),
      );
    } catch (err: unknown) {
      console.error("[useKits] Error toggling favorite:", err);
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        throw new Error(err.response?.data?.message ?? err.message, {
          cause: err,
        });
      }
      throw err;
    }
  };

  useEffect(() => {
    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {
        void fetchKits();
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchKits]);

  return {
    kits,
    isLoading,
    error,
    refetch: fetchKits,
    createKit,
    toggleFavorite,
  };
}
