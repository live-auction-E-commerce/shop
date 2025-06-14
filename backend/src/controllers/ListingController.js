import * as ListingLogic from '../logic/ListingLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createListing = async (req, res) => {
  try {
    const listing = await ListingLogic.createListing(req);
    res.status(StatusCodes.CREATED).json(listing);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const editListing = async (req, res) => {
  try {
    const editedListing = await ListingLogic.editListing(
      req.params.id,
      req.body,
    );
    res.status(StatusCodes.OK).json(editedListing);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const deleted = await ListingLogic.deleteListing(req.params.id);
    res.status(StatusCodes.OK).json(deleted);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await ListingLogic.getListingById(req.params.id);
    res.status(StatusCodes.OK).json(listing);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await ListingLogic.getAllListings(req.query, req);
    res.status(StatusCodes.OK).json(listings);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};
