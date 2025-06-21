import { fetchAPI } from '@/lib/fetch';

export const register = async (data) => {
  return await fetchAPI('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const login = async (data) => {
  return await fetchAPI('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const changePassword = async (data) => {
  return await fetchAPI(
    '/api/password',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    { requireAuth: true }
  );
};

export const verifyToken = async () => {
  return await fetchAPI(
    '/api/me',
    {
      method: 'GET',
    },
    { requireAuth: true }
  );
};

export const verifySellerEmail = async (token) => {
  return await fetchAPI(
    '/api/verify-seller-email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    },
    { requireAuth: true }
  );
};

export const requestSellerVerification = async () => {
  return await fetchAPI(
    '/api/become-seller',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { requireAuth: true }
  );
};
