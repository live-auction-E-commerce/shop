import * as BidLogic from '../logic/BidLogic.js';

export const createBid = async (req, res) => {
    try{
        const bid = await BidLogic.createBid(req.body)
        res.status(201).json(bid);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllBidsByListing = async (req, res) => {
    try{
        const bids = await BidLogic.getAllBidsByListing(req.params.id)
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllBidsByUser = async (req, res) => {
    try{
        const bids = await BidLogic.getAllBidsByUser(req.params.id)
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllBidsByUserAndListing = async (req, res) => {
    try{
        const { listingId, userId } = req.params;
        const bids = await BidLogic.getAllBidsByUserAndListing(listingId, userId);
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};