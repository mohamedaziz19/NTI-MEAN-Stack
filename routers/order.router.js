const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");


router.post('/', orderController.createOrder);

router.get("/", orderController.getAllOrders);

router.put("/:id", orderController.updateOrderStatus);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
