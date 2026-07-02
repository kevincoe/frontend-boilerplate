import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(), // Relaxado de .uuid() para aceitar IDs comuns do backend
  name: z.string().min(1, "Name is required"),
  description: z.string().default(''),
  pricePerDay: z.number().nonnegative().catch(0),
  imageUrl: z.string().catch(''),
  isAvailable: z.boolean().default(true),
  category: z.string().default(''), // Adding category field as expected by the UI
});

export type Product = z.infer<typeof ProductSchema>;
