const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Course } = require("../models/Course");
const { Problem } = require("../models/problem");
const { RefundRequest } = require("../models/refundRequest");
const { CourseRequest } = require("../models/courseRequest");
// @desc    Add a new Admin
// @route   POST /api/admin/addAdmin
// @access  Private
const addAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).send("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username,
    password: hashedPassword,
    role: "Admin",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
  }
});

// @desc    Adding an instructor
// @route   POST /api/admin/addInstructor
// @access  Private
const addInstructor = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).send("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username,
    password: hashedPassword,
    role: "Instructor",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
  }
});

// @desc    Add a new Corporate Trainee
// @route   GET /admin/addCorporateTrainee
// @access  Private
const addCorporateTrainee = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).send("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username,
    password: hashedPassword,
    role: "Corporate Trainee",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const setDiscountCourses = asyncHandler(async (req, res) => {
  const { courseIDs, discount } = req.body;

  if (!courseIDs || !discount) {
    res.status(400).send("Please add all fields");
  }

  var courseUptaded;

  for (let i = 0; i < courseIDs.length; i++) {
    courseUptaded = await Course.findOneAndUpdate(
      { _id: courseIDs[i] },
      { discount: discount },
      { new: true }
    );
  }

  res.status(200).send(courseUptaded);
});

const viewAllReports = asyncHandler(async (req, res) => {
  var problems = await Problem.find();

  res.status(200).send(problems);
});

const viewUnseenReports = asyncHandler(async (req, res) => {
  var problems = await Problem.find({ status: "Unseen" });

  res.status(200).send(problems);
});

const setStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    res.status(400).send("Please add all fields");
  }
  var problems = await Problem.findOneAndUpdate(
    { _id: id },
    { status: status }
  );
  res.status(200).send(problems);
});

const viewRequests = asyncHandler(async (req, res) => {
  var problems = await RefundRequest.find();

  res.status(200).send(problems);
});

const rejectRefundRequest = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send("Please add all fields");
  }

  var problem = await RefundRequest.findOneAndDelete({ _id: id });

  res.status(200).send(problem);
});

const acceptRefundRequest = asyncHandler(async (req, res) => {
  const { id, amount, instructor } = req.body;

  if (!id || !amount || !instructor) {
    res.status(400).send("Please add all fields");
  }
  var problem33 = await RefundRequest.findOne({ _id: id });
  var inst = await User.findOne({ _id: instructor });
  var newInstWallet = (inst.wallet ? inst.wallet : 0) + parseInt(amount, 10);
  var newRegCourses = [];

  for (let i = 0; i < inst.registeredCourses.length; i++) {
    if (inst.registeredCourses[i] != problem33.courseID) {
      newRegCourses.push(inst.registeredCourses[i]);
    }
  }

  var course = await Course.findOne({ _id: problem33.courseID });
  await Course.findOneAndUpdate(
    { _id: problem33.courseID },
    { numOfTrainees: course.numOfTrainees - 1 }
  );
  var realInst = await User.findOne({ _id: course.instructor_id });

  var realInstWallet =
    (realInst.wallet ? realInst.wallet : 0) -
    Math.round(parseInt(amount, 10) * 0.9);

  await User.findOneAndUpdate(
    { _id: course.instructor_id },
    { wallet: realInstWallet }
  );

  var newInst = await User.findOneAndUpdate(
    { _id: instructor },
    { wallet: newInstWallet, registeredCourses: newRegCourses },
    { new: true }
  );

  var problem = await RefundRequest.findOneAndDelete({ _id: id });

  res.status(200).send(problem);
});

const viewCourseRequests = asyncHandler(async (req, res) => {
  var problems = await CourseRequest.find();
  var helper = [];
  for (let i = 0; i < problems.length; i++) {
    var inst = await User.findOne(
      { _id: problems[i].issuerID },
      { username: 1}
    );
    var course = await Course.findOne(
      { _id: problems[i].courseID },
      { title: 1, price: 1 }
    );

    helper.push({
      instructor: inst,
      course: course,
      requestedAt: problems[i].createdAt,
    });
  }
  res.status(200).send(helper);
});

const courseRequestResponse = asyncHandler(async (req, res) => {
  const { instructorID, courseID, allow } = req.body;
  if (!instructorID || !courseID) {
    res.status(400).send("Please add all fields");
  }

  if (allow) {
    var inst = await User.findOne({ _id: instructorID });
    var userRegisteredCourses = inst.registeredCourses;

    for (let i = 0; i < userRegisteredCourses.length; i++) {
      if (userRegisteredCourses[i] == courseID) {
        return res
          .status(400)
          .send("You are already registered to this course");
      }
    }

    userRegisteredCourses.push(courseID);

    await User.findOneAndUpdate(
      { _id: instructorID },
      { registeredCourses: userRegisteredCourses },
      { new: true }
    );

    var course = await Course.findOne({ _id: courseID });
    await Course.findOneAndUpdate(
      { _id: courseID },
      { numOfTrainees: course.numOfTrainees + 1 }
    );

    var realInst = await User.findOne({ _id: course.instructor_id });

    var realInstWallet = realInst.wallet ? realInst.wallet : 0;
    if (course.price == 0) {
      realInstWallet += 1;
    } else {
      realInstWallet += Math.round(course.price * 0.9);
    }

    await User.findOneAndUpdate(
      { _id: course.instructor_id },
      { wallet: realInstWallet }
    );
  }

  var problems = await CourseRequest.findOneAndDelete({
    issuerID: instructorID,
    courseID: courseID,
  });

  res.status(200).send(problems);
});

module.exports = {
  addAdmin,
  addInstructor,
  addCorporateTrainee,
  setDiscountCourses,
  viewAllReports,
  viewUnseenReports,
  setStatus,
  viewRequests,
  rejectRefundRequest,
  acceptRefundRequest,
  viewCourseRequests,
  courseRequestResponse,
};
