import Listing from '../models/Listing.js';
import Product from '../models/Product.js';
import { SaleTypes } from '../constants/enum.js';
import {
  validateEnum,
  validateObjectId,
  validateAuctionUpdates,
  validateBuyNowUpdates,
} from '../lib/validations.js';
import { attachImageUrlsToListing } from '../lib/image.js';
import { auctionQueue } from '../jobs/queue.js';

const MAX_AUCTION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds

export const createListing = async (req) => {
  const SELLER_ROLE = 'Seller';
  const { saleType, price, startingBid, expiredAt, productId } = req.body;
  const { user } = req;
  validateEnum(saleType, SaleTypes, 'Sale Type');
  validateObjectId(productId);
  validateObjectId(user.id);
  console.log(user);
  if (user.role !== SELLER_ROLE) {
    throw new Error('You must be a seller to post a new listing!');
  }

  if (!user.isEmailVerified) {
    throw new Error('You must verify your email to post new listings!');
  }

  if (saleType === 'now') {
    if (!price) {
      throw new Error("Price is required for a 'Buy Now' listing");
    }
  } else if (saleType === 'auction') {
    if (!startingBid) {
      throw new Error('Starting bid is required for an auction listing');
    }
    const expiryDate = new Date(expiredAt);

    if (isNaN(expiryDate.getTime())) {
      throw new Error('Expiration date is invalid.');
    }

    const now = Date.now();

    if (expiryDate.getTime() <= now) {
      throw new Error('Expiration date must be in the future.');
    }

    if (expiryDate.getTime() - now > MAX_AUCTION_DURATION) {
      throw new Error('Expiration date cannot be more than 30 days from now.');
    }
  }

  const newListing = new Listing({
    productId: productId,
    sellerId: user.id,
    saleType: saleType,
    price: saleType === 'now' ? price : null,
    startingBid: saleType === 'auction' ? startingBid : null,
    expiredAt: saleType === 'auction' ? expiredAt : null,
  });

  const savedListing = await newListing.save();

  if (saleType === 'auction') {
    const delay = new Date(expiredAt).getTime() - Date.now();

    if (delay > 0) {
      await auctionQueue.add(
        'endAuction',
        { listingId: savedListing._id.toString() },
        { delay },
      );
      console.log(`📦 Auction end job scheduled in ${delay} ms`);
    } else {
      console.warn('⚠️ Auction expiredAt is already past. Job not scheduled.');
    }
  }

  return savedListing;
};

export const editListing = async (listingId, updates) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId).populate('productId');
  if (!listing) {
    throw new Error(`Could not find listing with id: ${listingId}`);
  }

  const productUpdates = {};
  const productFields = [
    'name',
    'description',
    'brand',
    'category',
    'condition',
    'size',
    'images',
  ];
  for (const key of productFields) {
    if (updates[key] !== undefined) {
      productUpdates[key] = updates[key];
    }
  }

  const listingUpdates = {};
  const allowedListingFields =
    listing.saleType === 'auction'
      ? ['currentBid', 'expiredAt', 'isSold', 'startingBid']
      : ['price', 'isSold'];

  for (const key of allowedListingFields) {
    if (updates[key] !== undefined) {
      listingUpdates[key] = updates[key];
    }
  }

  if (listing.saleType === 'auction') {
    validateAuctionUpdates(listing, listingUpdates);
  } else if (listing.saleType === 'now') {
    validateBuyNowUpdates(listing, listingUpdates);
  }

  Object.assign(listing, listingUpdates);
  await listing.save();

  if (Object.keys(productUpdates).length > 0) {
    Object.assign(listing.productId, productUpdates);
    await listing.productId.save();
  }

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
  const productId = listing.productId?._id;

  await Listing.findByIdAndDelete(listingId);
  if (productId) {
    await Product.findByIdAndDelete(productId);
  }

  return { message: 'Listing and associated product deleted successfully' };
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

  const now = new Date();

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
    {
      $match: {
        $and: [
          { $or: [{ isSold: false }, { isSold: { $exists: false } }] },
          {
            $or: [
              { saleType: { $ne: 'auction' } },
              { expiredAt: { $gt: now } },
            ],
          },
        ],
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

// eslint-disable-next-line no-unused-vars
export const markListingAsSold = async ({ listingId, amount, userId }) => {
  validateObjectId(listingId);

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new Error('Listing not found');
  }

  if (listing.isSold) {
    throw new Error('Listing has already been sold');
  }

  if (listing.saleType !== 'now') {
    throw new Error('Only Buy Now listings can be marked as sold');
  }

  if (listing.price !== amount) {
    throw new Error('Payment amount does not match listing price');
  }

  listing.isSold = true;

  await listing.save();

  return listing;
};

export const getAllLiveListingsBySeller = async (sellerId) => {
  validateObjectId(sellerId);

  const now = new Date();

  const listings = await Listing.find({
    sellerId,
    isSold: { $ne: true },
    $or: [{ saleType: { $ne: 'auction' } }, { expiredAt: { $gt: now } }],
  })
    .populate({
      path: 'productId',
      model: 'Product',
    })
    .populate({
      path: 'currentBid',
      model: 'Bid',
    })
    .sort({ createdAt: -1 });

  return listings.map(attachImageUrlsToListing);
};
