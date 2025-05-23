import Product from '../models/Product.js';
import { CategoryEnum, ConditionEnum } from '../constants/enum.js';
import {
  validateEnum,
  validateImages,
  validateObjectId,
} from '../lib/validations.js';

export const createProduct = async (data) => {
  validateEnum(data.category, CategoryEnum, 'category');
  validateEnum(data.condition, ConditionEnum, 'condition');
  validateObjectId(data.ownerId);
  validateImages(data.images);

  const newProduct = new Product({
    ownerId: data.ownerId,
    name: data.name,
    description: data.description || '',
    images: data.images || [],
    category: data.category?.toLowerCase(),
    brand: data.brand?.toLowerCase(),
    condition: data.condition?.toLowerCase(),
    size: data.size,
    listing: data.listing || null,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
};

export const getProductById = async (productId) => {
  validateObjectId(productId);

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Couldn`t find a product with the specific ID.');
  }

  return product;
};

export const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

export const getAllCategoryProducts = async (category) => {
  validateEnum(category, CategoryEnum, 'category');

  const products = await Product.find({ category: category.toLowerCase() });

  if (products.length === 0) {
    throw new Error('No products found for this category');
  }

  return products;
};

/*
  Currently no specific behavior on updating images even tho we will need it
  We need to handle the case where the data being sent are files
*/
export const updateProduct = async (productId, updateData) => {
  validateObjectId(productId);

  if (updateData.category !== undefined) {
    validateEnum(updateData.category, CategoryEnum, 'category');
  }
  if (updateData.condition !== undefined) {
    validateEnum(updateData.condition, ConditionEnum, 'condition');
  }
  if (updateData.images !== undefined) {
    validateImages(updateData.images);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      ...updateData,
    },
    { new: true, runValidators: true },
  );

  if (!updatedProduct) {
    throw new Error('Problem with creating an updated product');
  }

  return updatedProduct;
};
