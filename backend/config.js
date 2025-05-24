import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 5001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  BASE_URL:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

if (!config.MONGO_URI) {
  console.warn('⚠️  Warning: MONGO_URI is not set in your .env file.');
}

if (!config.JWT_SECRET_KEY) {
  console.warn(
    '⚠️  Warning: JWT_SECRET_KEY is not set in your .env file. JWT generation will fail.',
  );
}

if (!config.STRIPE_SECRET_KEY) {
  console.warn(
    '⚠️  Warning: STRIPE_SECRET_KEY is not set in your .env file. Stripe SDK will not work!.',
  );
}

export default config;
