import Bid from '../models/Bid.js';
import Listing from '../models/Listing.js';
import User from '../models/User.js';
//import PaymentIntent from '../models/PaymentIntent.js';
import { validateObjectId } from '../lib/validations.js';

export const createBid = async (data) => {
  //const { listingId, userId, paymentIntentId, amount } = data;
  validateObjectId(data.listingId);
  validateObjectId(data.userId);
  validateObjectId(data.paymentIntentId);

  if (typeof data.amount !== 'number' || data.amount <= 0) {
    throw new Error('Invalid amount: must be a positive number.');
  }

  const listing = await Listing.findById(data.listingId);
  if (!listing) {
    throw new Error('Listing not found.');
  }

  /* We still dont have User logic so commenting this for now */

  // const user = await User.findById(data.userId);
  // if (!user) {
  //   throw new Error('User not found.');
  // }

  /* TODO: We still don`t have paymentIntet logic so commenting this for now 
   const paymentIntent = await PaymentIntent.findById(data.paymentIntentId);
   if (!paymentIntent) {
     throw new Error('PaymentIntent not found.');
   }
  */

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
  });

  const savedBid = await newBid.save();
  listing.currentBid = savedBid._id;
  await listing.save();

  return savedBid;
};

export const getAllBidsByListing = async (listingId) => {
  validateObjectId(listingId);

  const bids = await Bid.find({ listingId }).sort({ createAt: -1 });
  if (!bids) {
    throw new Error('Couldn`t find a bids with the specific ID.');
  }
  return bids;
};

export const getAllBidsByUser = async (userId) => {
  validateObjectId(userId);

  const bids = await Bid.find({ userId }).sort({ createAt: -1 });
  if (!bids) {
    throw new Error('Couldn`t find a bids with the specific ID.');
  }
  return bids;
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
