import mongoose from 'mongoose';
import { CategoryEnum, ConditionEnum } from '../constants/enum';

const productSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ownerId is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  category: {
    type: String,
    enum: CategoryEnum,
    required: [true, 'category is required choose from our ENUM'],
  },
  brand: {
    type: String,
    required: [true, 'brand is required'],
  },
  condition: {
    type: String,
    enum: ConditionEnum,
    required: [true, 'condition is required, choose from our ENUM'],
  },
  size: {
    type: String,
    required: [true, 'size is required'],
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
