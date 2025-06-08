import PaymentIntent from '../models/PaymentIntent.js';
import { createStripePaymentIntent } from '../lib/payments.js';

export const createPaymentIntent = async ({ amount, userId }) => {
  const paymentIntent = await createStripePaymentIntent({
    amount,
    userId,
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
