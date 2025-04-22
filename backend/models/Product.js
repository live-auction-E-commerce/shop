import mongoose from "mongoose";

const productSchema = new mongoose.productSchema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  category: {
    type: String,
    enum: ["T-Shirt", "Jeans", "Sweatshirts"],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Like New", "Used"],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
