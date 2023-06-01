const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/adminController");
const {
  viewAllCourses,
  filterCourses,
} = require("../controllers/instructorController");
const { protectAdmin } = require("../middleware/authMiddleware.js");

router.post("/addAdmin", protectAdmin, addAdmin);
router.post("/addInstructor", protectAdmin, addInstructor);
router.post("/addCorporateTrainee", protectAdmin, addCorporateTrainee);

//using the view all Courses of the insrtuctor

router.get("/viewAllCourses", protectAdmin, viewAllCourses);
router.put("/filterCourses", protectAdmin, filterCourses);

router.put("/setDiscountCourses", protectAdmin, setDiscountCourses);

router.get("/viewAllReports", protectAdmin, viewAllReports);
router.get("/viewUnseenReports", protectAdmin, viewUnseenReports);

router.put("/setStatus", protectAdmin, setStatus);

router.get("/viewRequests", protectAdmin, viewRequests);

router.put("/rejectRefundRequest", protectAdmin, rejectRefundRequest);
router.put("/acceptRefundRequest", protectAdmin, acceptRefundRequest);

router.get("/viewCourseRequests", protectAdmin, viewCourseRequests);

router.put("/courseRequestResponse", protectAdmin, courseRequestResponse);

module.exports = router;
