import express from 'express';
import * as OrderController from '../controllers/OrderController.js';

const router = express.Router();

router.post('/orders',OrderController.createOrder);
router.get('/orders/:id',OrderController.getOrderById);
router.get('/orders/seller/:id',OrderController.getAllOrdersBySeller);
router.get('/orders/buyer/:id',OrderController.getAllOrdersByBuyer);
router.get('/orders/buyer/:buyerId/:saleType',OrderController.getAllOrdersOfBuyerBySaleType);
router.get('/orders/seller/:sellerId/:saleType',OrderController.getAllOrdersOfSellerBySaleType);


export default router;