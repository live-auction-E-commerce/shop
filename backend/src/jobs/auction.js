import Listing from '../models/Listing.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import PaymentIntent from '../models/PaymentIntent.js';
// eslint-disable-next-line no-unused-vars
import Bid from '../models/Bid.js';
import { validateObjectId } from '../lib/validations.js';

/* 
TODO:
- Need to handle the case where the buyer does not have a default address
- Need to handle the case where theres no current bid and we only need to make this listing expired

*/

export const finishAuction = async (listingId) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId).populate('currentBid');
  if (!listing) {
    throw new Error('Listing not found');
  }

  const currentBid = listing.currentBid;
  if (!currentBid || !currentBid.userId) {
    throw new Error('No bids found on this listing');
  }

  const buyerId = currentBid.userId;
  const sellerId = listing.sellerId;
  const price = currentBid.amount || listing.startingBid;

  // I currently set the default address to the buyer's default address.
  const defaultAddress = await Address.findOne({
    userId: buyerId,
    isDefault: true,
  }).exec();

  if (!defaultAddress) {
    throw new Error('Buyer has no default address');
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
    addressId: defaultAddress._id,
    price,
  });

  await newOrder.save();

  listing.isSold = true;
  await listing.save();

  return {
    listingId,
    winnerData: {
      buyerId,
      price,
      listingId,
      paymentIntentId: paymentIntent.stripePaymentIntentId,
    },
  };
};
