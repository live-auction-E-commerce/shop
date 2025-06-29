import { fetchAPI } from '@/lib/fetch';

export const getAllBidsByListing = async (listingId) => {
  return await fetchAPI(`/api/bids/${listingId}`);
};

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

export const getUserBids = async () => {
  return await fetchAPI('/api/bids', {}, { requireAuth: true });
};
