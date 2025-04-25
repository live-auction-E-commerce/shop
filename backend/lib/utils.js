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
    throw new Error(`Invalid ${name}, Valid ${name}s are: ${validEnum.join(',')} `);
  }
};

export const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`${id.toString()} is not a valid MongoDB ObjectId.`);
  }
};
