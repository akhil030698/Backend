const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    console.log("Existing user:", existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bycrypt.hash(password, 10);

    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    const jwtToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.refreshToken = jwtToken;
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      token: jwtToken,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    console.log("User", User);
    if (!User) {
      return res
        .status(409)
        .json({ message: "User not exist. Please Signup first" });
    }
    const isMatch = await bycrypt.compare(password, User.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const jwtToken = jwt.sign(
      { id: User._id, email: User.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
    User.refreshToken = jwtToken;
    await User.save();
    const userData = {
      id: User._id,
      name: User.name,
      email: User.email,
    };
    res.status(200).json({
      message: "User login successfully",
      success: true,
      token: jwtToken,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const refresh = async (req, res) => {
  try {
    const { token, email } = req.body;
    const User = await UserModel.findOne({ email });
    console.log("User", User);
    const jwtToken = jwt.sign(
      { id: User._id, email: User.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      success: true,
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const logout = async (req, res) => {
  try {
    const { email } = req.body; // Assume email is sent to identify user
    const user = await UserModel.findOne({ email });
    if (user) {
      user.refreshToken = null; // Invalidate refresh token
      await user.save();
    }
    res.status(200).json({
      message: "User logout successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  signup,
  login,
  logout,
  refresh,
};
