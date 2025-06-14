import * as PaymentIntentLogic from '../logic/PaymentIntentLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const { user } = req;
    console.log('heLLO');

    const paymentResult = await PaymentIntentLogic.createPaymentIntent({
      amount,
      userId: user.id,
    });

    res.status(StatusCodes.CREATED).json(paymentResult);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
