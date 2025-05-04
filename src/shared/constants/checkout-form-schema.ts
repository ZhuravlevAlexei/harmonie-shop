import { z } from 'zod';

export const optionDeliverySchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const optionLocationSchema = z.object({
  value: z.object({
    city: z.string(),
    cityId: z.string(),
  }),
  label: z.string(),
});

export const optionDivisionSchema = z.object({
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
  email: z
    .string()
    .email({ message: 'Invalid email address format' })
    .optional(),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 characters' }),
  deliveryType: optionDeliverySchema.nullish(),
  location: optionLocationSchema.nullish(),
  division: optionDivisionSchema.nullish(),
  deliveryLocation: z.string().optional(),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
