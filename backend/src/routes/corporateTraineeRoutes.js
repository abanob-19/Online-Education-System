const express = require("express");
const router = express.Router();
const {
  viewAllCourses,
  selectCountry,
  searchCourse,

  viewAllRegisteredCourses,
  answerExam,
  registerCourse,
  getExam,
  getsolvedExams,
  getfirstName,
  getlastName,
  openCourse,
  sendEmail,
  viewVideoCourse,
  viewVideoSubtitle,
  rateCourse,
  rateInstructor,
  reviewInstructor,
  reviewCourse,
  getReviewCourse,
  getReviewInstructor,
  viewMyRequests,
  requestCourse,
  acceptPolicy,
  reportProblem,
  viewProblem,
  followUpProblem,
} = require("../controllers/corporateTraineeController");

// using the method from another controller
const { filterCourses } = require("../controllers/instructorController");

const { protectCorporateTrainee } = require("../middleware/authMiddleware.js");

router.get("/viewAllCourses", protectCorporateTrainee, viewAllCourses);
router.post("/selectCountry", protectCorporateTrainee, selectCountry);
router.get("/searchCourse", protectCorporateTrainee, searchCourse);
router.get("/viewVideoSubtitle", protectCorporateTrainee, viewVideoSubtitle);
router.post("/openCourse", protectCorporateTrainee, openCourse);
router.get("/viewVideoCourse", protectCorporateTrainee, viewVideoCourse);

router.put("/rateCourses", rateCourse);
router.put("/rateInstructor", rateInstructor);
router.put("/reviewInstructor", reviewInstructor);
router.put("/reviewCourse", reviewCourse);
router.put("/getReviewCourse", getReviewCourse);
router.put("/getReviewInstructor", getReviewInstructor);

router.post(
  "/viewAllRegisterdCourses",
  protectCorporateTrainee,
  viewAllRegisteredCourses
);
router.post("/answerExam", protectCorporateTrainee, answerExam);
router.put("/registerCourse", protectCorporateTrainee, registerCourse);
router.post("/getCourse", protectCorporateTrainee, getExam);
router.get("/getsolvedExams", protectCorporateTrainee, getsolvedExams);
router.get("/getfirstName", protectCorporateTrainee, getfirstName);
router.get("/getlastName", protectCorporateTrainee, getlastName);
router.put("/sendEmail", protectCorporateTrainee, sendEmail);

router.put("/filterCourses", protectCorporateTrainee, filterCourses);

// sprint3
router.get("/viewMyRequests", protectCorporateTrainee, viewMyRequests);

router.put("/requestCourse", protectCorporateTrainee, requestCourse);

router.post("/reportAproblem", protectCorporateTrainee, reportProblem);

router.put("/acceptPolicy", protectCorporateTrainee, acceptPolicy);
router.post("/viewProblem", protectCorporateTrainee, viewProblem);
router.post("/followUp", protectCorporateTrainee, followUpProblem);

module.exports = router;
