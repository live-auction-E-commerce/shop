const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
};

if (!config.API_BASE_URL) {
  console.warn(
    "VITE_API_BASE_URL wasn`t defined in .env file and its required, should be something like 'http://localhost:5000'"
  );
}
if (!config.VITE_STRIPE_PUBLISHABLE_KEY) {
  console.warn(
    'VITE_STRIPE_PUBLISHABLE_KEY wasn`t defined in .env file and its required, check https://dashboard.stripe.com/test/apikeys '
  );
}
export default config;
