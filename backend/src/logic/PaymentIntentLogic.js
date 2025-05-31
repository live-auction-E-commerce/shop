import Stripe from 'stripe';
import config from '../../config.js';
import PaymentIntent from '../models/PaymentIntent.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const createPaymentIntent = async ({ amount, bidId, userId }) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    capture_method: 'manual',
    payment_method_types: ['card'],
    metadata: { bidId, userId },
  });

  const savedIntent = await PaymentIntent.create({
    userId,
    bidId,
    stripePaymentIntentId: paymentIntent.id,
    amount,
  });

  return {
    client_secret: paymentIntent.client_secret,
    newIntent: savedIntent,
  };
};
