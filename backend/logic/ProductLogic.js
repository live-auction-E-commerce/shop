import mongoose from 'monogoose';
import Product from '../models/Product';
import { CategoryEnum, ConditionEnum, AllowedExtensions } from '../constants/enum';

export const createProduct = async (data) => {
  if (!CategoryEnum.includes(data.category?.toLowerCase())) {
    throw new Error(`Invalid category. valid categories are: ${CategoryEnum.join(', ')}`);
  }

  if (!ConditionEnum.includes(data.condition)) {
    throw new Error(`Invalid condition. valid conditions are: ${ConditionEnum.join(',')}`);
  }

  //Stuff related to images

  if (data.images && !Array.isArray(data.images)) {
    throw new Error('Images must be an array');
  }

  for (const image of data.images) {
    const ext = image.slice(image.lastIndexOf('.')).toLowerCase();
    if (!AllowedExtensions.includes(ext)) {
      throw new Error(
        `Invalid image format: ${image}. Allowed formats are: ${AllowedExtensions.join(', ')}`
      );
    }
  }

  if (data.images && data.images.length === 0) {
    throw new Error('At least one image is required');
  }
  // End of stuff related to images

  if (!mongoose.Types.ObjectId.isValid(data.ownerId)) {
    throw new Error('Invalid owner ID, make sure the type of this object is mongoose objectId');
  }

  const newProduct = new Product({
    ownerId: data.ownerId,
    name: data.name,
    description: data.description || '',
    images: data.images || [],
    category: data.category.toLowerCase(), // since your enum is lowercase
    brand: data.brand,
    condition: data.condition,
    size: data.size,
    listing: data.listing || null,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
};
