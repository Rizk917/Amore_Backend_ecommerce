import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/products.model.js";

export const creatAnOrder = async (req, res) => {
  try {
    console.log(req.body);

    const userId = req.body.userId;

    const cart = await Cart.find({ user_id: userId }).exec();

    if (!cart) {
      return res.status(400).json("Cart not found");
    }
    let totalBill = 0;
    for (let i = 0; i < cart[0].products.length; i++) {
      totalBill += cart[0].products[i].total_price;
    }
    const order = new Order({
      userId: userId,
      shippingAddress: req.body.shippingAddress,
      phoneNumber: req.body.phoneNumber,
      cartItems: cart[0]._id,
      products: cart[0].products,
      totalBill: totalBill,
    });
    console.log(order);
    await order.save();
    Cart.deleteOne({ user_id: userId }).exec();

    // for (const product of order.products) {
    //   const productToUpdate = await Product.findById(product.productId);
    //   if (productToUpdate) {
    //     productToUpdate.productQuantity -= product.quantity;
    //     await productToUpdate.save();
    //   }

    // }
    // for (let j=0; j< cart[0].products.length; j++){
    //   let product = cart[0].products[j].productId;
    //   console.log("123 ",cart[0].products[j])
    //   console.log("zeinab ",product)
    //   console.log(`this is product: ${typeof(product)}`)
    //  const finder=  await Product.findById(product).exec()
    //  console.log(`this is finder: ${finder}`)
    //   finder.productQuantity =  finder.productQuantity - cart[0].products[j].quantity
    //   console.log(`this is finder.productQuantity: ${finder.productQuantity}`)
    //   await Product.findByIdAndUpdate({product}, {productQuantity:finder.productQuantity  })
    // }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate('userId' , 'name email') // populate the 'customer' field with 'name' and 'email'
      .exec();
      
    if (!order) {
      return res.status(404).json("no available order");
    } else {
      return res.status(200).json(order);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};


export const getAnOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json("no avaialble order");
    } else {
      return res.status(200).json(order);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};

export const updateAnOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json("no avaialble order");
    } else {
      order.shippingAddress = req.body.shippingAddress;
      order.phoneNumber = req.body.phoneNumber;
      order.status = req.body.status;
      await order.save();
      return res.status(200).json(order);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};

export const deleteAnOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(id);
    return res.status(204).send("order deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};

export const cancelOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findOneAndDelete({ user: id });
    if (cart) {
      return res.status(200).json("cart is deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.status(200).json({ success: true, message: "All orders deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

        

         export const orderStatus = async (req, res) => {
          const { id } = req.params;
          const { status } = req.body;
        
          if (!id || !status) {
            return res.status(400).json({ success: false, message: "Invalid input" });
          }
        
          try {
            const order = await Order.findByIdAndUpdate(id, { status });
            if (!order) {
              return res.status(404).json({ success: false, message: "Order not found" });
            }
            return res.status(200).json(order);
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Server error" });
          }
        };

export const userOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.find({ userId: id });
    if (!order) {
      return "no order for this user";
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
