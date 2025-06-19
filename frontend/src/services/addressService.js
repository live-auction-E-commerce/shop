import { fetchAPI } from '@/lib/fetch';

export const getAllAddressesById = async (userId) => {
  return await fetchAPI(`/api/addresses/user/${userId}`, {}, { requireAuth: true });
};

export const getAddressById = async (AddressId) => {
  return await fetchAPI(`/api/addresses/${AddressId}`);
};
export const getDefaultAddress = async (userId) => {
  return await fetchAPI(`/api/addresses/default/${userId}`, undefined, {
    requireAuth: true,
  });
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

export const getDefaultAddressByUserId = async (userId) => {
  return await fetchAPI(`/api/addresses/${userId}/default`, {}, { requireAuth: true });
};
