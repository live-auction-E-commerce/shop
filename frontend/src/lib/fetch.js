import config from '../config.js';

export const fetchAPI = async (url, options = {}, { requireAuth = false } = {}) => {
  const userToken = localStorage.getItem('token');
  const fullUrl = `${config.API_BASE_URL}${url}`;
  const token = requireAuth ? userToken : null;

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
