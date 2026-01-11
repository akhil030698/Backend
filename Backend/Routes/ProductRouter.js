const express = require("express");
const { ensureAuth } = require("../Middileware/Auth");
const app = express();
const router = express.Router();

const product = async (req, res) => {
  try {
    const products = [
      { id: 1, name: "TV", price: 5000 },
      { id: 2, name: "Smart TV", price: 10000 },
      { id: 3, name: "Mobile", price: 25000 },
    ];

    // Return only the 2nd and 3rd products
    const filteredProducts = products.slice(1, 3);

    res.status(200).json(filteredProducts);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
router.post("/products", ensureAuth, product);

module.exports = router;
