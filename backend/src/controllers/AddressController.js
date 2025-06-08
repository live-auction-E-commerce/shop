import * as AddressLogic from '../logic/AddressLogic.js';

export const createAddress = async (req, res) => {
  try {
    const address = await AddressLogic.createAddress(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAddressByUser = async (req, res) => {
  try {
    const addresses = await AddressLogic.getAllAddressByUser(req.params.id);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await AddressLogic.updateAddress(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.params;
    const updateAddress = await AddressLogic.setDefaultAddress(
      addressId,
      userId,
    );
    res.status(200).json(updateAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDefaultAddress = async (req, res) => {
  try {
    const updatedAddress = await AddressLogic.getDefaultAddress(
      req.params.userId,
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user?._id;

    const result = await AddressLogic.deleteAddress(addressId, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
