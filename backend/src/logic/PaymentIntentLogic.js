import PaymentIntent from '../models/PaymentIntent.js';
import { createStripePaymentIntent } from '../lib/payments.js';

export const createPaymentIntent = async ({ amount, userId, mode = 'bid' }) => {
  console.log('Creating payment intent:', {
    amount,
    userId,
    mode,
  });
  const paymentIntent = await createStripePaymentIntent({
    amount,
    userId,
    mode,
  });
  const savedIntent = await PaymentIntent.create({
    userId,
    stripePaymentIntentId: paymentIntent.id,
    amount,
  });

  return {
    client_secret: paymentIntent.client_secret,
    newIntent: savedIntent,
  };
};
