const express = require("express");
const router = express.Router();
const {
  viewAllCourses,
  viewPrice,
  viewCoursefromResults,
  selectCountry,
  searchCourse,
} = require("../controllers/guestController");
//const { protectInstructor} = require('../middleware/authMiddleware.js')

const { filterCourses } = require("../controllers/instructorController");

router.get("/viewAllCourses", viewAllCourses);
router.get("/viewPrice", viewPrice);
router.get("/filterCourses", filterCourses);
router.post("/filterCourses", viewCoursefromResults);
router.post("/searchCourse", viewCoursefromResults);
router.post("/selectCountry", selectCountry);
router.get("/searchCourse", searchCourse);

router.put("/filterCourses", filterCourses);

module.exports = router;
