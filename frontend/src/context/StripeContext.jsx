import { createContext, useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/services/stripe';

const StripeContext = createContext(null);

export const StripeProvider = ({ children }) => {
  return (
    <StripeContext.Provider value={{ stripePromise }}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  return useContext(StripeContext);
};
