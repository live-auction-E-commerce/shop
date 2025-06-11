import { fetchAPI } from '@/lib/fetch';

export const createPaymentIntent = async (amount) => {
  const paymentIntent = await fetchAPI(
    '/api/paymentintent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    },
    { requireAuth: true }
  );

  return paymentIntent;
};
