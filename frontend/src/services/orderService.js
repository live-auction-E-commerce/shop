import { fetchAPI } from '@/lib/fetch';

export const getAllOrdersById = async (userId) => {
  return await fetchAPI(`/api/orders/buyer/${userId}`, {}, { requireAuth: true });
};
