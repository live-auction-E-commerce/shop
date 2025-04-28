import * as OrderLogic from '../logic/OrderLogic.js';

export const createOrder = async (req, res) =>{
   try {
       const order = await OrderLogic.createOrder(req.body);
       res.status(201).json(order);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
};

export const getOrderById = async (req,res) => {
    try{
      const order = await OrderLogic.getOrderById(req.params.id)
      res.status(201).json(order);
    } catch (error){
        res.status(400).json({error: error.message});
    }  
};

export const getAllOrdersBySeller = async (req,res) => {
   try {
       const orders = await OrderLogic.getAllOrdersBySeller(req.params.id);
       res.status(200).json(orders);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
}; 
export const getAllOrdersByBuyer = async (req, res) => {
    try {
        const orders = await OrderLogic.getAllOrdersByBuyer(req.params.id);
        res.status(200).json(orders);
     } catch (error) {
        res.status(500).json({ error: error.message });
     }
 };

 

export const getAllOrdersOfBuyerBySaleType = async (req, res) => {
    try{
        const {buyerId, saleType} = req.params;
        const orders = await OrderLogic.getAllOrdersOfBuyerBySaleType(buyerId,saleType);
        res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


export const getAllOrdersOfSellerBySaleType = async (req, res) => {
  try{
      const {sellerId, saleType} = req.params;
      const orders = await OrderLogic.getAllOrdersOfSellerBySaleType(sellerId,saleType);
      res.status(200).json(orders);
} catch (error) {
  res.status(404).json({ error: error.message });
}
};

 