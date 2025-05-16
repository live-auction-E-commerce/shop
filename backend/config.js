import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 5001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  BASE_URL:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`,
  MONGO_URI: process.env.MONGO_URI || '',
};

if (!config.MONGO_URI) {
  console.warn('⚠️  Warning: MONGO_URI is not set in your .env file.');
}

export default config;
