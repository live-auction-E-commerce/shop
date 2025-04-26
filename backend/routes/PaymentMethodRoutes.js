import express from 'express';
import * as PaymentMethodController from '../controllers/PaymentMethodController.js';

const router = express.Router();

router.post('/paymentmethods', PaymentMethodController.addPaymentMethod);
router.get('/paymentmethods/:id', PaymentMethodController.getUserPaymentMethods);
router.get('/paymentmethods/:userId/default', PaymentMethodController.getDefaultPaymentMethod);
router.put(
  '/paymentmethods/:paymentMethodId/:userId',
  PaymentMethodController.setDefaultPaymentMethod
);

export default router;
