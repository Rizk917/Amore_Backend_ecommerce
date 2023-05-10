import mongoose from "mongoose";

const popularProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const PopularProduct = mongoose.model("PopularProduct", popularProductSchema);

export default PopularProduct;
