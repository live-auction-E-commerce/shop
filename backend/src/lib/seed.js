import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Listing from '../models/Listing.js';
import connectDB from '../lib/db.js';

dotenv.config();
console.log('Starting seed script...');

const seedData = async () => {
  try {
    await connectDB();

    await mongoose.connection.db.dropDatabase();
    console.log('All database cleared');

    // Create sample users
    const users = await User.insertMany([
      {
        email: 'user@example.com',
        password: 'password123',
        role: 'User',
      },
      {
        email: 'seller@example.com',
        password: 'password123',
        role: 'Seller',
      },
    ]);

    console.log('Users seeded successfully.');

    // Create sample products
    const products = await Product.insertMany([
      {
        ownerId: users[1]._id, // seller@example.com
        name: 'Product 1',
        description: 'Description for product 1',
        images: ['image1.jpg', 'image2.jpg'],
        category: 'Electronics',
        brand: 'Brand A',
        condition: 'New',
        size: 'M',
      },
      {
        ownerId: users[1]._id, // seller@example.com
        name: 'Product 2',
        description: 'Description for product 2',
        images: ['image3.jpg', 'image4.jpg'],
        category: 'Furniture',
        brand: 'Brand B',
        condition: 'Used',
        size: 'L',
      },
    ]);

    console.log('Products seeded successfully.');

    // Create sample listings
    const listings = await Listing.insertMany([
      {
        productId: products[0]._id,
        sellerId: users[1]._id, // seller@example.com
        saleType: 'auction',
        startingBid: 50,
        currentBid: new mongoose.Types.ObjectId(), // ✅ placeholder ObjectId
        expiredAt: new Date(Date.now() + 86400000), // 1 day from now
      },
      {
        productId: products[1]._id,
        sellerId: users[1]._id, // seller@example.com
        saleType: 'now',
        price: 120,
      },
    ]);

    console.log('Listings seeded successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
