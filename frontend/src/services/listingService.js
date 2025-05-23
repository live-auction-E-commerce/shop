import { fetchAPI } from '@/lib/fetch';

export const getAllListings = async () => {
  return await fetchAPI('/api/listings');
};

export const getListingById = async (id) => {
  return await fetchAPI(`/api/listings/${id}`);
};
