const express = require("express");
const {
  signup,
  login,
  logout,
  refresh,
  product,
} = require("../Controller/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Middileware/AuthValidation");
const app = express();
const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/refresh", refresh);
// router.post("/products", product);
router.post("/logout", logout);

module.exports = router;
