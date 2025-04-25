import * as ProductLogic from '../logic/ProductLogic.js';

export const createProduct = async (req, res) => {
  try {
    const product = await ProductLogic.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductLogic.getProductById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await ProductLogic.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategoryProducts = async (req, res) => {
  try {
    const products = await ProductLogic.getAllCategoryProducts(req.params.category);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductLogic.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
