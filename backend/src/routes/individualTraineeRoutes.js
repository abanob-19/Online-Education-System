const express = require("express");
const router = express.Router();
const {
  viewAllCourses,
  viewPrice,
  viewCoursefromResults,
  selectCountry,
  searchCourse,
  // filterCourses,
  answerExam,
  viewAllCoursesWithPrice,
  viewAllRegisteredCourses,
  registerCourse,
  getExam,
  getsolvedExams,
  getfirstName,
  getlastName,
  sendEmail,
  rateCourse,
  rateInstructor,
  reviewInstructor,
  reviewCourse,
  acceptPolicy,
  getInstructorRatings,
  requestRefund,
  getReviewCourse,
  getReviewInstructor,
  openCourse,
  reportProblem,
  viewProblem,
  followUpProblem,
} = require("../controllers/individualTraineeController");
const { protectIndividualTrainee } = require("../middleware/authMiddleware.js");

const { filterCourses } = require("../controllers/instructorController");

router.get(
  "/viewAllCourses",
  protectIndividualTrainee,
  viewAllCoursesWithPrice
);
router.get("/viewPrice", protectIndividualTrainee, viewPrice);
router.get("/filterCourses", protectIndividualTrainee, filterCourses);
router.post("/filterCourses", protectIndividualTrainee, viewCoursefromResults);
router.post("/searchCourse", protectIndividualTrainee, viewCoursefromResults);
router.post("/selectCountry", protectIndividualTrainee, selectCountry);
router.get("/searchCourse", protectIndividualTrainee, searchCourse);

router.post(
  "/viewAllRegisterdCourses",
  protectIndividualTrainee,
  viewAllRegisteredCourses
);
router.post("/answerExam", protectIndividualTrainee, answerExam);
router.put("/registerCourse", protectIndividualTrainee, registerCourse);
router.post("/getCourse", protectIndividualTrainee, getExam);
router.get("/getsolvedExams", protectIndividualTrainee, getsolvedExams);
router.get("/getfirstName", protectIndividualTrainee, getfirstName);
router.get("/getlastName", protectIndividualTrainee, getlastName);
router.put("/sendEmail", protectIndividualTrainee, sendEmail);
router.put("/rateCourses", rateCourse);
router.put("/rateInstructor", rateInstructor);
router.put("/reviewInstructor", reviewInstructor);
router.put("/reviewCourse", reviewCourse);
router.put("/getReviewCourse", getReviewCourse);
router.put("/getReviewInstructor", getReviewInstructor);

router.put("/filterCourses", protectIndividualTrainee, filterCourses);

router.put("/acceptPolicy", protectIndividualTrainee, acceptPolicy);
router.put("/getInstructorRatings", getInstructorRatings);

router.post("/reportAproblem", protectIndividualTrainee, reportProblem);
router.post("/viewProblem", protectIndividualTrainee, viewProblem);
router.post("/followUp", protectIndividualTrainee, followUpProblem);

router.post("/requestRefund", protectIndividualTrainee, requestRefund);
router.post("/openCourse", protectIndividualTrainee, openCourse);

module.exports = router;
