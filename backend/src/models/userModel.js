const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examAnswerScehma = new Schema({
  courseID: {
    type: String,
    required: true,
  },
  examID: {
    type: String,
    required: true,
  },
  answerList: {
    type: [String],
    default: [],
  },
  score: {
    type: Number,
  },
});

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      // required: true
    },
    lastname: {
      type: String,
      // required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      // required:true,
    },
    age: {
      type: Number,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    registeredCourses: {
      type: [String],
      default: [],
    },
    examAnswers: {
      type: [examAnswerScehma],
      default: [],
    },
    reviews: {
      type: [String],
      default: [],
    },
    rating: {
      type: [String],
      default: [],
    },
    Accepted: {
      type: Boolean,
      default: false,
    },
    PaymentPolicyAccepted: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type: Number,
      default: 0,
      required: true,
    },
    biography: {
      type: String,
    },
  },
  { timestamps: true }
);

const examAnswer = mongoose.model("ExamAnswer", examAnswerScehma);
const User = mongoose.model("User", userSchema);
module.exports = User;
