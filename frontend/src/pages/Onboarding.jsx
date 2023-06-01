import React, { useState } from "react";
import { setOnboarding } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import allCoursesCorp from "../assets/CorpAllCourses.png";
import allCoursesIndiv from "../assets/IndivAllCourses.png";
import IndivHome from "../assets/IndivHome.png";
import InstructorHome from "../assets/InstructorHome.png";
import InstructorAllCourses from "../assets/InstructorAllCourses.png";

function OnboardingSlide({ step }) {
  const [currentStep, setCurrentStep] = useState(step);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  function Step1() {
    return <h1>Welcome to OLS!</h1>;
  }

  function Step2() {
    if (
      user.role === "Individual Trainee" ||
      user.role === "Corporate Trainee"
    ) {
      return (
        <>
          <h2>Home Page</h2>
          <img
            src={IndivHome}
            style={{ width: "1000px", height: "400px" }}
          ></img>
          <p>Here you can see the list of your registered courses.</p>
          <p>To register to more courses click on View all courses.</p>
        </>
      );
    }

    if (user.role === "Instructor") {
      return (
        <>
          <h2>Home Page</h2>
          <img
            src={InstructorHome}
            style={{ width: "1000px", height: "400px" }}
          ></img>
          <ul>
            <li>
              <p>Here you can see the list of your courses.</p>
            </li>
            <li>
              <p>You can filter to find a specific course easily.</p>
            </li>
            <li>
              <p>You can add new Courses and Exams here.</p>
            </li>
            <li>
              <p>
                You can edit or delete Courses and Exams here as long as you did
                not publish them yet!
              </p>
            </li>
            <li>
              <p>You can also view your ratings and reviews.</p>
            </li>
          </ul>
        </>
      );
    }
  }

  function Step3() {
    if (user.role === "Individual Trainee") {
      return (
        <>
          <h2>All Courses Page</h2>

          <img
            src={allCoursesIndiv}
            style={{ width: "1000px", height: "400px" }}
          ></img>
          <p>Here you can view and register to all the available courses.</p>
          <p>Your can filter the courses to easily find the course you need.</p>
        </>
      );
    }
    if (user.role === "Corporate Trainee") {
      return (
        <>
          <h2>All Courses Page</h2>

          <img
            src={allCoursesCorp}
            style={{ width: "1000px", height: "400px" }}
          ></img>
          <p>
            Here you can request access to any of the available courses here.
          </p>
          <p>Your request will be reviewed by our lovely admins.</p>
          <p>Your can filter the courses to easily find the course you need.</p>
        </>
      );
    }
    if (user.role === "Instructor") {
      return (
        <>
          <h2 className="tutorial">All Courses Page</h2>

          <img className=".tutorial-img"
            src={InstructorAllCourses}
            style={{ width: "1000px", height: "400px" }}
          ></img>
          <div className=".tutorial-text">
          <p>Here you can view the list of all the available courses.</p>
          <p>Your can filter by price rating or subject.</p>
        </div>
        </>
      );
    }
  }

  function Step4() {
    if (user.role === "Individual Trainee" || user.role === "Corporate Trainee")
      return (
        <>
          <p>Hope you have a fun time Learning!</p>
        </>
      );
    return (
      <>
        <p>Hope you have a fun time teaching!</p>
      </>
    );
  }

  return (
    <div>
        <div className="tutorial-popup">
      <div className="onboarding-overlay">
        <div className="onboarding-tutorial">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          <button onClick={() => dispatch(setOnboarding(1))}>Close</button>
          {currentStep !== 1 && <button onClick={handlePrev}>Previous</button>}
          {currentStep !== 4 && <button onClick={handleNext}>Next</button>}
          <p>
            <b>{currentStep} / 4</b>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default OnboardingSlide;
