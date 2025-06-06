import mongoose from 'mongoose';

const paymentIntentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is required'],
    ref: 'User',
  },
  stripePaymentIntentId: {
    type: String,
    required: [true, 'stripePaymentIntentID is required'],
  },
  amount: {
    type: Number,
    required: [true, 'amount is required'],
  },
  status: {
    type: String,
    enum: ['created', 'succeeded', 'processing', 'failed', 'canceled'],
    default: 'created',
  },
  currency: {
    type: String,
    default: 'usd',
  },
  confirmedAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentIntent = mongoose.model('PaymentIntent', paymentIntentSchema);
export default PaymentIntent;
