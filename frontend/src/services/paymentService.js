import { fetchAPI } from '@/lib/fetch';

export const createPaymentIntent = async (amount, userId, mode) => {
  const paymentIntent = await fetchAPI(
    '/api/paymentintent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, userId, mode }),
    },
    { requireAuth: true }
  );

  return paymentIntent;
};
