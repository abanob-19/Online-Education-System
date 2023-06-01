const express = require("express");
const router = express.Router();
const {
  viewAllCourses,
  viewPrice,
  viewMyCourses,
  addCourse,
  viewCoursefromResults,
  selectCountry,
  inssearchCourse,
  searchCourse,
  filterMyCourses,
  filterCourses,
  addExam,
  editExamAnswers,
  deleteExam,
  editPublicity,
  viewMyRatingAndReviews,
  viewMyCoursesRatingAndReviews,
  acceptContract,
  addLinkToCourse,
  addLinktoSubtitle,
  editPublicityCourse,
  editCourse,
  deleteCourse,
  closeCourse,
  reportProblem,
  viewProblem,
  followUpProblem,
} = require("../controllers/instructorController");
const { protectInstructor } = require("../middleware/authMiddleware.js");

const { acceptPolicy } = require("../controllers/individualTraineeController");

router.get("/viewAllCourses", protectInstructor, viewAllCourses);
router.get("/viewMyCourses", protectInstructor, viewMyCourses);
router.get("/viewPrice", protectInstructor, viewPrice);

router.post("/addCourse", protectInstructor, addCourse);
router.post("/addLinktoSubtitle", protectInstructor, addLinktoSubtitle);
// router.post('/addsubtitle',protectInstructor, addSubtitle)
router.post("/addLinktoCourse", protectInstructor, addLinkToCourse);
router.post("/filterMyCourses", protectInstructor, viewCoursefromResults);
router.post("/filterCourses", protectInstructor, viewCoursefromResults);
//viewcoursesfromresults
router.put("/filterMyCourses", protectInstructor, filterMyCourses);
// changed to put

router.put("/filterCourses", protectInstructor, filterCourses);
// changed to put

router.post("/searchCourse", protectInstructor, viewCoursefromResults);
router.post("/selectCountry", protectInstructor, selectCountry);
router.get("/searchCourse", protectInstructor, searchCourse);
router.post("/inssearchCourse", protectInstructor, viewCoursefromResults);
router.get("/inssearchCourse", protectInstructor, searchCourse);

//router.post('/addExam',protectInstructor, addExam)

router.post("/addExam", protectInstructor, addExam);
router.put("/addExam", protectInstructor, editExamAnswers);
router.delete("/deleteExam", protectInstructor, deleteExam);
router.put("/home", protectInstructor, editPublicity);

router.get(
  "/viewMyRatingAndReviews",
  protectInstructor,
  viewMyRatingAndReviews
);
router.put(
  "/viewMyCoursesRatingAndReviews",
  protectInstructor,
  viewMyCoursesRatingAndReviews
);

router.put("/accept", protectInstructor, acceptContract);

router.put("/acceptPolicy", protectInstructor, acceptPolicy);

router.post("/editPublicityCourse", protectInstructor, editPublicityCourse);
router.post("/editCourse", protectInstructor, editCourse);
router.post("/deleteCourse", protectInstructor, deleteCourse);
router.post("/closeCourse", protectInstructor, closeCourse);

router.post("/reportAproblem", protectInstructor, reportProblem);
router.post("/viewProblem", protectInstructor, viewProblem);
router.post("/followUp", protectInstructor, followUpProblem);

module.exports = router;
