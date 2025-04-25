import * as ListingLogic from '../logic/ListingLogic.js';

export const createListing = async (req, res) => {
  try {
    const listing = await ListingLogic.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editListing = async (req, res) => {
  try {
    const editedListing = await ListingLogic.editListing(req.params.id, req.body);
    console.log(editedListing);
    res.status(201).json(editedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
