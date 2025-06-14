import * as ProductLogic from '../logic/ProductLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createProduct = async (req, res) => {
  try {
    const { category, condition, name, brand, description, size, listing } =
      req.body;
    const { user } = req;
    const ownerId = user.id;
    const images = req.files.map((file) => file.location);
    const productData = {
      category,
      condition,
      name,
      brand,
      description,
      size,
      listing,
      ownerId,
      images,
    };
    const product = await ProductLogic.createProduct(productData);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductLogic.getProductById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await ProductLogic.getAllProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllCategoryProducts = async (req, res) => {
  try {
    const products = await ProductLogic.getAllCategoryProducts(
      req.params.category,
    );
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductLogic.updateProduct(
      req.params.id,
      req.body,
    );
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
