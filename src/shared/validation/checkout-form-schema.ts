import { z } from 'zod';
import { AllowedLangs } from '../constants/common';
import translations from '../../../public/translations.json';

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
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 characters' }),
  deliveryType: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine(val => val !== null && val !== undefined && val.value !== '', {
      message: 'Оберіть варіант доставки',
    }),
  location: z
    .object({
      value: z.object({
        city: z.string(),
        cityId: z.string(),
      }),
      label: z.string(),
    })
    .refine(val => val !== null && val !== undefined && val.value.city !== '', {
      message: 'Оберіть місто',
    }),
  division: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  deliveryLocation: z.string().optional(),
  comment: z.string().optional(),
});

export const createCheckoutFormSchemaMultilang = (
  lang: AllowedLangs = AllowedLangs.UK
): z.ZodType<z.infer<typeof checkoutFormSchema>> => {
  return z
    .object({
      firstName: z
        .string()
        .min(4, { message: translations[lang].checkout_validation.firstName }),
      lastName: z
        .string()
        .min(4, { message: translations[lang].checkout_validation.lastName }),
      email: z
        .string()
        .email({ message: translations[lang].checkout_validation.email })
        .optional()
        .or(z.literal('')),
      phone: z
        .string()
        .min(10, { message: translations[lang].checkout_validation.phone }),
      deliveryType: z
        .object({
          label: z.string(),
          value: z.string(),
        })
        .refine(val => val !== null && val !== undefined && val.value !== '', {
          message: translations[lang].checkout_validation.deliveryType,
        }),
      location: z
        .object({
          value: z.object({
            city: z.string(),
            cityId: z.string(),
          }),
          label: z.string(),
        })
        .refine(
          val => val !== null && val !== undefined && val.value.city !== '',
          {
            message: translations[lang].checkout_validation.location,
          }
        ),
      division: z
        .object({
          value: z.string(),
          label: z.string(),
        })
        .optional(),
      deliveryLocation: z.string().optional(),
      comment: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.deliveryType.value === 'Доставка кур`єром') {
        if (data.deliveryLocation === '') {
          ctx.addIssue({
            path: ['deliveryLocation'],
            code: z.ZodIssueCode.custom,
            message: translations[lang].checkout_validation.deliveryLocation,
          });
        }
      }
      if (data.deliveryType.value === 'Доставка до відділення') {
        if (data.division?.value === '') {
          ctx.addIssue({
            path: ['division'],
            code: z.ZodIssueCode.custom,
            message: translations[lang].checkout_validation.division,
          });
        }
      }
    });
};

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
