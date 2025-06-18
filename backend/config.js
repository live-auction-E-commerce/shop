import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 5001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  BASE_URL:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  REDIS_URL: process.env.REDIS_URL,
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

if (!config.AWS_ACCESS_KEY_ID) {
  console.warn(
    '⚠️  Warning: AWS_ACCESS_KEY_ID is not set in your .env file. AWS S3 uploads will not work.',
  );
}

if (!config.AWS_SECRET_ACCESS_KEY) {
  console.warn(
    '⚠️  Warning: AWS_SECRET_ACCESS_KEY is not set in your .env file. AWS S3 uploads will not work.',
  );
}
if (!config.AWS_REGION) {
  console.warn(
    '⚠️  Warning: AWS_REGION is not set in your .env file. AWS S3 uploads will not work.',
  );
}
if (!config.AWS_S3_BUCKET_NAME) {
  console.warn(
    '⚠️  Warning: AWS_S3_BUCKET_NAME is not set in your .env file. AWS S3 uploads will not work.',
  );
}
if (!config.REDIS_URL) {
  console.warn('⚠️  Warning: REDIS_URL is not set. BullMQ jobs won’t work.');
}

export default config;
