const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundSchema = new Schema({
  text: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  issuerID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
});

const RefundRequest = mongoose.model("Refund Request", refundSchema);
module.exports = { RefundRequest };
