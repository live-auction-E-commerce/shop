import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    lowercase: true,
  },
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  number:{
    type: Number,
    required: [true,'number is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
