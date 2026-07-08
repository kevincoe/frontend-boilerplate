import { z } from "zod";

export const OrderStateEnum = z.enum([
  "DRAFT",
  "AWAITING_DEPOSIT",
  "RESERVED",
  "CONFIRMED",
  "CANCELLED",
]);

export const OrderSchema = z.object({
  id: z.string().uuid(),
  state: OrderStateEnum,
  totalAmount: z.number().nonnegative(),
  pickUpDate: z.string().datetime(), // ISO Date
  returnDate: z.string().datetime(), // ISO Date
  assets: z.array(z.object({ assetId: z.string() })),
});

export type Order = z.infer<typeof OrderSchema>;
