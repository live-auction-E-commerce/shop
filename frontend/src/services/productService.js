import { fetchAPI } from '@/lib/fetch';

export const getProductById = async (id) => {
  return await fetchAPI(`/api/products/${id}`);
};

// Backend expect FormData object here, do not JSON this body!
export const createProduct = async (data) => {
  return await fetchAPI(
    '/api/products',
    {
      method: 'POST',
      body: data,
    },
    { requireAuth: true }
  );
};

export const updateProduct = async (id, data) => {
  return await fetchAPI(
    `/api/products/${id}`,
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
