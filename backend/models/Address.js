import mongoose from "mongoose";

const addressSchema = new mongoose.addressSchema({


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName:{
        type: String,
        required: [true, "Full name is required"],
        lowercase: true,
    },
    street:{
        type: String,
        required: [true, "Street is required"],
    },
    city:{
        type: String,
        required:[true,"city is required],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
