import express from 'express';
import * as ProductController from '../controllers/ProductController.js';
import { upload } from '../lib/image.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.post(
  '/products',
  verifyLoggedIn,
  upload.array('images', 3),
  ProductController.createProduct,
);
router.get('/products', verifyLoggedIn, ProductController.getAllProducts);
router.get('/products/:id', verifyLoggedIn, ProductController.getProductById);
router.get(
  '/products/category/:category',
  verifyLoggedIn,
  ProductController.getAllCategoryProducts,
);
router.put('/products/:id', verifyLoggedIn, ProductController.updateProduct);

export default router;
