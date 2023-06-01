const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  updateUserInfo,
  payment,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/updateUserInfo", protect, updateUserInfo);

router.post("/payment", protect, payment);

module.exports = router;
