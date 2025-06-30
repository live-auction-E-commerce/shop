import * as ListingLogic from '../logic/ListingLogic.js';
import { StatusCodes } from 'http-status-codes';
import { buildS3Url } from '../lib/image.js';

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
    const newImageKeys = req.files?.map((file) => file.key) || [];
    const existingImageKeys = JSON.parse(req.body.existingImages || '[]');
    const finalImageKeys = [...existingImageKeys, ...newImageKeys];
    const finalImageUrls = finalImageKeys.map((key) =>
      key.startsWith('http') ? key : buildS3Url(key),
    );

    const updates = {
      ...req.body,
      images: finalImageUrls,
    };
    console.log(updates);

    const editedListing = await ListingLogic.editListing(
      req.params.id,
      updates,
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
export const markListingAsSold = async (req, res) => {
  try {
    const { listingId, amount } = req.body;
    const userId = req.user.id;
    console.log('markListingAsSold request:', { listingId, amount, userId });

    const listing = await ListingLogic.markListingAsSold({
      listingId,
      userId,
      amount,
    });

    res.status(StatusCodes.OK).json(listing);
  } catch (error) {
    console.error('markListingAsSold error:', error);

    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllLiveListingsBySeller = async (req, res) => {
  try {
    const listings = await ListingLogic.getAllLiveListingsBySeller(
      req.params.id,
    );
    res.status(StatusCodes.OK).json(listings);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
