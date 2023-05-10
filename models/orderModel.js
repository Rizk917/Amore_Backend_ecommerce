import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  cartItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName:{
        type: String,
      
      },
      
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true
      },
      total_price: {
        type: Number,
        required: true
      }
    }
  ],
  shippingAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true

  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    required: true,
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name:{
    type: String

  },
totalBill:{
  type: Number
}},
{timestamps:true});
;

const Order = mongoose.model('Order', orderSchema);

export default Order;