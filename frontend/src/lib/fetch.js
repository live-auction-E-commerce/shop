export const fetchAPI = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP Error, status: ${response.status}`);
  }
  return await response.json();
};
