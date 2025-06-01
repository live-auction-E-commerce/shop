import Stripe from 'stripe';
import config from '../../config.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async ({ amount, bidId, userId }) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe expects amount in cents
    currency: 'usd',
    capture_method: 'manual',
    payment_method_types: ['card'],
    metadata: { bidId, userId },
  });
};
