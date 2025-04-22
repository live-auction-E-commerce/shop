
import mongoose from mongoose

const listingSchema = new mongoose.listingSchema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Not associated with a product"]
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Not associated with a user"]
    },
    saleType:{
        type: String,
        enum: ['auction', 'now'],
        required: [true, "Sale type is required"]
    },
    price:{
        type: Number
    },
    startingBid:{
        type: Number
    },
    currentBid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
    },
    expiredAt:{
        type:Date
    },
    isSold:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

const Listing = mongoose.model('Listing',listingSchema);

export default Listing;