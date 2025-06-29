import Listing from '../models/Listing.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import PaymentIntent from '../models/PaymentIntent.js';
// eslint-disable-next-line no-unused-vars
import User from '../models/User.js';
// eslint-disable-next-line no-unused-vars
import Bid from '../models/Bid.js';
// eslint-disable-next-line no-unused-vars
import Product from '../models/Product.js';
import { validateObjectId } from '../lib/validations.js';

/* 
TODO:
- Need to handle the case where the buyer does not have a default address
- Need to handle the case where theres no current bid and we only need to make this listing expired

*/

export const finishAuction = async (listingId) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId)
    .populate({
      path: 'currentBid',
      populate: {
        path: 'userId',
        model: 'User',
        select: '_id email',
      },
    })
    .populate('sellerId', '_id email')
    .populate('productId');
  if (!listing) {
    throw new Error('Listing not found');
  }

  const currentBid = listing.currentBid;
  if (!currentBid || !currentBid.userId) {
    throw new Error('No bids found on this listing');
  }

  const buyerId = currentBid.userId._id;
  const buyerEmail = currentBid.userId.email;
  const sellerId = listing.sellerId._id;
  const sellerEmail = listing.sellerId.email;
  const price = currentBid.amount || listing.startingBid;

  const bidAddress =
    currentBid.addressId &&
    (await Address.findOne({ _id: currentBid.addressId }));

  if (!bidAddress) {
    throw new Error('No valid address associated with the winning bid.');
  }

  const paymentIntent = await PaymentIntent.findById(
    currentBid.paymentIntentId,
  );
  if (!paymentIntent || !paymentIntent.stripePaymentIntentId) {
    throw new Error('No valid payment intent found for the winning bid');
  }

  const newOrder = new Order({
    buyerId,
    sellerId,
    listingId,
    addressId: bidAddress._id,
    price,
  });

  await newOrder.save();

  listing.isSold = true;
  await listing.save();

  return {
    winnerData: {
      productName: listing.productId.name,
      buyerId,
      buyerEmail,
      sellerEmail,
      price,
      listingId,
      paymentIntentId: paymentIntent.stripePaymentIntentId,
    },
  };
};
