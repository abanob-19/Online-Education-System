import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import {
  viewMyCourses,
  reset,
  viewAllCourses,
  viewMyCoursesFiltered,
  viewMyRating,
  followUpProblem,
  viewProblem
} from "../../features/instructor/instructorSlice";
import InstructorCourse from "../../components/InstructorCourse";
import { setOnboarding } from "../../features/auth/authSlice";
import OnboardingSlide from "../Onboarding";


// import { addAdmin,addInstructor,addCorporateTrainee, reset} from '../../features/admin/adminSlice'

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,onBoarding } = useSelector((state) => state.auth);

  const [filtering, setFiltering] = useState(false);
  const [flickering, setFlickering] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    startPrice: null,
    endPrice: null,
  });

  const { subject, startPrice, endPrice } = formData;

  const {
    courses,
    isLoading,
    isError,
    message,
    currCourse,
    isSuccess,
    currExam,
    problems
  } = useSelector((state) => state.instructor);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (!user.Accepted) {
      navigate("/instructor/acceptContract");
    }

    if (!filtering) {
      dispatch(viewMyCourses());
      
    } else {
      dispatch(
        viewMyCoursesFiltered({
          subject: subject,
          startPrice: startPrice,
          endPrice: endPrice,
        })
      );
    }

    // if (isSuccess) {
    //     toast.success(message)
    // }

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    isError,
    message,
    dispatch,
    currCourse,
    currExam,
    filtering,
    flickering,
  ]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function viewAllCoursesClick() {
    await dispatch(viewAllCourses(1));
    navigate("/instructor/viewCourses");
  }
  async function addCourse() {
    //await dispatch(addCourse(1))
    navigate("/instructor/addCourse");
  }

   async function followUpProblemfunc(){
    await dispatch(followUpProblem({
      issuerID:user._id
    }))
    navigate("/instructor/followUp", {
      state: {
        problems:problems
      },
    });
  }
  async function viewAllReportsClick(){
    await dispatch(viewProblem())
    navigate("/instructor/viewReports", {
      state: {
        problems:problems
      },
    });
  }
  async function viewMyRatingsClick() {
    await dispatch(viewMyRating(1));
    navigate("/instructor/viewMyRating");
  }

  function filterCoursesClick() {
    if (
      subject === "" &&
      (startPrice === null || startPrice === "") &&
      (endPrice === null || endPrice === "")
    ) {
      dispatch(viewMyCourses());
    } else {
      setFlickering((prev) => !prev);
      setFiltering(true);
    }
  }

  function removeFiltersClick() {
    setFormData({
      subject: "",
      startPrice: null,
      endPrice: null,
    });
    dispatch(viewMyCourses());
  }

  if (isLoading) return <Spinner />;

  const coursesArr = courses.map((c) => {
    return <InstructorCourse key={c._id} course={c} />;
  });
  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      {onBoarding && <OnboardingSlide step={1} />}
      <div style={{display:'flex',justifyContent:'center', marginLeft:'20px',marginTop:'20px' }}>
      <button class='btn' onClick={() => dispatch(setOnboarding(1))}>Help </button>
      <button  class='btn' style={{ marginLeft:'20px' }} onClick={followUpProblemfunc}> Follow Up Problems </button>
      <button class='btn' style={{marginLeft:'20px' }} onClick={viewAllReportsClick}> View All Problems </button>
      </div>
      <h1>Here is a list of your courses:</h1>
       <label>Subject:</label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subject}
          placeholder="Subject"
          onChange={onChange}
        />
      </div>
      <label>Minimum Price: </label>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          id="startPrice"
          name="startPrice"
          value={startPrice}
          placeholder="Free"
          onChange={onChange}
        />
      </div>
      <label>Maximum Price: </label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="endPrice"
          name="endPrice"
          value={endPrice}
          placeholder="No upper bound"
          onChange={onChange}
        />
      </div>
      <div style={{display:'flex',justifyContent:'right' }}>
      <button style={{ marginLeft:'20px' }} className="btn" onClick={filterCoursesClick}>
        Filter
      </button>
      <button style={{ marginLeft:'20px',marginRight:'20px' }} className="btn" onClick={removeFiltersClick}>
        Remove filters
      </button>
      </div>
      </div>
      {coursesArr}
      <br/>
      <br />
      
      <button onClick={viewAllCoursesClick}> View All Courses </button>
      <button onClick={addCourse}> Add New Course </button>
      <br />
      <button onClick={viewMyRatingsClick}> Your rating and reviews </button>
      
    </>
  );
}

export default Home;