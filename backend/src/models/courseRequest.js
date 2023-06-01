const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseRequestSchema = new Schema({
  issuerID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
});

const CourseRequest = mongoose.model("Course Request", courseRequestSchema);
module.exports = { CourseRequest };
