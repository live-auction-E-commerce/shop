import config from '../config.js';

export const fetchAPI = async (url, options) => {
  const fullUrl = `${config.API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`HTTP Error, status: ${response.status}`);
  }
  return await response.json();
};
