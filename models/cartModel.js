

import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName:{
        type: String
      },
      quantity:{
        type: Number,
        required: true,
        default: 1
      },
      price:{
        type: Number,
        required: true
      },
      total_price: {
        type: Number
      }
    }
  ],
}, {timestamps:true});



const Cart = mongoose.model('Cart', cartSchema);

export default Cart;