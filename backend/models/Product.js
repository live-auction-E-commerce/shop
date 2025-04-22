import mongoose from mongoose

const productSchema = new mongoose.productSchema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description:{
        type: String,
        required: [true, "Product description is required"],
    },
    images: {
        type: [String]
    },
    category: {
        type: String,
        enum: ['T-Shirt', 'Jeans','Sweatshirts'],
        required: [true, "Product category is required"],
      },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
    },
    condition:{
        type: String,
        enum: ['New', 'Like New','Used'],
        required: [true, "Product cindition is required"]
    },
    size:{
        type: String,
        required: [true, "Product size is required"],
    },
    listing:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

});

const Product = mongoose.model('Product', productSchema);

export default Product;