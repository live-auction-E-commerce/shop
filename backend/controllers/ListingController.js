import * as ListingLogic from '../logic/ListingLogic.js';

export const createListing = async (req, res) => {
  try {
    const listing = await ListingLogic.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
