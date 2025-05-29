import { fetchAPI } from '@/lib/fetch';

export const getAllAddressesById = async (id) => {
  return await fetchAPI(`/api/addresses/${id}`, {}, { requireAuth: true });
};

export const createAddress = async (data) => {
  return await fetchAPI(
    '/api/addresses',
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

export const updateAddress = async (id, data) => {
  return await fetchAPI(
    `/api/addresses/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    { requireAuth: true }
  );
};

export const deleteAddress = async (id) => {
  return await fetchAPI(
    `/api/addresses/${id}`,
    {
      method: 'DELETE',
    },
    { requireAuth: true }
  );
};
