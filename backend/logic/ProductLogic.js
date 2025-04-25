import Product from '../models/Product';
import { CategoryEnum, ConditionEnum } from '../constants/enum';
import { validateEnum, validateImages, validateObjectId } from '../lib/utils.js';

export const createProduct = async (data) => {
  validateEnum(data.category, CategoryEnum, 'category');
  validateEnum(data.condition, ConditionEnum, 'condition');
  validateImages(data.images);
  validateObjectId(data.ownerId);

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

export const updateProduct = async (productId, updateData) => {
  validateObjectId(productId);
  validateEnum(updateData.category, CategoryEnum, 'category');
  validateEnum(updateData.condition, ConditionEnum, 'condition');
  validateImages();

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
