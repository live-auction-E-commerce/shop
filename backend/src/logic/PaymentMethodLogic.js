import PaymentMethod from '../models/PaymentMethod.js';
import { validateObjectId } from '../lib/validations.js';

export const addPaymentMethod = async (data) => {
  const {
    userId,
    cardLast4,
    cardBrand,
    expirationMonth,
    expirationYear,
    billingAddress,
    stripePaymentMethodId,
    isDefault = false,
  } = data;

  validateObjectId(userId);
  validateObjectId(billingAddress);

  if (isDefault) {
    await PaymentMethod.updateMany({ userId }, { $set: { isDefault: false } });
  }

  const newPaymentMethod = await PaymentMethod.create({
    userId,
    cardLast4,
    cardBrand,
    expirationMonth,
    expirationYear,
    billingAddress,
    stripePaymentMethodId,
    isDefault,
  });

  return newPaymentMethod;
};

export const getUserPaymentMethods = async (userId) => {
  validateObjectId(userId);
  const methods = await PaymentMethod.find({ userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
  return methods;
};

export const setDefaultPaymentMethod = async (paymentMethodId, userId) => {
  validateObjectId(paymentMethodId);
  validateObjectId(userId);

  // Unset previous defaults
  await PaymentMethod.updateMany({ userId }, { $set: { isDefault: false } });

  // Set the selected payment method as default
  const updatedPaymentMethod = await PaymentMethod.findOneAndUpdate(
    { _id: paymentMethodId, userId },
    { $set: { isDefault: true } },
    { new: true },
  );

  if (!updatedPaymentMethod) {
    throw new Error('Payment method not found or not authorized');
  }

  return updatedPaymentMethod;
};

export const getDefaultPaymentMethod = async (userId) => {
  validateObjectId(userId);

  const defaultPaymentMethod = await PaymentMethod.findOne({
    userId,
    isDefault: true,
  });

  return defaultPaymentMethod; // might be null if none is default
};
