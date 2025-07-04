import Bid from '../models/Bid.js';
import Listing from '../models/Listing.js';
import User from '../models/User.js';
import PaymentIntent from '../models/PaymentIntent.js';
import { validateObjectId } from '../lib/validations.js';
import { aggregateUserBids } from '../lib/aggregations.js';

export const createBid = async (data) => {
  validateObjectId(data.listingId);
  validateObjectId(data.userId);
  validateObjectId(data.paymentIntentId);
  validateObjectId(data.addressId);

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
      throw new Error(
        `Bid amount must be greater than the starting bid (${listing.startingBid}).`,
      );
    }
  } else {
    const currentBid = await Bid.findById(listing.currentBid);
    if (!currentBid) {
      throw new Error('Current bid not found.');
    }
    if (data.amount <= currentBid.amount) {
      throw new Error(
        `Bid amount must be greater than the current highest bid (${currentBid.amount}).`,
      );
    }
  }

  const newBid = new Bid({
    listingId: data.listingId,
    userId: data.userId,
    paymentIntentId: data.paymentIntentId,
    amount: data.amount,
    addressId: data.addressId,
  });

  const savedBid = await newBid.save();
  await savedBid.populate('userId', 'email');
  listing.currentBid = savedBid._id;
  await listing.save();

  return savedBid;
};

export const getAllBidsByListing = async (listingId) => {
  validateObjectId(listingId);

  const bids = await Bid.find({ listingId })
    .sort({ amount: -1 })
    .populate('userId', 'email')
    .lean();
  if (!bids) {
    throw new Error('Couldn`t find a bids with the specific ID.');
  }
  return bids;
};

export const getAllRelevantBidsByUser = async (userId) => {
  validateObjectId(userId);
  return await aggregateUserBids(userId);
};

export const getAllBidsByUserAndListing = async (userId, listingId) => {
  validateObjectId(userId);
  validateObjectId(listingId);

  const bids = await Bid.find({ userId, listingId }).sort({ createAt: -1 });
  if (!bids) {
    throw new Error('Couldn`t find a bids with the specific ID.');
  }
  return bids;
};
