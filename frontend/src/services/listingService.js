import { fetchAPI } from '@/lib/fetch';

export const getAllListings = async () => {
  return await fetchAPI('/api/listings');
};

export const updateListing = async (listingId, formData) => {
  return await fetchAPI(
    `/api/listings/${listingId}`,
    {
      method: 'PUT',
      body: formData,
    },
    { requireAuth: true }
  );
};
export const getListingById = async (id) => {
  return await fetchAPI(`/api/listings/${id}`);
};

export const getAllLiveListingsBySeller = async (sellerId) => {
  return await fetchAPI(`/api/listings/seller/${sellerId}`, {}, { requireAuth: true });
};

export const createListing = async (data) => {
  return await fetchAPI(
    '/api/listings',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    { requireAuth: true }
  );
};

export const markListingAsSold = async ({ listingId, amount }) => {
  return await fetchAPI(
    '/api/listings/mark-sold',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listingId, amount }),
    },
    { requireAuth: true }
  );
};
export const deleteListing = async (listingId) => {
  return await fetchAPI(
    `/api/listings/${listingId}`,
    {
      method: 'DELETE',
    },
    { requireAuth: true }
  );
};
