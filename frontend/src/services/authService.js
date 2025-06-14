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

export const verifyToken = async () => {
  return await fetchAPI(
    '/api/me',
    {
      method: 'GET',
    },
    { requireAuth: true }
  );
};
