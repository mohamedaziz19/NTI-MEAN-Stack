
const Cart = require("../models/cart.model");  
const User = require('../models/user.model')

exports.addToCart = async (req, res) => {
  try {

    const { product } = req.body;

    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
     cart = new Cart({ user: userId, items: [{ product }] });
    }else {
      cart.items.push(product);
    }

    await cart.save();

    res.status(200).json(cart);

  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ error: "Error adding product to cart" });
  }
};

exports.getUserCart = async (req , res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({user:userId}).populate('items')

    if(!cart) {
      return res.status(404).json({error : 'Cart not found'})
    }
    res.status(200).json(Cart)

  } catch (err) {
    res.status(500).json({error : err.message})
  }
}