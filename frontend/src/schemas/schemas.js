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
