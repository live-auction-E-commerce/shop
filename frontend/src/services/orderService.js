import { fetchAPI } from '@/lib/fetch';

export const getAllOrdersById = async (userId) => {
  return await fetchAPI(`/api/orders/buyer/${userId}`, {}, { requireAuth: true });
};

export const createOrder = async ({ buyerId, sellerId, listingId, addressId, price }) => {
  return await fetchAPI(
    '/api/orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        buyerId,
        sellerId,
        listingId,
        addressId,
        price,
      }),
    },
    { requireAuth: true }
  );
};
