import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  pricePerDay: z.number().positive(),
  imageUrl: z.string().url(),
  isAvailable: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;
