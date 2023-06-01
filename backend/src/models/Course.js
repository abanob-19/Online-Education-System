const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  choiceA: {
    type: String,
    required: true,
  },
  choiceB: {
    type: String,
    required: true,
  },
  choiceC: {
    type: String,
    required: true,
  },
  choiceD: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
});

const examSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
});
const subtitleSchema = new Schema({
  subtitle: {
    type: String,
    // unique:true,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const courseSchema = new Schema(
  {
    instructor_id: {
      type: String,
    },
    instructorId: {
      type: String,
    },
    instructorName: {
      type: String,
    },
    instructorRating: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitles: {
      type: [subtitleSchema],
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    hourspsubtitle: {
      type: String,
    },
    excercises: {
      type: String,
      //required: true,
    },
    rating: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [String],
      default: [],
    },
    token: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    courseVideoPreview: {
      type: String,
    },
    exams: {
      type: [examSchema],
    },
    numOfTrainees: {
      type: Number,
      default: 0,
    },
    public: {
      type: Boolean,
      default: false,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    promotion: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
const Exam = mongoose.model("Exam", examSchema);
const Question = mongoose.model("Question", questionSchema);
module.exports = { Course, Exam, Question };
