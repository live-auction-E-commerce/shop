import mongoose from "mongoose";

const listingSchema = new mongoose.listingSchema({
     productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    saleType:{
        type: String,
        enum: ['auction', 'now'],
        required: [true, "Sale type is required"]
    },
    price:{
        type: Number
    },
    startingBid:{
        type: Number
    },
    currentBid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
    },
    expiredAt:{
        type:Date
    },
    isSold:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  saleType: {
    type: String,
    enum: ["auction", "now"],
  },
  price: {
    type: Number,
  },
  startingBid: {
    type: Number,
  },
  currentBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
  },
  expiredAt: {
    type: Date,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
