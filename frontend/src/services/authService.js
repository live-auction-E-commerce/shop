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
