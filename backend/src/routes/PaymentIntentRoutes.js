import express from 'express';
import * as PaymentIntentController from '../controllers/PaymentIntentController.js';
import verifyLoggedIn from '../middlewares/VerifyLoggedIn.js';
const router = express.Router();

router.post(
  '/paymentintent',
  verifyLoggedIn,
  PaymentIntentController.createPaymentIntent,
);

export default router;
