import { fetchAPI } from '@/lib/fetch';

export const getAllAddressesById = async (id) => {
  return await fetchAPI(`/api/addresses/user/${id}`, {}, { requireAuth: true });
};

export const getAddressById = async (id) => {
  return await fetchAPI(`/api/addresses/${id}`);
};

export const createAddress = async (data) => {
  await fetchAPI(
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
  await fetchAPI(
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
  await fetchAPI(
    `/api/addresses/${id}`,
    {
      method: 'DELETE',
    },
    { requireAuth: true }
  );
};
