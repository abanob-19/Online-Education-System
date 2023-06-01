const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Course } = require("../models/Course");
const users = require("../models/userModel");
const nodemailer = require("nodemailer");
const { jsPDF } = require("jspdf");
const { Problem } = require("../models/problem");

let emailClient = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "esystem17@outlook.com",
    pass: "654321abc",
  },
});
const pdf = new jsPDF({
  orientation: "landscape",
  unit: "px",
  format: "a4",
});
const { CourseRequest } = require("../models/courseRequest");

// @desc    Add a new Admin
// @route   POST /api/admin/addAdmin
// @access  Private
function isArrayItemExists(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].subtitle == item) {
      return true;
    }
  }
  return false;
}
function getlocOfSub(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].subtitle == item) {
      return i;
    }
  }
  return false;
}
const viewAllCourses = asyncHandler(async (req, res) => {
  const table = await Course.find({}, {  });
  // Check if user exists
  res.send(table);
});

const selectCountry = asyncHandler(async (req, res) => {
  //res.status(200).send("This is the profile page");
  try {
    const post = await users.updateOne(
      { _id: req.query.id },
      { country: req.body.country }
    );
    const updated = await users.findById(req.query.id);
    res.status(200).json(updated);
  } catch (e) {
    res.status(500).send(e);
  }
});

const filterCourses = asyncHandler(async (req, res) => {
  try {
    let match = {};
    if (req.query.subject) {
      match.subject = new RegExp(req.query.subject, "i");
    }

    if (req.query.rating) {
      match.rating = req.query.rating;
    }

    const response = await Course.aggregate([{ $match: match }]);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

//search for course general
const searchCourse = asyncHandler(async (req, res) => {
  try {
    var query = ".*" + req.query.searchQuery + ".*"; //searchQuery is the name i give it
    var instructorIDs = await users.find(
      { name: { $regex: query }, role: "Instructor" },
      { _id: 1 }
    ); //project on the id and i want it to be visible
    Course.find(
      {
        $or: [
          { title: { $regex: query } },
          { subject: { $regex: query } },
          { instructor_id: { $in: instructorIDs } },
        ],
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

const viewAllRegisteredCourses = asyncHandler(async (req, res) => {
  const { reisteredIDs } = req.body;

  if (!reisteredIDs) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const table = await Course.find(
    { _id: reisteredIDs }
    // {
    //   title: 1,
    //   subtitles: 1,
    //   rating: 1,
    //   hours: 1,
    //   hourspsubtitle: 1,
    //   price: 1,
    //   discount: 1,
    //   exams: 1,
    //   courseVideoPreview: 1,
    // }
  );
  // Check if user exists
  res.send(table);
});

const answerExam = asyncHandler(async (req, res) => {
  const { course_id, exam_id, answerList } = req.body;

  if (!course_id || !exam_id || !answerList) {
    res.status(400).send("Please add all fields");
  }
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  const exams = await Course.find({ _id: course_id }, { exams: 1 });
  var exam = null;
  for (let i = 0; i < exams[0].exams.length; i++) {
    if (exams[0].exams[i]._id == exam_id) {
      exam = exams[0].exams[i];
    }
  }

  if (!exam) {
    res.status(400).send("Exam is not found");
  }

  var correctAnswers = 0;
  for (let i = 0; i < exam.questions.length; i++) {
    if (exam.questions[i].answer === answerList[i + 1]) {
      correctAnswers++;
    }
  }

  console.log(correctAnswers);

  const userExamAnswers = user.examAnswers;
  userExamAnswers.push({
    courseID: course_id,
    examID: exam_id,
    answerList: answerList,
    score: correctAnswers,
  });

  const updatedUser = await users.findOneAndUpdate(
    { _id: user._id },
    { examAnswers: userExamAnswers },
    { new: true }
  );
  res.status(200);
  // res.send(updatedUser)
});

const registerCourse = asyncHandler(async (req, res) => {
  const { courseID } = req.body;

  if (!courseID) {
    res.status(400).send("Please add all fields");
  }
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  var userRegisteredCourses = user.registeredCourses;

  for (let i = 0; i < userRegisteredCourses.length; i++) {
    if (userRegisteredCourses[i] === courseID) {
      return res.status(400).send("You are already registered to this course");
    }
  }

  userRegisteredCourses.push(courseID);

  await users.findOneAndUpdate(
    { _id: user._id },
    { registeredCourses: userRegisteredCourses },
    { new: true }
  );

  const table = await Course.find(
    { _id: userRegisteredCourses },
    {
      title: 1,
      subtitles: 1,
      rating: 1,
      hours: 1,
      hourspsubtitle: 1,
      price: 1,
      discount: 1,
    }
  );
  // Check if user exists
  res.status(201).send(table);
});

const getExam = asyncHandler(async (req, res) => {
  const { courseID, examID } = req.body;

  if (!courseID || !examID) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const table = await Course.find({ _id: courseID }, { title: 1, exams: 1 });
  // Check if user exists
  for (let j = 0; j < table[0].exams.length; j++) {
    if (table[0].exams[j]._id == examID) {
      // table[0].exams[j].courseID = courseID
      res.status(201).send({
        public: table[0].exams[j].public,
        title: table[0].exams[j].title,
        number: table[0].exams[j].number,
        questions: table[0].exams[j].questions,
        courseID: courseID,
        examID: examID,
      });
      return;
    }
  }
  res.status(400).send("Cannot find Exam");
});

const getsolvedExams = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  res.status(201).send(user.examAnswers);
});
const getfirstName = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  res.status(201).send(user.firstname);
});
const getlastName = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  res.status(201).send(user.lastname);
});
const sendEmail = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  //var doc=new jsPDF('landscape','px','a4','false');
  pdf.text(220, 30, "this is to ceritify that ");
  pdf.text(250, 60, +user.firstname + " " + user.lastname);
  const cname = req.body.cname;
  pdf.text(150, 80, " has completed course " + cname + " successfully");
  //doc.text( 150,100,'وهذا اقرار مني بذلك ' );
  pdf.text(160, 410, "t7yatna");
  const pdfOutput = pdf.output("datauristring");
  //doc.save('certificate.pdf');
  emailClient.sendMail({
    from: "esystem17@outlook.com",
    to: "abanob11@gmail.com",
    subject: "Certificate",
    text: "Your Certificate",
    attachments: [{ path: pdfOutput }],
  });
  // res.status(201).send("sent");
});
const openCourse = asyncHandler(async (req, res) => {
  const { courseID } = req.body;
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  var userRegisteredCourses = user.registeredCourses;
  var courseExists = false;
  for (var i = 0; i < userRegisteredCourses.length; i++) {
    if (userRegisteredCourses[i] == courseID) {
      courseExists = true;
    }
  }
  if (courseExists) {
    return res.send(await Course.findOne({ _id: courseID }));
  } else {
    return res.status(400).send("You are not registered for this course");
  }
});

const rateCourse = asyncHandler(async (req, res) => {
  const { course_id, newRating } = req.body;

  if (!course_id) {
    res.status(400).send("Please add all fields");
  }

  const cour = await Course.findById(course_id);

  const AddedRating = cour.rating;
  AddedRating.push(newRating);

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: course_id },
    { rating: AddedRating },
    { new: true }
  );

  res.send(201).send(updatedCourse);
});

const rateInstructor = asyncHandler(async (req, res) => {
  const { Instructor_id, CourseId, newRating } = req.body;

  if (!Instructor_id) {
    res.status(400).send("Please add all fields");
  }

  const inst = await users.findById(Instructor_id);
  const cour = await Course.findById(CourseId);

  const AddedRating = inst.rating;
  AddedRating.push(newRating);

  const AddedRating2 = cour.instructorRating;
  AddedRating2.push(newRating);

  const updatedUser = await users.findOneAndUpdate(
    { _id: Instructor_id },
    { rating: AddedRating },
    { new: true }
  );

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: CourseId },
    { instructorRating: AddedRating2 },
    { new: true }
  );

  res.status(201).send(updatedUser);
});

const reviewInstructor = asyncHandler(async (req, res) => {
  const { Instructor_id, newReview } = req.body;

  if (!Instructor_id) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  const inst = await users.findById(Instructor_id);

  const AddedReview = inst.reviews;
  AddedReview.push(newReview);

  const updatedUser = await users.findOneAndUpdate(
    { _id: Instructor_id },
    { reviews: AddedReview },
    { new: true }
  );

  res.status(201).send(updatedUser);
});

const reviewCourse = asyncHandler(async (req, res) => {
  const { course_id, newReview } = req.body;

  if (!course_id) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  const cour = await Course.findById(course_id);

  const AddedReview = cour.reviews;
  AddedReview.push(newReview);

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: course_id },
    { reviews: AddedReview },
    { new: true }
  );

  res.send(201).send(updatedCourse);
});

const viewVideoCourse = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  var userRegisteredCourses = user.registeredCourses;
  var courseExists = false;
  for (var i = 0; i < userRegisteredCourses.length; i++) {
    if (userRegisteredCourses[i] == req.query.courseID) {
      courseExists = true;
    }
  }
  if (courseExists) {
    const linkToVideo = await Course.find(
      { _id: req.query.courseID },
      { courseVideoPreview: 1 }
    );
    return res.status(201).send(linkToVideo);
  } else {
    return res.status(400).send("You are not registered for this course");
  }
});

const viewVideoSubtitle = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  var userRegisteredCourses = user.registeredCourses;
  var courseExists = false;
  for (var i = 0; i < userRegisteredCourses.length; i++) {
    if (userRegisteredCourses[i] == req.query.courseID) {
      courseExists = true;
    }
  }
  if (courseExists) {
    const course = await Course.findOne({ _id: req.query.courseID });
    const subtitlesOfcourse = course.subtitles;
    console.log(subtitlesOfcourse);
    var subExists = isArrayItemExists(subtitlesOfcourse, req.query.subtitle);
    if (subExists) {
      const location = getlocOfSub(subtitlesOfcourse, req.query.subtitle);
      return res.status(201).send(subtitlesOfcourse[location].link);
    }
  } else {
    return res.status(400).send("You are not registered for this course");
  }
});

const getReviewCourse = asyncHandler(async (req, res) => {
  const { course_id } = req.body;

  if (!course_id) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  const cour = await Course.findById(course_id);

  console.log(cour);

  res.status(200).send(cour);
});

const getReviewInstructor = asyncHandler(async (req, res) => {
  const { Instructor_id } = req.body;

  if (!Instructor_id) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(Instructor_id);
  //const cour = await Course.findById(course_id);

  res.status(200).send(user);
});

const viewMyRequests = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  var problems = await CourseRequest.find({ issuerID: user._id });

  res.status(200).send(problems);
});

const requestCourse = asyncHandler(async (req, res) => {
  const { courseID, issuerID } = req.body;

  if (!courseID || !issuerID) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const courseRequest = await CourseRequest.create({
    courseID: courseID,
    issuerID: issuerID,
  });

  if (courseRequest) {
    res.status(200).send(courseRequest);
  } else {
    res.status(400).send("Error while inserting");
    return;
  }
});

const mostPopular = asyncHandler(async (req, res) => {
  try {
    var result = await Course.find({}).sort({ numOfTrainees: -1 }); //-1 to sort descingly
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

async function coursePreview(id, reqId) {
  var course = await Course.findById(id);
  var subtitles = await Subtitle.find({ _id: { $in: course.subtitles } });
  var courseObj = JSON.parse(JSON.stringify(course));
  courseObj.subtitles = JSON.parse(JSON.stringify(subtitles));
  return courseObj;
}

const acceptPolicy = asyncHandler(async (req, res) => {
  //const { instructor_id } = req.body;
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  const updatedUser = await users.findOneAndUpdate(
    { _id: user.id },
    { $set: { PaymentPolicyAccepted: true } },
    { new: true }
  );

  res.status(201).send(updatedUser);
});

const reportProblem = asyncHandler(async (req, res) => {
  const { title, text, type, courseID } = req.body;

  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  const problem = await Problem.create({
    title: title,
    text: text,
    type: type,
    courseID: courseID,
    issuerID: user._id,
  });
  if (problem) {
    res.status(200).json(problem);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const viewProblem = asyncHandler(async (req, res) => {
  const problems = await Problem.find({});
  if (problems) {
    res.status(200).json(problems);
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const followUpProblem = asyncHandler(async (req, res) => {
  const {issuerID } = req.body;

  if (!issuerID) {
    res.status(400).send("Please add all fields");
  }
  var problems = await Problem.find(
    { issuerID: issuerID },
    { title: 1, text: 1, status: 1, courseID: 1, type: 1 }
  );
  res.status(200).send(problems);
});

module.exports = {
  viewAllCourses,
  selectCountry,
  searchCourse,
  viewAllCourses,
  filterCourses,
  viewAllRegisteredCourses,
  answerExam,
  registerCourse,
  rateCourse,
  reviewCourse,
  reviewInstructor,
  rateInstructor,
  getExam,
  getsolvedExams,
  getfirstName,
  getlastName,
  sendEmail,
  openCourse,
  viewVideoCourse,
  viewVideoSubtitle,
  getReviewCourse,
  getReviewInstructor,
  viewMyRequests,
  requestCourse,
  mostPopular,
  coursePreview,
  acceptPolicy,
  reportProblem,
  viewProblem,
  followUpProblem,
};
