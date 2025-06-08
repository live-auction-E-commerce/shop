import config from '../../config.js';

export const attachImageUrlsToListing = (listing) => {
  if (!listing.productId || !Array.isArray(listing.productId.images)) {
    listing.imageUrls = [];
    return listing;
  }

  const buildS3Url = (key) =>
    `https://${config.AWS_S3_BUCKET_NAME}.s3.${config.AWS_REGION}.amazonaws.com/${key}`;

  const imageUrls = listing.productId.images.map((key) => buildS3Url(key));

  return {
    ...listing.toObject(),
    imageUrls,
  };
};
