
const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

const { authMW } = require("../utilities/auth");

router.post( "/cart",authMW.authMW , cartController.addToCart);

router.get("/:userId", authMW.authMW, cartController.getUserCart);

module.exports = router