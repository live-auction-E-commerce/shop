import Listing from '../models/Listing.js';
import { SaleTypes } from '../constants/enum.js';
import {
  validateEnum,
  validateObjectId,
  validateAuctionUpdates,
  validateBuyNowUpdates,
} from '../lib/validations.js';
import { attachImageUrlsToListing } from '../lib/image.js';

export const createListing = async (body) => {
  const { saleType, price, startingBid, expiredAt, productId, user } = body;
  validateEnum(saleType, SaleTypes, 'Sale Type');
  validateObjectId(productId);
  validateObjectId(user._id);
  console.log(body);

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
    productId: productId,
    sellerId: user._id,
    saleType: saleType,
    price: saleType === 'now' ? price : null,
    startingBid: saleType === 'auction' ? startingBid : null,
    expiredAt: saleType === 'auction' ? expiredAt : null,
  });

  const savedListing = await newListing.save();
  return savedListing;
};

export const editListing = async (listingId, updates) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId).populate('productId');
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
  const listing = await Listing.findById(listingId).populate('productId');
  if (!listing) {
    throw new Error('Could not find listing with id: ${listingId}');
  }

  if (listing.isSold) {
    throw new Error('Cannot delete a sold listing');
  }

  await Listing.findByIdAndDelete(listingId);

  return { message: 'Listing deleted successfully' };
};

export const getListingById = async (listingId) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId)
    .populate('productId')
    .populate('currentBid');
  if (!listing) {
    throw new Error('Could not find listing with id: ${listingId}');
  }
  // Adding the imageUrls field to the listing object
  return attachImageUrlsToListing(listing);
};

// eslint-disable-next-line no-unused-vars
export const getAllListings = async (queryParams, req) => {
  const { q } = queryParams;

  const pipeline = [
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $lookup: {
        from: 'bids',
        localField: 'currentBid',
        foreignField: '_id',
        as: 'currentBid',
      },
    },
    {
      $unwind: {
        path: '$currentBid',
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  if (q && q.trim().length > 1) {
    const regex = new RegExp(q, 'i');
    pipeline.push({
      $match: {
        $or: [
          { 'product.name': regex },
          { 'product.description': regex },
          { 'product.brand': regex },
          { 'product.category': regex },
          { 'product.condition': regex },
          { 'product.size': regex },
        ],
      },
    });
  }

  const results = await Listing.aggregate(pipeline);
  return results;
};
