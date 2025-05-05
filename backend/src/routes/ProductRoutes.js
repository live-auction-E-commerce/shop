import express from 'express';
import * as ProductController from '../controllers/ProductController.js';
import { upload } from '../lib/image.js';

const router = express.Router();

router.post('/products', upload.array('images' , 3) ,ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.get('/products/category/:category', ProductController.getAllCategoryProducts);
router.put('/products/:id', ProductController.updateProduct);

export default router;
