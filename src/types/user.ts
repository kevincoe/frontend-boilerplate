import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  age: z.number().int().positive().optional(),
});

export type User = z.infer<typeof UserSchema>;