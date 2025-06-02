import express from 'express';
import * as OrderController from '../controllers/OrderController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';
import verifySeller from '../middlewares/verifySeller.js';

const router = express.Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders/:id', OrderController.getOrderById);
router.get(
  '/orders/seller/:id',
  verifyLoggedIn,
  verifySeller,
  OrderController.getAllOrdersBySeller,
);
router.get(
  '/orders/buyer/:id',
  verifyLoggedIn,
  OrderController.getAllOrdersByBuyer,
);
router.get(
  '/orders/buyer/:buyerId/:saleType',
  verifyLoggedIn,
  OrderController.getAllOrdersOfBuyerBySaleType,
);
router.get(
  '/orders/seller/:sellerId/:saleType',
  verifyLoggedIn,
  verifySeller,
  OrderController.getAllOrdersOfSellerBySaleType,
);

export default router;
