import mongoose, { mongo } from 'mongoose';
import Product from '../models/Product';
import { CategoryEnum, ConditionEnum, AllowedExtensions } from '../constants/enum';

export const createProduct = async (data) => {
  const category = data.category?.toLowerCase();
  if (!CategoryEnum.includes(category)) {
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
    throw new Error('Invalid ownerId: must be a valid MongoDB ObjectId.');
  }

  const newProduct = new Product({
    ownerId: data.ownerId,
    name: data.name,
    description: data.description || '',
    images: data.images || [],
    category: data.category,
    brand: data.brand,
    condition: data.condition,
    size: data.size,
    listing: data.listing || null,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
};

export const getProductById = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid product ID');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Invalid productId: must be a valid MongoDB ObjectId.');
  }

  return product;
};

export const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

export const getAllCategoryProducts = async (category) => {
  if (!CategoryEnum.includes(category.toLowerCase())) {
    throw new Error(`Invalid category. Valid categories are: ${CategoryEnum.join(', ')}`);
  }

  const products = await Product.find({ category: category.toLowerCase() });

  if (products.length === 0) {
    throw new Error('No products found for this category');
  }

  return products;
};

export const updateProduct = async (productId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid productId: must be a valid MongoDB ObjectId.');
  }

  const category = updateData.category?.toLowerCase();
  if (!CategoryEnum.includes(category)) {
    throw new Error(`Invalid category. valid categories are: ${CategoryEnum.join(', ')}`);
  }

  if (!ConditionEnum.includes(updateData.condition)) {
    throw new Error(`Invalid condition. valid conditions are: ${ConditionEnum.join(',')}`);
  }

  //Stuff related to images

  if (updateData.images && !Array.isArray(updateData.images)) {
    throw new Error('Images must be an array');
  }

  for (const image of updateData.images) {
    const ext = image.slice(image.lastIndexOf('.')).toLowerCase();
    if (!AllowedExtensions.includes(ext)) {
      throw new Error(
        `Invalid image format: ${image}. Allowed formats are: ${AllowedExtensions.join(', ')}`
      );
    }
  }

  if (updateData.images && updateData.images.length === 0) {
    throw new Error('At least one image is required');
  }
  // End of stuff related to images

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      ...updateData,
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error('Problem with creating an updated product');
  }

  return updatedProduct;
};
