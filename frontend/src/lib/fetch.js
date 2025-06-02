import config from '../config.js';

const getToken = () => localStorage.getItem('token');

export const fetchAPI = async (url, options = {}, { requireAuth = false } = {}) => {
  const fullUrl = `${config.API_BASE_URL}${url}`;
  const token = requireAuth ? getToken() : null;

  const headers = { ...(options.headers || {}) };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Unknown error');
  }

  return data;
};
