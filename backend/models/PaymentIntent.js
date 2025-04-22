import mongoose from "mongoose";

const paymentintentSchema = new mongoose.paymentintentSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "userId is required"],
    ref: "User",
  },
  bidId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "bidId is required"],
    ref: "Bid",
  },
  paymentmethodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "paymentmethodId is required"],
    ref: "PaymentMethod",
  },
  stripePaymentIntent: {
    type: String,
    required: [true, "stripePaymentIntent is required"],
  },
  amount: {
    type: number,
    required: [true, "amount is required"],
  },
  confirmAt:{
    type: Date,
    default: Date.now
}

});

const PaymentIntent = mongoose.model("PaymentIntent", paymentintentSchema);
export default PaymentIntent;
