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
    res.status(201).json(editedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const deleted = await ListingLogic.deleteListing(req.params.id);
    res.status(201).json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
