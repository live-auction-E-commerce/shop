import express from 'express';
import * as PaymentIntentController from '../controllers/PaymentIntentController.js';

const router = express.Router();

router.post('/paymentintent', PaymentIntentController.createPaymentIntent);

export default router;
