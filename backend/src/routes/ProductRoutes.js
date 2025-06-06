import express from 'express';
import * as ProductController from '../controllers/ProductController.js';
import { uploadToS3 } from '../middlewares/S3Upload.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';

const router = express.Router();

router.post(
  '/products',
  verifyLoggedIn,
  uploadToS3.array('images', 3),
  ProductController.createProduct,
);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.get(
  '/products/category/:category',
  ProductController.getAllCategoryProducts,
);
router.put('/products/:id', verifyLoggedIn, ProductController.updateProduct);

export default router;
