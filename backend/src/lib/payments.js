import Stripe from 'stripe';
import config from '../../config.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

const CENTS_IN_DOLLAR = 100;
// Stripe expects amount in the smallest currency unit, so for USD, cents.

export const createStripePaymentIntent = async ({ amount, bidId, userId }) => {
  return await stripe.paymentIntents.create({
    amount: amount * CENTS_IN_DOLLAR,
    currency: 'usd',
    capture_method: 'manual',
    payment_method_types: ['card'],
    metadata: { bidId, userId },
  });
};
