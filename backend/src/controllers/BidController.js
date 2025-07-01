import * as BidLogic from '../logic/BidLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createBid = async (req, res) => {
  try {
    const bid = await BidLogic.createBid(req.body);
    res.status(StatusCodes.CREATED).json(bid);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllBidsByListing = async (req, res) => {
  try {
    const bids = await BidLogic.getAllBidsByListing(req.params.id);
    res.status(StatusCodes.OK).json(bids);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllRelevantlBidsByUser = async (req, res) => {
  try {
    const bids = await BidLogic.getAllRelevantBidsByUser(req.user.id);
    res.status(StatusCodes.OK).json(bids);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllBidsByUserAndListing = async (req, res) => {
  try {
    const { listingId, userId } = req.params;
    const bids = await BidLogic.getAllBidsByUserAndListing(listingId, userId);
    res.status(StatusCodes.OK).json(bids);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
