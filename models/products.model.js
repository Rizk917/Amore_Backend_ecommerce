import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    // required:true,
  },

  productImage: {
    type: String,
    // required:true,
  },

  productDescription: {
    type: String,
  },

  productPrice: {
    type: Number,
    // required:true
  },
  productQuantity: {
    type: Number,
    // required:true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required:true
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
