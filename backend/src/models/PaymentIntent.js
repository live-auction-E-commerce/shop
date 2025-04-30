import mongoose from 'mongoose';

const paymentIntentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is required'],
    ref: 'User',
  },
  bidId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'bidId is required'],
    ref: 'Bid',
  },
  paymentMethodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'paymentMethodId is required'],
    ref: 'PaymentMethod',
  },
  stripePaymentIntentId: {
    type: String,
    required: [true, 'stripePaymentIntentID is required'],
  },
  amount: {
    type: Number,
    required: [true, 'amount is required'],
  },
  confirmedAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentIntent = mongoose.model('PaymentIntent', paymentIntentSchema);
export default PaymentIntent;
