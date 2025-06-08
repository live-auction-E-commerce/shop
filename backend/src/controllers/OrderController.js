import * as OrderLogic from '../logic/OrderLogic.js';
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req, res) => {
  try {
    const order = await OrderLogic.createOrder(req.body);
    res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderLogic.getOrderById(req.params.id);
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllOrdersBySeller = async (req, res) => {
  try {
    const orders = await OrderLogic.getAllOrdersBySeller(req.params.id);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllOrdersByBuyer = async (req, res) => {
  try {
    const orders = await OrderLogic.getAllOrdersByBuyer(req.params.id);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllOrdersOfBuyerBySaleType = async (req, res) => {
  try {
    const { buyerId, saleType } = req.params;
    const orders = await OrderLogic.getAllOrdersOfBuyerBySaleType(
      buyerId,
      saleType,
    );
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

export const getAllOrdersOfSellerBySaleType = async (req, res) => {
  try {
    const { sellerId, saleType } = req.params;
    const orders = await OrderLogic.getAllOrdersOfSellerBySaleType(
      sellerId,
      saleType,
    );
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};
