const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Unseen",
  },
  issuerID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = { Problem };
