import * as PaymentMethodLogic from '../logic/PaymentMethodLogic.js';

export const addPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethodLogic.addPaymentMethod(req.body);
    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethodLogic.getUserPaymentMethods(
      req.params.id,
    );
    res.status(201).json(paymentMethods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const setDefaultPaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId, userId } = req.params;
    const paymentMethod = await PaymentMethodLogic.setDefaultPaymentMethod(
      paymentMethodId,
      userId,
    );
    res.status(200).json(paymentMethod);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getDefaultPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethodLogic.getDefaultPaymentMethod(
      req.params.id,
    );
    res.status(200).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
