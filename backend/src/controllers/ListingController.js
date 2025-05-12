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
    const editedListing = await ListingLogic.editListing(
      req.params.id,
      req.body,
    );
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

export const getListingById = async (req, res) => {
  try {
    const listing = await ListingLogic.getListingById(req.params.id);
    res.status(201).json(listing);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await ListingLogic.getAllListings(req.params);
    res.status(201).json(listings);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
