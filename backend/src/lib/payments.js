import Stripe from 'stripe';
import config from '../../config.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

const CENTS_IN_DOLLAR = 100;
// Stripe expects amount in the smallest currency unit, so for USD, cents.

export const createStripePaymentIntent = async ({
  amount,
  bidId,
  userId,
  mode = 'bid',
}) => {
  const isBuyNow = mode === 'buyNow';

  return await stripe.paymentIntents.create({
    amount: amount * CENTS_IN_DOLLAR,
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: { bidId, userId },
    capture_method: isBuyNow ? 'automatic' : 'manual',
  });
};

export const captureStripePaymentIntent = async (stripePaymentIntentId) => {
  try {
    const capturedIntent = await stripe.paymentIntents.capture(
      stripePaymentIntentId,
    );
    return capturedIntent;
  } catch (err) {
    console.error('Error capturing PaymentIntent:', err);
    throw err;
  }
};
