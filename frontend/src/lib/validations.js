import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),

  description: z.string().max(2000, 'Description must be under 2000 characters').optional(),

  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category must be under 50 characters'),

  brand: z.string().min(1, 'Brand is required').max(50, 'Brand must be under 50 characters'),

  condition: z
    .string()
    .min(1, 'Condition is required')
    .max(30, 'Condition must be under 30 characters'),

  size: z.string().min(1, 'Size is required').max(20, 'Size must be under 20 characters'),
});

export const editListingSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  condition: z.string().min(1, 'Condition is required'),
  size: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  listing: z.object({
    price: z.number().optional(),
    startingBid: z.number().optional(),
    expiredAt: z.date().optional(),
  }),
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

const editAuctionSchema = z.object({
  startingBid: z
    .number({ invalid_type_error: 'Starting bid is required' })
    .min(1, 'Starting bid must be at least 1'),
  expiredAt: z.date().optional(), // <- make optional
});

const editAuctionFormSchema = productSchema.extend({
  saleType: z.literal('auction'),
  listing: editAuctionSchema,
});

const editBuyNowFormSchema = productSchema.extend({
  saleType: z.literal('now'),
  listing: buyNowSchema,
});

export const editFormSchema = z.discriminatedUnion('saleType', [
  editAuctionFormSchema,
  editBuyNowFormSchema,
]);
