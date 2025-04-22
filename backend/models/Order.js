import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "buyerId is required"],
    ref: "User",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "sellerId is required"],
    ref: "User",
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Listing is required"],
    ref: "Listing",
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Address is required"],
    ref: "Address",
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
