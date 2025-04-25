import Listing from '../models/Listing.js';
import { SaleTypes } from '../constants/enum.js';
import { validateEnum } from '../lib/utils.js';

export const createListing = async (body) => {
  const { saleType, price, startingBid, expiredAt, productId, sellerId } = body;
  validateEnum(saleType, SaleTypes, 'Sale Type');

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
