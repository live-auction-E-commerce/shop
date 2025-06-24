import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();
console.log('🚀 Starting Database cleaning script...');

const clearData = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();

    console.log('🧹 Dropping existing database...')
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Database cleared.');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    mongoose.connection.close();
  }
};

clearData();
