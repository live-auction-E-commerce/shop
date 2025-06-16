import * as AddressLogic from '../logic/AddressLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createAddress = async (req, res) => {
  try {
    const address = await AddressLogic.createAddress(req);
    res.status(StatusCodes.CREATED).json(address);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllAddressByUser = async (req, res) => {
  try {
    const addresses = await AddressLogic.getAllAddressByUser(req.user);
    res.status(StatusCodes.OK).json(addresses);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const address = await AddressLogic.getAddressById(req.params.id);
    res.status(StatusCodes.OK).json(address);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await AddressLogic.updateAddress(
      req.params.id,
      req.body,
    );
    res.status(StatusCodes.OK).json(updatedAddress);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.params;
    const updatedAddress = await AddressLogic.setDefaultAddress(
      addressId,
      userId,
    );
    res.status(StatusCodes.OK).json(updatedAddress);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getDefaultAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const defaultAddress = await AddressLogic.getDefaultAddress(userId);
    res.status(StatusCodes.OK).json(defaultAddress);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user?._id; // assuming auth middleware adds `user`

    const result = await AddressLogic.deleteAddress(addressId, userId); // secure version
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
