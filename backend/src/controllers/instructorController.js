const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Course, Question, Exam } = require("../models/Course");
const { Problem } = require("../models/problem");
const users = require("../models/userModel");

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
  // changed here
  const table = await Course.find(
    {},
    { }
  );
  // Check if user exists
  res.send(table);
});

// @desc    Adding an instructor
// @route   POST /api/admin/addInstructor
// @access  Private
const viewPrice = asyncHandler(async (req, res) => {
  // Check if user exists
  res.send(await Course.find({}, {  }));
});

// @desc    Add a new Corporate Trainee
// @route   GET /api/admin/addCorporateTrainee
// @access  Private
const viewMyCourses = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  res.send(await Course.find({ instructor_id: user._id + "" }));
});

const filterMyCourses = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  let match = {};
  (match.instructor_id = user._id + ""), "i";
  if (req.body.subject !== "") {
    match.subject = new RegExp(req.body.subject, "i");
  }

  if (
    req.body.startPrice !== null &&
    req.body.startPrice !== "" &&
    req.body.endPrice !== null &&
    req.body.endPrice !== ""
  ) {
    match.price = {
      $gte: parseInt(req.body.startPrice, 10),
      $lte: parseInt(req.body.endPrice, 10),
    };
  } else if (req.body.startPrice !== null && req.body.startPrice !== "") {
    match.price = {
      $gte: parseInt(req.body.startPrice, 10),
    };
  } else if (req.body.endPrice !== null && req.body.endPrice !== "") {
    match.price = {
      $lte: parseInt(req.body.endPrice, 10),
    };
  }

  const response = await Course.aggregate([{ $match: match }]);

  res.send(response);
});

const filterCourses = asyncHandler(async (req, res) => {
  try {
    let match = {};
    // match.instructor_id = user._id+"", "i";
    if (req.body.subject !== "") {
      match.subject = new RegExp(req.body.subject, "i");
    }

    if (
      req.body.startPrice !== null &&
      req.body.startPrice !== "" &&
      req.body.endPrice !== null &&
      req.body.endPrice !== ""
    ) {
      match.price = {
        $gte: parseInt(req.body.startPrice, 10),
        $lte: parseInt(req.body.endPrice, 10),
      };
    } else if (req.body.startPrice !== null && req.body.startPrice !== "") {
      match.price = {
        $gte: parseInt(req.body.startPrice, 10),
      };
    } else if (req.body.endPrice !== null && req.body.endPrice !== "") {
      match.price = {
        $lte: parseInt(req.body.endPrice, 10),
      };
    }
    var response = await Course.aggregate([{ $match: match }]);
    var helper = [];
    for (let i = 0; i < response.length; i++) {
      let sum = 0;
      for (let j = 0; j < response[i].rating.length; j++) {
        sum += parseInt(response[i].rating[j], 10);
      }
      var avg;
      if (response[i].rating.length === 0) {
        avg = 0;
      } else {
        avg = sum / response[i].rating.length;
      }
      if (
        req.body.startRate !== null &&
        req.body.startRate !== "" &&
        req.body.endRate !== null &&
        req.body.endRate !== ""
      ) {
        if (avg >= req.body.startRate && avg <= req.body.endRate) {
          helper.push(response[i]);
        }
      } else if (req.body.startRate !== null && req.body.startRate !== "") {
        if (avg >= req.body.startRate) {
          helper.push(response[i]);
        }
      } else if (req.body.endRate !== null && req.body.endRate !== "") {
        if (avg <= req.body.endRate) {
          helper.push(response[i]);
        }
      }
    }
    if (
      (req.body.startRate !== null && req.body.startRate !== "") ||
      (req.body.endRate !== null && req.body.endRate !== "")
    ) {
      res.send(helper);
    } else {
      res.send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const viewCoursefromResults = asyncHandler(async (req, res) => {
  const table = await Course.findOne(
    { title: req.body.title },
    {

    }
  );
  // Check if user exists
  res.send(table);
});
const addCourse = asyncHandler(async (req, res) => {
  const { title, price, hours, summary, subject, courseVideoPreview } =
    req.body;

  if (
    !title ||
    !price ||
    !hours ||
    !summary ||
    !subject ||
    !courseVideoPreview
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if course exists
  const courseExists = await Course.findOne({ title });

  if (courseExists) {
    res.status(400);
    throw new Error("Course already exists");
  }

  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  // Create course
  const course = await Course.create({
    title: title,
    subtitles: subtitles,
    price: price,
    hours: hours,
    summary: summary,
    instructor_id: user._id + "",
    instructorName: user.firstname + " " + user.lastname,
    instructorRating: user.rating,
    subject: subject,
    courseVideoPreview: courseVideoPreview,
    exams: [],
  });
  if (course) {
    res.status(201).json({
      title: title,
      subtitles: subtitles,
      price: price,
      hours: hours,
      summary: summary,
      instructor_id: user._id + "",
      instructorName: user.firstname + " " + user.lastname,
      instructorRating: user.rating,
      subject: subject,
      courseVideoPreview: courseVideoPreview,
    });
    try {
      await course.save();
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
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

const inssearchCourse = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const user = await users.findById(decoded.id).select("-password");

    var query = ".*" + req.query.searchQuery + ".*"; //searchQuery is the name i give it
    Course.find(
      {
        $and: [
          { instructor_id: user._id + "" },
          {
            $or: [{ title: { $regex: query } }, { subject: { $regex: query } }],
          },
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
//
const addExam = asyncHandler(async (req, res) => {
  const { courseID, title, questionList, number } = req.body;

  if (!courseID || !questionList || !title || !number) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if course exists
  var courseExists = await Course.findOne({ _id: courseID });

  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  var oldExams = courseExists.exams;

  const newExam = {
    number: number,
    title: title,
    questions: questionList,
  };

  if (!oldExams) {
    oldExams = [];
  }
  oldExams.push(newExam);
  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { exams: oldExams },
    { new: true }
  );
  if (courseUptaded) {
    //WHY IS THE TITLE NOT GOING ????????
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const deleteExam = asyncHandler(async (req, res) => {
  const { courseID, number } = req.body;
  if (!courseID || !number) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if course exists
  var courseExists = await Course.findOne({ _id: courseID });

  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  var oldExams = [];
  var newNumber = 1;
  for (let i = 0; i < courseExists.exams.length; i++) {
    if (courseExists.exams[i].number != number) {
      oldExams.push({
        number: newNumber++,
        title: courseExists.exams[i].title,
        questions: courseExists.exams[i].questions,
      });
    }
  }

  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { exams: oldExams },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const editExamAnswers = asyncHandler(async (req, res) => {
  const { courseID, examNumber, updatedQuestionList, title } = req.body;
  if (!courseID || !examNumber || !updatedQuestionList || !title) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  var courseExists = await Course.findOne({ _id: courseID });

  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }
  var examList = courseExists.exams;
  var targetExam;
  var targetExamIndex = 0;
  for (
    targetExamIndex = 0;
    targetExamIndex < examList.length;
    targetExamIndex++
  ) {
    if (examList[targetExamIndex].number == examNumber) {
      targetExam = examList[targetExamIndex];
      break;
    }
  }
  if (!targetExam) {
    res.status(400);
    throw new Error("Exam does not exist");
  }

  targetExam.questions = updatedQuestionList;
  targetExam.title = title;
  examList[targetExamIndex] = targetExam;

  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { exams: examList },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const editPublicity = asyncHandler(async (req, res) => {
  const { number, courseID } = req.body;
  if (!courseID || !number) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  var courseExists = await Course.findOne({ _id: courseID });

  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  var examList = courseExists.exams;
  if (examList.length < number) {
    res.status(400);
    throw new Error("Exam does not exist");
  }

  examList[number - 1].public = !examList[number - 1].public;

  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { exams: examList },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const viewMyRatingAndReviews = asyncHandler(async (req, res) => {
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  res.json({
    rating: user.rating,
    reviews: user.reviews,
  });
});
//-----------------------------------
const viewMyCoursesRatingAndReviews = asyncHandler(async (req, res) => {
  // Check if user exists
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  const c = await Course.find(
    { _id: id },
    {
      rating: 1,
      reviews: 1,
    }
  );

  res.json(c);
});

const acceptContract = asyncHandler(async (req, res) => {
  //const { instructor_id } = req.body;
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  const updatedCourse = await users.findOneAndUpdate(
    { _id: user.id },
    { $set: { Accepted: true } },
    { new: true }
  );

  res.send(201).send(updatedCourse);
});

const addLinkToCourse = asyncHandler(async (req, res) => {
  const { title, courseVideoPreview } = req.body;
  var courseExists = await Course.findOne({ title: title });
  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }
  const courseUptaded = await Course.findOneAndUpdate(
    { title: title },
    { courseVideoPreview: courseVideoPreview },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const addLinktoSubtitle = asyncHandler(async (req, res) => {
  const { title, subtitles, link, description } = req.body;

  if (!title || !subtitles || !link || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if course exists
  var courseExists = await Course.findOne({ title: title });
  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  var oldSubtitles = courseExists.subtitles;
  const subExists = isArrayItemExists(oldSubtitles, subtitles);
  //const location = getlocOfSub(oldSubtitles,subtitles)
  if (subExists) {
    res.status(400);
    throw new Error("Subtitle Exists");
  }

  const newSubtitles = {
    subtitle: subtitles,
    link: link,
    description: description,
  };

  oldSubtitles.push(newSubtitles);
  //oldSubtitles.push(newSubtitles)
  const courseUptaded = await Course.findOneAndUpdate(
    { title: title },
    { subtitles: oldSubtitles },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const editPublicityCourse = asyncHandler(async (req, res) => {
  const { courseID } = req.body;

  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { public: true },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const editCourse = asyncHandler(async (req, res) => {
  // const {title, price , hours, summary, subject ,courseVideoPreview} = req.body.formData.
  // console.log(req.body);
  const courseUptaded = await Course.findOneAndUpdate(
    { _id: req.body.courseID },
    {
      title: req.body.formData.title,
      price: req.body.formData.price,
      hours: req.body.formData.hours,
      summary: req.body.formData.summary,
      subject: req.body.formData.subject,
      courseVideoPreview: req.body.formData.courseVideoPreview,
    },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  // const {title, price , hours, summary, subject ,courseVideoPreview} = req.body.formData.
  // console.log(req.body);
  const courseUptaded = await Course.findOneAndDelete({
    _id: req.body.courseID,
  });
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const closeCourse = asyncHandler(async (req, res) => {
  const { courseID } = req.body;

  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { closed: true },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

// Save data of edited email in the database
const editEmail = async (request, response) => {
  try {
    var editEmail = await users.findByIdAndUpdate(
      request.body.id,
      { $set: { email: request.body.email } },
      { new: true }
    ); // new true is to return the updated right away
    response.status(201).json(editEmail);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const editBio = async (request, response) => {
  try {
    var editBio = await users.findByIdAndUpdate(request.body.id, {
      $set: { biography: request.body.biography },
    });
    response.status(201).json(editBio);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const coursePromo = async (request, response) => {
  try {
    var editPromo = await Course.findByIdAndUpdate(request.body.id, {
      $set: {
        promotion: request.body.promotion,
        deadline: request.body.deadline,
      },
    });
    response.status(201).json(editPromo);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

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
  res.status(200).send(problems)
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
  viewPrice,
  viewMyCourses,
  filterMyCourses,
  filterCourses,
  addCourse,
  viewCoursefromResults,
  selectCountry,
  inssearchCourse,
  searchCourse,
  addExam,
  editExamAnswers,
  deleteExam,
  editPublicity,
  viewMyRatingAndReviews,
  viewMyCoursesRatingAndReviews,
  acceptContract,
  addLinkToCourse,
  // addSubtitle,
  addLinktoSubtitle,
  editPublicityCourse,
  editCourse,
  deleteCourse,
  closeCourse,
  editEmail,
  editBio,
  coursePromo,
  reportProblem,
  viewProblem,
  followUpProblem,
};
