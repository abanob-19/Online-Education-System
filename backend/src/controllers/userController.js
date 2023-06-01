const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
require("dotenv").config();
const stripeSecret =
  "sk_test_51MLqVrDmpYyJWybiP6DZPpq41L7NCjRTcKYdZrLogMjQsMNNOwgMsrPIaT8D11o8NzpJpzBxoBPVoixMoiGvbXEz00HTyo7zpi";
const stripe = require("stripe")(stripeSecret);
// const cors = require("cors")

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Please fill all the feilds");
  }
  // Check for user email
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      registeredCourses: user.registeredCourses,
      reviews: user.reviews,
      rating: user.rating,
      Accepted: user.Accepted,
      PaymentPolicyAccepted: user.PaymentPolicyAccepted,
      wallet: user.wallet,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

const updateUserInfo = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await User.findById(decoded.id).select("-password");

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
      registeredCourses: user.registeredCourses,
      reviews: user.reviews,
      rating: user.rating,
      Accepted: user.Accepted,
      PaymentPolicyAccepted: user.PaymentPolicyAccepted,
      wallet: user.wallet,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

// @desc    Register new user
// @route   POST /register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password, gender } = req.body;

  if (!firstname || !lastname || !email || !password || !username || !gender) {
    res.status(400).send("Please add all fields");
    return;
  }

  // Check if user exists
  const userExists = await User.findOne({ username });
  const userExists2 = await User.findOne({ email });

  if (userExists || userExists2) {
    console.log(userExists);
    console.log(userExists2);
    res.status(400).send("A User already exists with this username or email");
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: hashedPassword,
    gender: gender,
    role: "Individual Trainee",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      registeredCourses: user.registeredCourses,
      reviews: user.reviews,
      rating: user.rating,
      Accepted: user.Accepted,
      PaymentPolicyAccepted: user.PaymentPolicyAccepted,
      wallet: user.wallet,
    });
  } else {
    res.status(400).send("Invalid user data");
    return;
  }
});

const payment = asyncHandler(async (req, res) => {
  const { amount, id } = req.body;

  if (!amount || !id) {
    res.status(400).send("Please add all fields");
    return;
  }

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Online Learning System",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  updateUserInfo,
  payment,
};
