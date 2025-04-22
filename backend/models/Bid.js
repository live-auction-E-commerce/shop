import mongoose from "mongoose";

const bidSchema = new mongoose.bidSchema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentIntentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentIntent",
    required: true,
  },
  amount: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
