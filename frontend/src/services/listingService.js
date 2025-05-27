import { fetchAPI } from '@/lib/fetch';

export const getAllListings = async () => {
  return await fetchAPI('/api/listings');
};

export const getListingById = async (id) => {
  return await fetchAPI(`/api/listings/${id}`);
};

export const createListing = async (data, token) => {
  return await fetchAPI('/api/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
