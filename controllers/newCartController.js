import Cart from '../models/newcartModel.js';
import Product from '../models/product.model.js';

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      const newCart = new Cart({
        userId: req.user._id,
        items: [{ product: productId, quantity }]
      });
      await newCart.save();
      return res.status(201).json({ message: 'Item added to cart', data: newCart });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex === -1) {
      cart.items.push({ product: productId, quantity });
    } else {
      cart.items[itemIndex].quantity += quantity;
    }
    await cart.save();
    res.json({ message: 'Item added to cart', data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get cart for user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json({ message: 'Cart item updated', data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json({ message: 'Cart item removed', data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
  removeItemFromCart
};