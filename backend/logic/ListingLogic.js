import Listing from '../models/Listing.js';
import { SaleTypes } from '../constants/enum.js';
import {
  validateEnum,
  validateObjectId,
  validateAuctionUpdates,
  validateBuyNowUpdates,
} from '../lib/utils.js';

export const createListing = async (body) => {
  const { saleType, price, startingBid, expiredAt, productId, sellerId } = body;
  validateEnum(saleType, SaleTypes, 'Sale Type');
  validateObjectId(productId);
  validateObjectId(sellerId);

  if (saleType === 'now') {
    if (!price) {
      throw new Error("Price is required for a 'Buy Now' listing");
    }
  } else if (saleType === 'auction') {
    if (!startingBid) {
      throw new Error('Starting bid is required for an auction listing');
    }
    if (!expiredAt) {
      throw new Error('Expiration date is required for an auction listing');
    }
  }

  const newListing = new Listing({
    productId,
    sellerId,
    saleType,
    price: saleType === 'now' ? price : null,
    startingBid: saleType === 'auction' ? startingBid : null,
    expiredAt: saleType === 'auction' ? expiredAt : null,
  });

  const savedListing = newListing.save();
  return savedListing;
};

export const editListing = async (listingId, updates) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new Error(`Could not find listing with id: ${listingId}`);
  }

  const updatesKeys = Object.keys(updates);
  const saleType = listing.saleType;

  const saleTypeRules = {
    auction: ['currentBid', 'expiredAt', 'isSold'],
    now: ['price', 'isSold'],
  };

  const allowedUpdates = saleTypeRules[saleType];
  // Ensure updated keys are updateable
  for (const key of updatesKeys) {
    if (!allowedUpdates.includes(key)) {
      throw new Error(`Field '${key}' cannot be updated`);
    }
  }

  // Validate Logic per sale type
  if (saleType === 'auction') {
    validateAuctionUpdates(listing, updates);
  } else if (saleType === 'now') {
    validateBuyNowUpdates(listing, updates);
  }

  updatesKeys.forEach((key) => {
    listing[key] = updates[key];
  });

  await listing.save();
  return listing;
};

export const deleteListing = async (listingId) => {
  validateObjectId(listingId);
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new Error('Could not find listing with id: ${listingId}');
  }

  if (listing.isSold) {
    throw new Error('Cannot delete a sold listing');
  }

  await Listing.findByIdAndDelete(listingId);

  return { message: 'Listing deleted successfully' };
};
