import { fetchAPI } from '@/lib/fetch';

export const createPaymentIntent = async (amount, bidId, userId) => {
  const paymentIntent = await fetchAPI('/api/paymentintent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, bidId, userId }),
  });

  return paymentIntent;
};
