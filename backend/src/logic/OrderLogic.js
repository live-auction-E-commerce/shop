import Order from '../models/Order.js';
import { validateEnum, validateObjectId } from '../lib/validations.js';
import { SaleTypes } from '../constants/enum.js';

export const createOrder = async (data) => {
  const { buyerId, sellerId, listingId, addressId, price, createdAt } = data;

  validateObjectId(buyerId);
  validateObjectId(sellerId);
  validateObjectId(listingId);
  validateObjectId(addressId);

  const newOrder = await Order.create({
    buyerId,
    sellerId,
    listingId,
    addressId,
    price,
    createdAt,
  });

  return newOrder;
};

export const getAllOrdersBySeller = async (sellerId) => {
  validateObjectId(sellerId);

  const Orders = await Order.find({ sellerId })
    .populate({
      path: 'listingId',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    })
    .populate('buyerId', 'email')
    .populate('sellerId', 'email')
    .populate('addressId')
    .sort({ createdAt: -1 });

  return Orders;
};

export const getAllOrdersByBuyer = async (buyerId) => {
  validateObjectId(buyerId);

  const Orders = await Order.find({ buyerId })
    .populate({
      path: 'listingId',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    })
    .populate('buyerId', 'email')
    .populate('sellerId', 'email')
    .populate('addressId')
    .sort({ createdAt: -1 });

  return Orders;
};

export const getOrderById = async (orderId) => {
  validateObjectId(orderId);

  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("couldn't find the order with the specific ID");
  }

  return order;
};

export const getAllOrdersOfBuyerBySaleType = async (buyerId, saleType) => {
  validateObjectId(buyerId);
  validateEnum(saleType, SaleTypes, 'Sale Type');

  const orders = await Order.find({ buyerId })
    .populate('listingId') // Populate the listingId field to get the Listing data
    .then((orders) =>
      orders.filter((order) => order.listingId.saleType === saleType),
    );
  return orders; //might be null if the user doesn't has order in the selected saleType
};
export const getAllOrdersOfSellerBySaleType = async (sellerId, saleType) => {
  validateObjectId(sellerId);
  validateEnum(saleType, SaleTypes, 'Sale Type');

  const orders = await Order.find({ sellerId })
    .populate('listingId') // Populate the listingId field to get the Listing data
    .then((orders) =>
      orders.filter((order) => order.listingId.saleType === saleType),
    );
  return orders; //might be null if the user doesn't has order in the selected saleType
};
