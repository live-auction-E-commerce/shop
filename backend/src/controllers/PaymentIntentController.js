import * as PaymentIntentLogic from '../logic/PaymentIntentLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bidId, userId } = req.body;

    const paymentResult = await PaymentIntentLogic.createPaymentIntent({
      amount,
      bidId,
      userId,
    });

    res.status(StatusCodes.CREATED).json(paymentResult);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
