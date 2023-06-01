import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import jsPDF from "jspdf";
import {
  viewAllCourses,
  getRegisteredCourses,
  reset,
  setSolvingExam,
  getsolvedExams,
  viewPrevExam,
  rateCourses,
  openCourse,
  rateInstructors,
  getInstructorRatings,
  requestRefund2,
  setReviewCourse,
  setReviewInstructor,
  getfirstName,
  getlastName,
  sendEmail,
  followUpProblem,
  viewProblem
} from "../../features/individualTrainee/individualTraineeSlice";
import StarRating from "../../components/StarRating";
import axios from "axios";
import StarRatingInst from "../../components/StarRatingInst";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import OnboardingSlide from "../Onboarding";
import { setOnboarding } from "../../features/auth/authSlice";
import jsPDF  from "jspdf";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,onBoarding } = useSelector((state) => state.auth);

  const {
    isLoading,
    isError,
    message,
    isSuccess,
    courses,
    rating2,
    registeredCourses,
    solvedExams,
    firstName,
    lastName,
    problems
  } = useSelector((state) => state.individualTrainee);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (isSuccess) {
      // toast.success(message)
    } else {
      dispatch(getsolvedExams(1));
      dispatch(getfirstName(1));
      dispatch(getlastName(1));
      dispatch(
        getRegisteredCourses({
          reisteredIDs: user.registeredCourses,
        })
      );
    }

    // return () => {
    //     dispatch(reset())
    // }
  }, [user, navigate, dispatch, isSuccess, isError, message]);

  function solveExamClick(courseID, examID) {
    dispatch(
      setSolvingExam({
        courseID: courseID,
        examID: examID,
      })
    );
    navigate("/individualTrainee/exam");
  }

  function viewAllCoursesClick() {
    dispatch(viewAllCourses(1));
    navigate("/individualTrainee/viewCourses");
  }

  function viewPrevExamClick(courseID, examID, answersOfPrev) {
    dispatch(viewPrevExam(answersOfPrev));
    dispatch(
      setSolvingExam({
        courseID: courseID,
        examID: examID,
      })
    );
    navigate("/individualTrainee/exam");
  }
  async function followUpProblemfunc(){
    await dispatch(followUpProblem({issuerID: user._id}))
    navigate("/individualTrainee/followUp", {
      state: {
        problems:problems
      },
    });
  }
  async function viewAllReportsClick(){
    await dispatch(viewProblem())
    navigate("/individualTrainee/viewReports", {
      state: {
        problems:problems
      },
    });
  }

  async function viewSubtitle(id, subtitles, title) {
    const course1 = { courseID: id, title: title, subtitles: subtitles };
    await dispatch(openCourse(course1));
    console.log("teeeeeeeeeeest     : " + course1.courseID);
    navigate("/individualTrainee/viewSubtitle", {
      state: {
        courseID: id,
        title: title,
        subtitles: subtitles,
      },
    });
  }
  function rateCourseClick(courseID) {
    dispatch(
      rateCourses({
        course_id: courseID,
        newRating: rating,
      })
    );
  }
  function downloadPdf (fname,lname,cname){
    var doc=new jsPDF('landscape','px','a4','false');
    doc.text(220,30, 'this is to ceritify that ');
    doc.text(250,60, fname + ' ' + lname);
    doc.text( 150,80,' has completed course ' +cname +' successfully' );
    //doc.text( 150,100,'وهذا اقرار مني بذلك ' );
    doc.text(160,410,'t7yatna');
    doc.save('certificate.pdf');
      }
  async function sendmail(cname){
        dispatch(sendEmail({cname}));
       alert("sent");
       return false;
  }
  async function onClickReport(id) {
    const course1 = {courseID: id, issuerID:user._id}
    await dispatch(openCourse(course1))
    navigate('/individualTrainee/reportAproblem',{state:{
      courseID: id, issuerID:user._id
  }})
  }

  async function starComponentChange(courseID, rating) {
    await dispatch(
      rateCourses({
        course_id: courseID,
        newRating: rating,
      })
    );

    await dispatch(getsolvedExams(1));
    alert(
      "Your rating was saved successfully!\n" +
        "You rated this course: " +
        rating
    );
    return false;
  }
  async function starComponentChange2(instructorId, courseId, rating) {
    alert(instructorId);
    await dispatch(
      rateInstructors({
        Instructor_id: instructorId,
        CourseId: courseId,
        newRating: rating,
      })
    );

    await dispatch(getsolvedExams(1));
    await dispatch(getfirstName(1));
    await dispatch(getlastName(1));
    alert(
      "Your rating was saved successfully!\n" +
        "You rated this instructor: " +
        rating
    );
    return;
  }

  async function getInstructorRatings2(instructorId, courseId) {
    var response = await axios.put(
      "http://localhost:8000/individualTrainee/" + "getInstructorRatings",
      { instructorId: instructorId }
    );

    console.log("RESPONSEEEE");
    console.log(response.data.rating);
    // return response.data.rating[0];
    return 0;
    //getInstructorRatings({
    //  instructorId: instructorId,
    //})
  }

  // async function requestRefund(courseId, text) {
  //   await dispatch(
  //     requestRefund({
  //       text: text,
  //       CourseId: courseId,
  //     })
  //   );

  //   await dispatch(getsolvedExams(1));
  //   alert(
  //     "Your rating was saved successfully!\n" +
  //       "You rated this instructor: " +
  //       rating
  //   );
  // }

  var percent = 40;
  async function requestRefund1(courseId) {
    confirmAlert({
      title: "Request Refund",
      message: "Are you sure you want to refund this course?",
      buttons: [
        {
          label: "Refund",
          onClick: async () => {
            if (percent < 50) {
              await dispatch(
                requestRefund2({
                  CourseId: courseId,
                })
              );
            } else {
              toast.error("More than 50% of this course already completed");
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  }

  async function reviewCourse(courseId) {
    await dispatch(
      setReviewCourse({
        course_id: courseId,
      })
    );
    navigate("/individualTrainee/reviewCourse");

    // await dispatch(getsolvedExams(1));
    // alert(
    //   "Your rating was saved successfully!\n" +
    //     "You rated this instructor: " +
    //     rating
    // );
  }

  async function reviewInstructor(instructorId) {
    console.log(instructorId);
    await dispatch(
      setReviewInstructor({
        Instructor_id: instructorId,
      })
    );
    navigate("/individualTrainee/reviewInstructor");

    // await dispatch(getsolvedExams(1));
    // alert(
    //   "Your rating was saved successfully!\n" +
    //     "You rated this instructor: " +
    //     rating
    // );
  }
  const [rating, setRating] = useState(0);

  const coursesList = registeredCourses.map((c) => {
    {
      //var sum = 1;

      var cname=c.title;
    
     var  per=0;
     if(c.exams.length==0)
     per=0;
     else{
      var aaaa=0;
      
      if(solvedExams!==undefined){
        
      for(let j=0;j<solvedExams.length;j++){
        if(solvedExams[j].courseID==c._id )
        aaaa=aaaa+1;
        
      //  console.log(per);
      }
   
     }
     per=(aaaa/c.exams.length)*100;
    }


      var number = 0;
      for (let i = 0; i < c.rating.length; i++) {
        number = number + parseInt(c.rating[i], 10);
      }
      number = Math.round((number / c.rating.length) * 10) / 10;

      //var sum = 1;
      var number2 = 0;
      for (let i = 0; i < c.instructorRating.length; i++) {
        number2 = number2 + parseInt(c.instructorRating[i], 10);
      }
      number2 = Math.round((number2 / c.instructorRating.length) * 10) / 10;
    }
    return (
      <>
      <br/>
      <br/>
      <div key={c._id} class='box-form' style={{width:'1500px'}}>
        
        <div>
          <p>Rate this course:</p>
          <StarRating cID={c._id} onChanged={starComponentChange} />
          {/* <p>you rated: {c.rating[c.rating.length - 1]}</p> */}
          {/* <p>you rated: {c.rating}</p> */}
        </div>
        <h2>Title: {c.title}</h2>
        <h2>Course rating: {isNaN(number) ? "--" : number}</h2>
        <h2>Hours: {c.hours}</h2>
        <h2>Completion: {per}</h2>
        <h2>Exams : </h2>
        <iframe
          width="560"
          height="315"
          src={c.courseVideoPreview}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
          {console.log(c)}
        </iframe>
        <h2>Hours: {c.hours}</h2>
        <h2>Exams : </h2>
        <p>Rate this instructor:</p>
        <StarRatingInst
          instId={c.instructor_id}
          cID={c._id}
          onChanged={starComponentChange2}
        />
        <h2>Instructor: {c.instructorName}</h2>
        <h2>Instructor rating: {isNaN(number2) ? "--" : number2}</h2>
        <button
          className="btn btn-block"
          onClick={() => {
            reviewInstructor(c.instructorId);
          }}
        >
          {" "}
          Review this instructor{" "}
        </button>
        <button
          className="btn btn-block"
          onClick={() => {
            reviewCourse(c._id);
          }}
        >
          {" "}
          Review this course{" "}
        </button>
        <button
          className="btn btn-block"
          onClick={() => {
            viewSubtitle(c._id, c.subtitles, c.title);
          }}
        >
          {" "}
          View Subtitles{" "}
        </button>
        {per==100 && (<button className='btn' onClick={() => {downloadPdf(firstName,lastName,c.title)}}>download certificate</button>)}
        {per==100 && (<button className='btn' onClick={() => {sendmail(c.title)}}>send certificate in mail</button>)}
        <button
          className="btn btn-block"
          onClick={() => {
            requestRefund1(c._id);
          }}
        >
          {" "}
          Request refund{" "}
        </button>
        <button className='btn btn-block' onClick={()=>{onClickReport(c._id)}} >Report Problem</button>
        <ul>
          {c.exams.map((e) => {
            if (e.public) {
              var solved = false;
              var solvedIndex = -1;
              for (let i = 0; i < solvedExams.length; i++) {
                if (solvedExams[i].examID == e._id) {
                  solved = true;
                  solvedIndex = i;
                  break;
                }
              }
              return (
                <div key={e._id}>
                  <h3>{e.title}</h3>
                  {solved && (
                    <p>
                      You scored {solvedExams[solvedIndex].score} out of{" "}
                      {e.questions.length} (
                      {(solvedExams[solvedIndex].score / e.questions.length) *
                        100}
                      %)
                    </p>
                  )}
                  {solved && (
                    <button
                      className="btn"
                      onClick={() => {
                        viewPrevExamClick(
                          c._id,
                          e._id,
                          solvedExams[solvedIndex].answerList
                        );
                      }}
                    >
                      View your previous answers
                    </button>
                  )}
                  {!solved && (
                    <button
                      className="btn"
                      onClick={() => {
                        solveExamClick(c._id, e._id);
                      }}
                    >
                      Click Here to solve
                    </button>
                    
                  )}
              

                </div>
              );
            }
          })}
        </ul>
        {/* <h2>Price:{c.price}</h2> */}
        {/* <button className='btn' onClick={() => {registerCourseClick(c._id)}}> Register to this course </button> */}
        <br />
        <br/>
        <br/>
      </div>
      </>
    );
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      {onBoarding && (
          <OnboardingSlide step={1} />

      )}
      <div className='box-form' style={{width:'1500px'}} >
      <div style={{display:'flex',justifyContent:'center', marginLeft:'20px',marginTop:'20px' }}>
      <button class='btn' onClick={() => dispatch(setOnboarding(1))}>Help </button>
      <button  class='btn' style={{ marginLeft:'20px' }} onClick={followUpProblemfunc}> Follow Up Problems </button>
      <button class='btn' style={{marginLeft:'20px' }} onClick={viewAllReportsClick}> View All Problems </button>
      </div>
      
      {/* <button onClick={followUpProblemfunc}> Follow Up Problems </button>
      <button onClick={viewAllReportsClick}> View All </button>
        <div>Welcome Home</div>
        <button  onClick={()=> dispatch(setOnboarding(1))}>Help
            </button> */}
        Your current wallet balnce is : {user.wallet ? user.wallet : 0}
        <button className="btn btn-block" onClick={viewAllCoursesClick}>
          {" "}
          View All Courses{" "}
        </button>
        <h1>Here is a list of your registered courses</h1>
        <br/>
        <br/>
        

        </div>
        {coursesList}
      
    </>
  );
}

export default Home;
