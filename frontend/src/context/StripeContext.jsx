import { createContext, useContext, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import config from '@/config';

const StripeContext = createContext(null);

export const StripeProvider = ({ children }) => {
  // Initialize stripePromise only once, memoized
  const stripePromise = useMemo(() => loadStripe(config.STRIPE_PUBLISHABLE_KEY), []);

  return (
    <StripeContext.Provider value={{ stripePromise }}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  return useContext(StripeContext);
};
