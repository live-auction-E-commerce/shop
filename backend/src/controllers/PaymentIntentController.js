import * as PaymentIntentLogic from '../logic/PaymentIntentLogic.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bidId, userId } = req.body;

    const paymentResult = await PaymentIntentLogic.createPaymentIntent({
      amount,
      bidId,
      userId,
    });
    res.status(201).json(paymentResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
