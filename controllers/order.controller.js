const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");


exports.createOrder = async (req, res) => {
  const { user, cartItems, totalAmount } = req.body;

  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
   
    const orderData = {
      user: foundUser._id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      couponCode: user.couponCode,
      items: cartItems.map((item) => ({
        product: item.productId,
        quantity: item.quantity || 1,
      })),
      totalAmount: totalAmount,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id; 
  const { status } = req.body; 


  const validStatuses = ["pending", "shipped", "delivered", "canceled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status; 
    await order.save(); 

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update order status", error: err.message });
  }
};


exports.deleteOrder = async (req, res) => {

  const orderId = req.params.id; 

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

