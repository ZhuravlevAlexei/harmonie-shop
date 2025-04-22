import { z } from 'zod';

export const optionTypeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters' }),
  lastName: z
    .string()
    .min(4, { message: 'Last name must be at least 4 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 characters' }),
  deliveryType: optionTypeSchema.nullish(),
  comment: z.string().optional(),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
