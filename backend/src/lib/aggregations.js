import Listing from '../models//Listing.js';
import Bid from '../models/Bid.js';
import mongoose from 'mongoose';

/**
 * Aggregate all listings with optional search query
 */
export const aggregateAllListings = async (queryParams) => {
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

  return await Listing.aggregate(pipeline);
};

export const aggregateUserBids = async (userId) => {
  const pipeline = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: '$listingId',
        latestBid: { $first: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$latestBid' },
    },
    // Lookup listing info
    {
      $lookup: {
        from: 'listings',
        localField: 'listingId',
        foreignField: '_id',
        as: 'listing',
      },
    },
    { $unwind: '$listing' },
    // Lookup product info for the listing
    {
      $lookup: {
        from: 'products',
        localField: 'listing.productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    // Lookup the winning bid of the listing to determine status
    {
      $lookup: {
        from: 'bids',
        localField: 'listing.currentBid',
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
    // Add the status field based on current date, sold, and winning bid
    {
      $addFields: {
        status: {
          $cond: [
            { $gt: ['$listing.expiredAt', new Date()] }, // auction ongoing if expiredAt in future
            'ongoing',
            {
              $cond: [
                { $eq: ['$_id', '$currentBid._id'] }, // if this bid is winning bid
                'won',
                'lost',
              ],
            },
          ],
        },
      },
    },
    // Project desired fields for the frontend shape
    {
      $project: {
        _id: 0,
        bid: '$$ROOT', // includes all bid fields plus listing, product, currentBid, status
        listing: 1,
        product: 1,
        status: 1,
      },
    },
  ];

  return await Bid.aggregate(pipeline);
};
