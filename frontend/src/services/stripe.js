import { loadStripe } from '@stripe/stripe-js';
import config from '@/config';

export const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

