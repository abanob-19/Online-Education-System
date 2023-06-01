const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Course } = require("../models/Course");
const users = require("../models/userModel");

// @desc    Add a new Admin
// @route   POST /api/admin/addAdmin
// @access  Private
const viewAllCourses = asyncHandler(async (req, res) => {
  const table = await Course.find(
    {},
    {  }
  );
  // Check if user exists
  res.send(table);
});

// @desc    Adding an instructor
// @route   POST /api/admin/addInstructor
// @access  Private
const viewPrice = asyncHandler(async (req, res) => {
  // Check if user exists
  res.send(await Course.find({}, { }));
});

const viewCoursefromResults = asyncHandler(async (req, res) => {
  const table = await Course.findOne(
    { title: req.body.title },
    {
    }
  );
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

const filterCourses = asyncHandler(async (req, res) => {
  try {
    let match = {};
    if (req.query.subject) {
      match.subject = new RegExp(req.query.subject, "i");
    }

    if (req.query.rating) {
      match.rating = req.query.rating;
    }

    if (req.query.price) {
      match.price = req.query.price;
    }

    const response = await Course.aggregate([{ $match: match }]);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  viewAllCourses,
  viewPrice,
  filterCourses,
  viewCoursefromResults,
  selectCountry,
  searchCourse,
};
