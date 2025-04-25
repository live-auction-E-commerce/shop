import mongoose from 'mongoose';
import { AllowedExtensions } from '../constants/enum.js';

export const validateImages = (images) => {
  if (!images || !Array.isArray(images)) {
    throw new Error('Images must be an array');
  }

  if (images.length === 0) {
    throw new Error('At least one image is required');
  }

  for (const image of images) {
    const ext = image.slice(image.lastIndexOf('.')).toLowerCase();
    if (!AllowedExtensions.includes(ext)) {
      throw new Error(
        `Invalid image formet: ${image}. Allowed formats are: ${AllowedExtensions.join(',')}`
      );
    }
  }
};

export const validateEnum = (value, validEnum, name) => {
  if (!value || !validEnum.includes(value.toLowerCase())) {
    console.log('Value:', value);
    console.log('Normalized:', value?.toLowerCase());
    console.log('Enum:', validEnum);
    throw new Error(`Invalid ${name}, Valid ${name}s are: ${validEnum.join(',')} `);
  }
};

export const validateObjectId = (id) => {
  if (!id) {
    throw new Error('ID cannot be null or undefined');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`${id.toString()} is not a valid MongoDB ObjectId.`);
  }
};

export const validateAuctionUpdates = (listing, updates) => {
  if (updates.expiredAt && new Date(updates.expiredAt) <= new Date(listing.expiredAt)) {
    throw new Error('New expiredAt must be later than the current one');
  }

  if (updates.isSold && listing.isSold) {
    throw new Error('Listing is already sold and cannot be updated');
  }

  if (updates.currentBid) {
    validateObjectId(updates.currentBid);
  }
};

export const validateBuyNowUpdates = (listing, updates) => {
  if (updates.isSold && listing.isSold) {
    throw new Error('Listing is already sold and cannot be updated');
  }
};
