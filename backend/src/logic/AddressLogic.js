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
  const addresses = await Address.find({ userId: user.id }).sort({
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
      { userId: address.userId },
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

  //unset previos addresses
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

  const address = await Address.findByIdAndDelete(addressId);

  if (!address) {
    throw new Error('Address not found');
  }

  return { success: true, message: 'Address deleted successfully' };
};
