// routes/customer.js
const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

// Get products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place an order
router.post("/order", authenticate, async (req, res) => {
  try {
    const order = new Order({ ...req.body, customer: req.user.id });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
