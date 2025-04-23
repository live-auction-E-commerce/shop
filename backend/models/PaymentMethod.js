import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is required'],
    ref: 'User',
  },
  cardLast4: {
    type: String,
    required: [true, 'cardLast4 is required'],
  },
  cardBrand: {
    type: String,
    enum: ['Visa', 'Mastercard', 'Diners', 'American Express'],
    required: [true, 'cardBrand is required'],
  },
  expirationMonth: {
    type: Number,
    required: [true, 'expirationMonth is required'],
  },
  expirationYear: {
    type: Number,
    required: [true, 'expirationYear is required'],
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'billingAddress is required'],
    ref: 'Address',
  },
  token: {
    type: String,
    required: [true, 'token is required'],
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

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
export default PaymentMethod;
