import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Listing from '../models/Listing.js';
import Bid from '../models/Bid.js';
import connectDB from '../lib/db.js';

dotenv.config();
console.log('🚀 Starting seed script...');

const seedData = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();

    console.log('🧹 Dropping existing database...');
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Database cleared.');

    console.log('👤 Creating users...');
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
    console.log('✅ Users created.');

    console.log('📦 Creating products...');
    const products = await Product.insertMany([
      {
        ownerId: users[1]._id,
        name: 'Product 1',
        description: 'Description for product 1',
        images: ['image1.jpg', 'image2.jpg'],
        category: 'Electronics',
        brand: 'Brand A',
        condition: 'New',
        size: 'M',
      },
      {
        ownerId: users[1]._id,
        name: 'Product 2',
        description: 'Description for product 2',
        images: ['image3.jpg', 'image4.jpg'],
        category: 'Furniture',
        brand: 'Brand B',
        condition: 'Used',
        size: 'L',
      },
    ]);
    console.log('✅ Products created.');

    console.log('📄 Creating listings (without currentBid)...');
    const listings = await Listing.insertMany([
      {
        productId: products[0]._id,
        sellerId: users[1]._id,
        saleType: 'auction',
        startingBid: 50,
        expiredAt: new Date(Date.now() + 86400000),
      },
      {
        productId: products[1]._id,
        sellerId: users[1]._id,
        saleType: 'now',
        price: 120,
      },
    ]);
    console.log('✅ Listings created.');

    console.log('💰 Creating bid for auction listing...');
    const bid = await Bid.create({
      listingId: listings[0]._id,
      userId: users[0]._id,
      paymentIntentId: new mongoose.Types.ObjectId(), // placeholder
      amount: 75,
    });
    console.log('✅ Bid created with _id:', bid._id.toString());

    console.log('📝 Updating listing with currentBid...');
    listings[0].currentBid = bid._id;
    await listings[0].save();
    console.log('✅ Listing updated with currentBid.');

    console.log('🎉 All data seeded successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
