import mongoose from 'mongoose';
import config from '../../config.js';

const connectDB = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the config.');
    }

    await mongoose.connect(config.MONGO_URI);

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

export default connectDB;
