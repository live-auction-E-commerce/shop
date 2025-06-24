import Address from '../models/Address.js';
import { validateObjectId } from '../lib/validations.js';

export const createAddress = async (req) => {
  const { user, body } = req;
  validateObjectId(user.id);

  if (body.isDefault) {
    await Address.updateMany(
      { userId: user.id },
      { $set: { isDefault: false } },
    );
  }

  const address = new Address({
    userId: user.id,
    description: body.description,
    street: body.street,
    number: body.number,
    city: body.city,
    country: body.country,
    isDefault: body.isDefault || false,
  });

  await address.save();

  return address;
};

export const getAddressById = async (addressId) => {
  validateObjectId(addressId);

  const address = await Address.findById(addressId);
  return address;
};

export const getAllAddressByUser = async (user) => {
  validateObjectId(user.id);
  const addresses = await Address.find({
    userId: user.id,
    isActive: true,
  }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  return addresses;
};

export const updateAddress = async (addressId, data) => {
  validateObjectId(addressId);

  const { isDefault } = data;

  if (isDefault) {
    const address = await Address.findById(addressId);
    if (!address) {
      throw new Error('Address not found');
    }

    await Address.updateMany(
      { userId: address.userId, isActive: true },
      { $set: { isDefault: false } },
    );
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!updatedAddress) {
    throw new Error('Address not found');
  }

  return updatedAddress;
};

export const setDefaultAddress = async (addressId, userId) => {
  validateObjectId(userId);
  validateObjectId(addressId);

  //unset previous addresses
  await Address.updateMany({ userId }, { $set: { isDefault: false } });

  const updatedAddress = await Address.findByIdAndUpdate(
    { _id: addressId, userId },
    { $set: { isDefault: true } },
    { new: true },
  );

  if (!updatedAddress) {
    throw new Error('address not found or not authorized');
  }

  return updatedAddress;
};

export const getDefaultAddress = async (userId) => {
  validateObjectId(userId);

  const defaultAddress = await Address.findOne({
    userId,
    isDefault: true,
  });

  return defaultAddress; //might be null if none is default
};

export const deleteAddress = async (addressId, userId) => {
  validateObjectId(addressId);
  validateObjectId(userId);

  // Find the address first
  const address = await Address.findOne({ _id: addressId, userId });

  if (!address || !address.isActive) {
    throw new Error('Address not found or not authorized');
  }

  const wasDefault = address.isDefault;

  // Soft delete it
  address.isActive = false;
  address.isDefault = false;
  await address.save();

  if (wasDefault) {
    const nextAddress = await Address.findOne({
      userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (nextAddress) {
      nextAddress.isDefault = true;
      await nextAddress.save();
    }
  }

  return {
    success: true,
    message: 'Address deleted successfully (soft deletion)',
  };
};
