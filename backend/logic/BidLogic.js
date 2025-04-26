import mongoose from 'mongoose';
import Bid from '../models/Bid.js';
import Listing from '../models/Listing.js';
import User from '../models/User.js';
import PaymentIntent from '../models/PaymentIntent.js';
import { validateObjectId } from '../lib/utils.js';

export const createBid = async (data) => {
    //const { listingId, userId, paymentIntentId, amount } = data;

  if (!validateObjectId(data.listingId)) {
    throw new Error('Invalid listingId: must be a valid MongoDB ObjectId.');
  }

  if (!validateObjectId(data.userId)) {
    throw new Error('Invalid userId: must be a valid MongoDB ObjectId.');
  }

  if (!validateObjectId(data.paymentIntentId)) {
    throw new Error('Invalid paymentIntentId: must be a valid MongoDB ObjectId.');
  }

  if (typeof data.amount !== 'number' || data.amount <= 0) {
    throw new Error('Invalid amount: must be a positive number.');
  }

  const listing = await Listing.findById(data.listingId);
  if (!listing) {
    throw new Error('Listing not found.');
  }

  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const paymentIntent = await PaymentIntent.findById(data.paymentIntentId);
  if (!paymentIntent) {
    throw new Error('PaymentIntent not found.');
  }

  if (!listing.currentBid) {
    if (data.amount <= listing.startingBid) {
      throw new Error(`Bid amount must be greater than the starting bid (${listing.startingBid}).`);
    }
  } else {
    const currentBid = await Bid.findById(listing.currentBid);
    if (!currentBid) {
      throw new Error('Current bid not found.');
    }
    if (data.amount <= currentBid.amount) {
      throw new Error(`Bid amount must be greater than the current highest bid (${currentBid.amount}).`);
    }
  }

  const newBid = new Bid({
    listingId: data.listingId,
    userId: data.userId,
    paymentIntentId: data.paymentIntentId,
    amount: data.amount,
  });

  const savedBid = await newBid.save();

  listing.currentBid = savedBid._id;
  await listing.save();

  return savedBid;
};

export const getAllBidsByListing = async (listingId) => {
    if (!validateObjectId(listingId)) {
      throw new Error('Invalid listingId: must be a valid MongoDB ObjectId.');
    }
  
    const bids = await Bid.find({ listingId })
      .sort({ createAt: -1 });
  
    return bids;
  };

  export const getAllBidsByUser = async (userId) => {
    if (!validateObjectId(userId)) {
      throw new Error('Invalid userId: must be a valid MongoDB ObjectId.');
    }
  
    const bids = await Bid.find({ userId })
      .sort({ createAt: -1 });
  
    return bids;
  };  

  export const getAllBidsByUserAndListing = async (userId, listingId) => {
    if (!validateObjectId(userId)) {
      throw new Error('Invalid userId: must be a valid MongoDB ObjectId.');
    }
  
    if (!validateObjectId(listingId)) {
      throw new Error('Invalid listingId: must be a valid MongoDB ObjectId.');
    }
  
    const bids = await Bid.find({ userId, listingId })
      .sort({ createAt: -1 });
  
    return bids;
  };
  
  