import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/adminPages/AdminHome";
import InstructorHome from "./pages/instructorPages/Home";
import IndividualTraineeHome from "./pages/individualTraineePages/Home";
import CorporateTraineeHome from "./pages/corporateTraineePages/Home";
import ViewMyReviews from "./pages/instructorPages/ViewMyReviews";
import ViewMyRatings from "./pages/instructorPages/ViewMyRatings";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

import IndividualTraineeViewCourses from "./pages/individualTraineePages/ViewCourses";
import IndividualTraineeExam from "./pages/individualTraineePages/Exam";
import CorporateTraineeViewCourses from "./pages/corporateTraineePages/ViewCourses";
import CorporateTraineeExam from "./pages/corporateTraineePages/Exam";
import IndividualTraineeReviewCourse from "./pages/individualTraineePages/ReviewCourse";
import IndividualTraineeReviewInstructor from "./pages/individualTraineePages/ReviewInstructor";
import CorporateTraineeReviewCourse from "./pages/corporateTraineePages/ReviewCourse";
import CorporateTraineeReviewInstructor from "./pages/corporateTraineePages/ReviewInstructor";

import IndividualTraineeViewSubtitle from "./pages/individualTraineePages/ViewSubtitle";
import CorporateTraineeViewSubtitle from "./pages/corporateTraineePages/ViewSubtitle";
import AddingSubtitle from "./pages/instructorPages/AddingSubtitle";
// import AddingSubtitle from  './pages/instructorPages/AddingSubtitle'
import AddingCourse from "./pages/instructorPages/AddingCourse";

import InstructorViewCourses from "./pages/instructorPages/ViewCourses";
import GuestViewCourses from "./pages/guestPages/ViewCourses";
import AdminViewCourses from "./pages/adminPages/ViewCourses";
import AdminViewReports from "./pages/adminPages/ViewReports";
import AddingExam from "./pages/instructorPages/AddingExam";
import EditingExam from "./pages/instructorPages/EditingExam";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AcceptContract from "./pages/instructorPages/AcceptContract";
import AcceptPolicy from "./pages/instructorPages/AcceptPolicy";
import AcceptPolicyIndv from "./pages/individualTraineePages/AcceptPolicyIndv";
import AcceptPolicyGuest from "./pages/guestPages/AcceptPoilcyGuest";
import AdminViewRefunds from "./pages/adminPages/ViewRefunds";
import AdminViewCourseRequests from "./pages/adminPages/ViewCourseRequests";
import EditingCourse from "./pages/instructorPages/EditingCourse";
import EditEmail from "./pages/instructorPages/EditEmail";
import EditBio from "./pages/instructorPages/EditBio";
import EditPromo from "./pages/instructorPages/CoursePromo";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import SearchMyCourses from "./pages/instructorPages/SearchCoursebyHim";
import SelectCountry from "./pages/CountrySelection";
import SearchAllCourses from "./pages/SearchCourse";

import InsReportProblem from "./pages/instructorPages/reportProblem"
import CorprateReportProblem from "./pages/corporateTraineePages/reportProblem"
import IndividualReportProblem from  "./pages/individualTraineePages/reportProblem"
import InsFollowUpProblem from "./pages/instructorPages/followUp"
import IndividualFollowUpProblem from "./pages/individualTraineePages/followUp"
import CorporateFollowUpProblem from "./pages/corporateTraineePages/followUp"
import InstViewReports from "./pages/instructorPages/viewAllReports"
import CorporateViewReports from "./pages/corporateTraineePages/viewAllReports"
import IndividualViewReports from "./pages/individualTraineePages/viewAllReports"

function App() {
  localStorage.clear();

  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/guest/viewCourses" element={<GuestViewCourses />} />

            <Route
              path="/instructor/viewCourses"
              element={<InstructorViewCourses />}
            />
            <Route path="/instructor/editExam" element={<EditingExam />} />
            <Route path="/instructor/addExam" element={<AddingExam />} />
            <Route path="/instructor/home" element={<InstructorHome />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/viewCourses" element={<AdminViewCourses />} />
            <Route path="/admin/viewReports" element={<AdminViewReports />} />
            <Route path="/admin/viewRefunds" element={<AdminViewRefunds />} />
            <Route
              path="/admin/viewCourseRequests"
              element={<AdminViewCourseRequests />}
            />

            <Route
              path="/individualTrainee/home"
              element={<IndividualTraineeHome />}
            />
            <Route
              path="/individualTrainee/viewCourses"
              element={<IndividualTraineeViewCourses />}
            />
            <Route
              path="/individualTrainee/exam"
              element={<IndividualTraineeExam />}
            />
            <Route path="/instructor/EditEmail" element={<EditEmail />} />
            <Route path="/instructor/EditBio" element={<EditBio />} />
            <Route path="/instructor/CoursePromo" element={<EditPromo />} />
            <Route
              path="/instructor/SearchCourseInstructor"
              element={<SearchMyCourses />}
            />
            <Route
              path="instructor/viewMyReviews"
              element={<ViewMyReviews />}
            />
            <Route path="instructor/viewMyRating" element={<ViewMyRatings />} />
            <Route
              path="instructor/acceptContract"
              element={<AcceptContract />}
            />
            <Route path="instructor/acceptPolicy" element={<AcceptPolicy />} />
            <Route
              path="individualTrainee/acceptPolicy"
              element={<AcceptPolicyIndv />}
            />
            <Route path="guest/acceptPolicy" element={<AcceptPolicyGuest />} />

            <Route
              path="/corporateTrainee/home"
              element={<CorporateTraineeHome />}
            />
            <Route
              path="/corporateTrainee/viewCourses"
              element={<CorporateTraineeViewCourses />}
            />
            <Route
              path="/corporateTrainee/exam"
              element={<CorporateTraineeExam />}
            />

            <Route
              path="/instructor/addLinktoSubtitle"
              element={<AddingSubtitle />}
            />
            <Route path="/instructor/addCourse" element={<AddingCourse />} />
            <Route
              path="/individualTrainee/viewSubtitle"
              element={<IndividualTraineeViewSubtitle />}
            />
            <Route
              path="/individualTrainee/reviewCourse"
              element={<IndividualTraineeReviewCourse />}
            />
            <Route
              path="/individualTrainee/reviewInstructor"
              element={<IndividualTraineeReviewInstructor />}
            />
            <Route
              path="/corporateTrainee/reviewCourse"
              element={<CorporateTraineeReviewCourse />}
            />
            <Route
              path="/corporateTrainee/reviewInstructor"
              element={<CorporateTraineeReviewInstructor />}
            />
            <Route
              path="/corporateTrainee/viewSubtitle"
              element={<CorporateTraineeViewSubtitle />}
            />

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/instructor/editCourse" element={<EditingCourse />} />
            <Route path="/password-reset" element={<ForgotPassword />} />
            <Route path="/selectCountry" element={<SelectCountry />} />
            <Route path="/searchCourse" element={<SearchAllCourses />} />
            <Route path='/individualTrainee/reportAproblem' element= {<IndividualReportProblem />} />
            <Route path="/instructor/reportAproblem" element = {<InsReportProblem/>}/>
            <Route path="/corporateTrainee/reportAproblem" element = {<CorprateReportProblem/>}/>
            <Route path="/corporateTrainee/followUp" element = {<CorporateFollowUpProblem/>}/>
            <Route path="/instructor/followUp" element = {<InsFollowUpProblem/>}/>
            <Route path="/individualTrainee/followUp" element = {<IndividualFollowUpProblem/>}/>
            <Route path="/instructor/viewReports" element = {<InstViewReports/>}/>
            <Route path="/corporateTrainee/viewReports" element = {<CorporateViewReports/>}/>
            <Route path="/individualTrainee/viewReports" element = {<IndividualViewReports/>}/>
            
          </Routes>

          
          
        
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
