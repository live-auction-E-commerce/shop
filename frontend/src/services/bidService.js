import { fetchAPI } from '@/lib/fetch';

export const placeBid = async ({ listingId, userId, paymentIntentId, amount }) => {
  return await fetchAPI(
    '/api/bids',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId,
        userId,
        paymentIntentId,
        amount,
      }),
    },
    { requireAuth: true }
  );
};
