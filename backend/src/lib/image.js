import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../../config.js';

// middlewares for handling images

const storage = multer.diskStorage({
  destination: 'public/Images',
  // File naming is the current timestamp +
  // random number to ensure uniqueness +
  // file extension name
  // so a file named cat.png might be saved as something like:
  // 1714410413658-837423559.png

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new Error('No file provided'), false);
  }

  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
};
export const upload = multer({ storage, fileFilter });

export const getImagePath = (filename) => {
  const filePath = path.join('public/Images', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      'Could not find the file name you have provided. Check public/Images',
    );
  }
  return filePath;
};

export const deleteImage = (filename) => {
  const filePath = path.join('public/Images', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else {
    throw new Error(
      'Could not find the file name you have provided. Check public/Images',
    );
  }
};

export const attachImageUrlsToListing = (listing) => {
  // Make sure productId is populated and has images
  if (!listing.productId || !Array.isArray(listing.productId.images)) {
    listing.imageUrls = [];
    return listing;
  }

  const imageUrls = listing.productId.images.map(
    (filename) => `${config.BASE_URL}/Images/${filename}`,
  );

  return {
    ...listing.toObject(),
    imageUrls,
  };
};
