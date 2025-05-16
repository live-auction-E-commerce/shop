const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

if (!config.API_BASE_URL) {
  console.warn(
    "API_BASE_URL wasn`t defined in .env file and its required, should be something like 'http://localhost:5000/api' "
  );
}
export default config;
