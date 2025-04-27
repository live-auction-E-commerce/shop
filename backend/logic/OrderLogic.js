import Order from "../models/Order.js";
import { validateEnum, validateObjectId } from "../lib/utils.js";
import { SaleTypes } from "../constants/enum.js";

export const createOrder = async (data) => {
    const {
        buyerId,
        sellerId,
        listingId,
        addressId,
        price,
        createdAt,
    } = data;

    validateObjectId(buyerId);
    validateObjectId(sellerId);
    validateObjectId(listingId);
    validateObjectId(addressId);

    const newOrder = await Order.create ({
        buyerId,
        sellerId,
        listingId,
        addressId,
        price,
        createdAt,
    });

    return newOrder;
}

export const getAllOrdersBySeller = async (sellerId) => {
    validateObjectId(sellerId);

    const Orders = await Order.find ({sellerId}).sort({createdAt: -1});

    return Orders;
}

export const getAllOrdersByBuyer = async (buyerId) => {
    validateObjectId(buyerId);

    const Orders = await Order.find ({buyerId}).sort({createdAt: -1});

    return Orders;
}

export const getAllOrdersByUser = async (userId) => {
    validateObjectId(userId);

    const orders = await Order.find ({
        $or: [
            { buyerId: userId },  
            { sellerId: userId }   
        ]
    }).sort({createdAt: -1});

    return orders; //might be null if user doesnt have any orders
}

export const getOrderById = async (orderId) =>{
    validateObjectId(orderId);

    const order = await Order.findById(orderId);
    if (!order){
        throw new Error("couldn't find the order with the specific ID");
    }

    return order;
};

export const getAllOrdersOfUserBySaleType = async (userId,saleType) => {
    validateObjectId(userId);
    validateEnum(saleType, SaleTypes, 'Sale Type');

    const orders = await Order.find({
        $or: [
            { buyerId: userId },  
            { sellerId: userId }   
        ]
    })
        .populate('listingId')  // Populate the listingId field to get the Listing data
        .then((orders) => 
            orders.filter(order => order.listingId.saleType === saleType)
        );
    return orders;//might be null if the user doesn't has order in the selected saleType
}

