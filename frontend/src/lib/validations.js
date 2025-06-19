import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  condition: z.string().min(1, 'Condition is required'),
  size: z.string().min(1, 'Size is required'),
});

export const auctionSchema = z.object({
  startingBid: z
    .number({ invalid_type_error: 'Starting bid is required' })
    .min(1, 'Starting bid must be at least 1'),
  expiredAt: z.date().min(new Date(), 'Expiry date must be in the future'),
});

export const buyNowSchema = z.object({
  price: z.number({ invalid_type_error: 'Price is required' }).min(1, 'Price must be at least 1'),
});

export const auctionFormSchema = productSchema.extend({
  saleType: z.literal('auction'),
  listing: auctionSchema,
});

export const buyNowFormSchema = productSchema.extend({
  saleType: z.literal('now'),
  listing: buyNowSchema,
});

export const formSchema = z.discriminatedUnion('saleType', [auctionFormSchema, buyNowFormSchema]);

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address')
      .toLowerCase()
      .trim(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['User', 'Seller'], {
      required_error: 'Please select a role',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const addressSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  description: z.string().min(1, 'description is required').toLowerCase(),
  street: z.string().min(1, 'Street is required'),
  number: z.number({ required_error: 'number is required' }),
  city: z.string().min(1, 'city is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Current password is required' })
      .min(6, 'Current password must be at least 6 characters long'),

    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters long'),

    confirmNewPassword: z
      .string({ required_error: 'Confirm new password is required' })
      .min(6, 'Confirm new password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });
