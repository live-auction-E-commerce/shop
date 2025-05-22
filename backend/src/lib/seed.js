import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Listing from '../models/Listing.js';
import Bid from '../models/Bid.js';
import connectDB from '../lib/db.js';
import { CategoryEnum } from '../constants/enum.js';

dotenv.config();
console.log('🚀 Starting seed script...');

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
    const buyer = users[0];
    const seller = users[1];
    console.log('✅ Users created.');

    console.log('📦 Creating products and listings...');
    const productDocs = [];
    const listingDocs = [];
    const bidDocs = [];

    const sampleProducts = Array.from({ length: 10 }).map((_, i) => ({
      ownerId: seller._id,
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      images: [`image${i * 2 + 1}.svg`, `image${i * 2 + 2}.svg`],
      category: getRandom(CategoryEnum),
      brand: `Brand ${String.fromCharCode(65 + i)}`,
      condition: i % 3 === 0 ? 'New' : 'Used',
      size: ['S', 'M', 'L'][i % 3],
    }));

    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} Products created.`);

    for (let i = 0; i < products.length; i++) {
      const isAuction = i % 2 === 0;
      const listing = await Listing.create({
        productId: products[i]._id,
        sellerId: seller._id,
        saleType: isAuction ? 'auction' : 'now',
        ...(isAuction
          ? {
              startingBid: 50 + i * 5,
              expiredAt: new Date(Date.now() + 86400000),
            }
          : { price: 100 + i * 10 }),
      });

      const bid = await Bid.create({
        listingId: listing._id,
        userId: buyer._id,
        paymentIntentId: new mongoose.Types.ObjectId(),
        amount: isAuction ? 60 + i * 5 : listing.price - 10,
      });

      listing.currentBid = bid._id;
      await listing.save();

      productDocs.push(products[i]);
      listingDocs.push(listing);
      bidDocs.push(bid);
    }

    console.log(`✅ ${listingDocs.length} Listings created.`);
    console.log(`✅ ${bidDocs.length} Bids created and linked.`);
    console.log('🎉 All data seeded successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
