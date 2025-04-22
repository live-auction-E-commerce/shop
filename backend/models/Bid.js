import mongoose from mongoose

const bidSchema = new mongoose.bidSchema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: [true, "Not associated with a listing"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Not associated with a user"]
    },
    paymentIntentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentIntent",
        required: [true, "Not associated with a payment intent"]
    },
    amount:{
        type: Number
    },
    createAt:{
        type:Date,
        default: Date.now
    }
});

const Bid = mongoose.model('Bid',bidSchema)
export default Bid;