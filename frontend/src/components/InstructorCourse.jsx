import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  chooseCourse,
  deleteExam,
  viewMyCourses,
  chooseExam,
  editPublicity,
  viewReview,
  editPublicityCourse,
  deleteCourse,
  closeCourse
} from "../features/instructor/instructorSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function InstructorCourse({ course }) {
  const { title, price, subtitles, exams, rating, reviews, _id ,courseVideoPreview,closed} = course;

  const {
    courses,
    isLoading,
    isError,
    message,
    currCourse,
    isSuccess,
    currExam,
  } = useSelector((state) => state.instructor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onClick() {
    await dispatch(chooseCourse(course));

    navigate("/instructor/addExam");
  }
  async function onClickaddSub() {
    await dispatch(chooseCourse(course))
    navigate('/instructor/addLinktoSubtitle')
  }
  async function onClickReport() {
    await dispatch(chooseCourse(course))
    navigate('/instructor/reportAproblem')
  }
  async function viewReviews() {
    await dispatch(
      viewReview({
        id: _id,
      })
    );

    await navigate("/instructor/viewMyReviews");
  }

  async function deleteExamClick(number) {
    const helper = {
      courseID: course._id,
      number: number,
    };

    await dispatch(deleteExam(helper));
    return await dispatch(viewMyCourses());
  }

  async function deleteCourseClick() {
    const helper = {
      courseID: course._id,
    };

    confirmAlert({
      title: "Delete",
      message:
        "Are you sure you want to do this. This action cannot be undone",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
              await dispatch(deleteCourse(helper));
              return await dispatch(viewMyCourses());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });


  }


  async function publishCourse(){
    confirmAlert({
      title: "Make this course public",
      message:
        "Are you sure to do this. You can not edit or delete a Course after going public",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await dispatch(
              editPublicityCourse({
                courseID: course._id,
              })
            );
            return await dispatch(viewMyCourses());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  async function closeCourseClick(){
    confirmAlert({
      title: "Close this Course",
      message:
        "Are you sure want to do this. No new trainees can register to a closed Course",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            // toast.success("Course Closed Successfuly")
            await dispatch(
              closeCourse({
                courseID: course._id,
              })
            );
            return await dispatch(viewMyCourses());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  async function editExamClick(number) {
    await dispatch(
      chooseExam({
        exam: exams[number - 1],
        course: course,
      })
    );
    navigate("/instructor/editExam");
  }

  async function editCourseClick(number) {
    await dispatch(
      chooseCourse({
        course: course,
      })
    );
    navigate("/instructor/editCourse");
  }

  async function editPublicityClick(number, unAnsweredQuestions) {
    if (unAnsweredQuestions > 0) {
      toast.error("Please answer all questions before making it Public");
      return;
    }

    confirmAlert({
      title: "Make this exam public",
      message:
        "Are you sure to do this. You can not edit this after going public",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await dispatch(
              editPublicity({
                number: number,
                courseID: course._id,
              })
            );
            return await dispatch(viewMyCourses());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  const examsDisplay = exams.map((q) => {
    var unAnsweredQuestions = 0;
    for (let i = 0; i < q.questions.length; i++)
      if (q.questions[i].answer === "no_answer") unAnsweredQuestions++;
    return (
      <div key={q.number}>
        <h2>
          {q.number}. {q.title}
        </h2>
        
        <h3>Number of questions : {q.questions.length}</h3>
        {unAnsweredQuestions > 0 && (
          <h3 className="error">
            Number of Un Answered Questions : {unAnsweredQuestions}
          </h3>
        )}
        {!course.public && (
          <>
            <button
              className="btn"
              onClick={() => {
                editExamClick(q.number);
              }}
            >
              {" "}
              View and edit
            </button>
            <br></br>
          </>
        )}

        {course.public && (
          <>
            <button
              className="btn"
              onClick={() => {
                editExamClick(q.number);
              }}
            >
              {" "}
              View{" "}
            </button>
            <br></br>
          </>
        )}
        {!course.public &&(<button
          className="btn"
          onClick={() => {
            deleteExamClick(q.number);
          }}
        >
          {" "}
          Delete Exam
        </button>)}
        
        <br></br>
        {!q.public && (
          <>
            {/* <button
              className="btn"
              onClick={() => {
                editExamClick(q.number);
              }}
            >
              {" "}
              Edit Exam
            </button> */}
            {/* <br></br> */}
            {/* <button
              className="btn"
              id="makePublic"
              onClick={() => {
                editPublicityClick(q.number, unAnsweredQuestions);
              }}
            >
              {" "}
              {q.public ? "Make Private" : "Make Public"}
            </button> */}
          </>
        )}
      </div>
    );
  });

  {
    //var sum = 1;
    var number = 0;
    for (let i = 0; i < rating.length; i++) {
      number = number + parseInt(rating[i], 10);
    }
    number = Math.round((number / rating.length) * 10) / 10;
  }

  const courseLink = courseVideoPreview
  const renderLink = () => {
    return (
    <iframe width="560" height="315" src={courseLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>{console.log(courseLink)}</iframe>
    )
  }
  const new_data = subtitles;
    const renderAuth = () => {
        if(new_data !== undefined && Array.isArray(new_data)){
          // alert(new_data);
        const DisplayData=new_data.map(
            (info)=>{
                return(
                  
                    <tr style={{border: '1px solid black'}}>
                      {console.log(info)}
                        <td style={{border: '1px solid black'}}>{info.subtitle}</td>
                        <td style={{border: '1px solid black'}}><iframe width="560" height="315" src={info.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></td>
                        <td style={{border: '1px solid black'}}>{info.description}</td>
                    </tr>
                )
            }
        )
        return(
            <div style={{textAlign:'center'}}>
            {/* <nav><Link to="/create" className="text-Link">Skip{' >'}  </Link></nav> */}
            <h style={{marginTop:'100px'}}>Subtitles </h>
                <table style={{border: '1px solid black',borderRadius:'10px',marginLeft:'auto',marginRight:'auto'}}>
                    <thead>
                        <tr >
                        <th style={{border: '1px solid black'}}>Subtitle</th>
                        <th style={{border: '1px solid black'}}>Link</th>
                        <th style={{border: '1px solid black'}}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                        
                    </tbody>
                </table>
            </div>
        )
     }
     
}


  
  

  return (
    <>
    <br/>
    <br/>
    <div className="box-form" style={{width:'1500px'}}>
      
      <h1>
        <h1 style={{textAlign:'center'}}>{title}</h1>
      </h1>
      {course.closed && (<h3 className="error">
            This course is closed
          </h3>)}
      Rating: {number}
      <br />
      Price: {price}
      <br />
      <h1>Course Preview</h1><br/>
      {renderLink()}<br/>
      <div>
      
       ---------------------------------------------
        {renderAuth()}
        -------------------------------------------
      </div>
      <b>Available Exams : {examsDisplay.length}</b>
      {examsDisplay}
      <br></br>
      <br/>
      <div style={{display:'flex'}}>
  
      {!course.public &&(<button className="btn" style={{ marginLeft:'20px',marginRight:'20px' }} onClick={onClick}>
        Add an exam to this course
      </button>)}
      {!course.public && (<button className='btn' style={{ marginLeft:'20px',marginRight:'20px' }} onClick={onClickaddSub}>
        Add a subtitle
      </button>)}
      { !course.public &&  (<button class='btn'  style={{ marginLeft:'20px',marginRight:'20px' }} onClick={publishCourse}> Make Course public </button>)}
     { (course.public && !closed) &&  (<button style={{ marginLeft:'20px',marginRight:'20px' }} class='btn'onClick={closeCourseClick}> Close Course </button>)}
     { !(course.public) &&  (<button class='btn'style={{ marginLeft:'20px',marginRight:'20px' }}  onClick={editCourseClick}> Edit Course </button>)}
     { !(course.public) &&  (<button class='btn' style={{ marginLeft:'20px',marginRight:'20px' }} onClick={deleteCourseClick}> Delete Course </button>)}
     <button className="btn" onClick={viewReviews}>
        View Reviews
      </button>
     <button className='btn' style={{ marginLeft:'20px',marginRight:'20px' }} onClick={onClickReport}>
        Report A Problem
      </button>
     
      </div>
      <br />
      
     
     
    
      

     
  
    </div>
    </>
  );
}

export default InstructorCourse;
