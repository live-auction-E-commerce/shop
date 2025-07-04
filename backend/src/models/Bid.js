import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: [true, 'listingId is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  },
  paymentIntentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentIntent',
    required: [true, 'paymentIntentId is required'],
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'addressId is required'],
  },
  amount: {
    type: Number,
    required: [true, 'amount is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model('Bid', bidSchema);
export default Bid;
