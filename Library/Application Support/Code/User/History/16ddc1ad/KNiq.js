// routes/seller.js
const express = require("express");
const authenticate = require("../middleware/auth");
const router = express.Router();

const Product = require("../models/Product");

// Add a product
router.post("/add", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "seller") return res.status(403).json({ message: "Forbidden" });

    const product = new Product({ ...req.body, seller: req.user.id });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get seller products
router.get("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "seller") return res.status(403).json({ message: "Forbidden" });

    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
