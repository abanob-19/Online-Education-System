import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import { Course } from '../../../../backend/src/models/Course.js'
import Spinner from "../../components/Spinner";
import jsPDF from "jspdf";
import {
  reset,
  openCourse,
} from "../../features/individualTrainee/individualTraineeSlice";

// import {viewAllCourses,getRegisteredCourses,reset,setSolvingExam,getsolvedExams,viewPrevExam,openCourse} from '../../features/corporateTrainee/corporateTraineeSlice'

function ViewSubtitle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const courseID = location.state.courseID;
  const title = location.state.title;
  const subtitles = location.state.subtitles;
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message, currCourse, courses } =
    useSelector((state) => state.individualTrainee);
  //   const {courseID, title,subtitles,link,description } = formData
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
    // if (!currCourse) {
    //     navigate('/corprateTrainee/home')
    // }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, currCourse, courses]);

  const [textBox, setTextBox] = useState("");

  const onChange = (e) => {
    setTextBox(e.target.value);
  };

  function downloadPdf(notes) {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text(150, 30, notes);
    doc.save("notes.pdf");
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const new_data = subtitles;
  const renderAuth = () => {
    //console.log('COOOONSOOLLLEE    :   ' + subtitles)
    if (new_data !== undefined) {
      console.log("COOOONSOOLLLEE  tesstting  :   " + subtitles);
      const DisplayData = new_data.map((info) => {
        return (
          <tr style={{ border: "1px solid black" }}>
            {console.log(info)}
            <td style={{ border: "1px solid black" }}>{info.subtitle}</td>
            <td style={{ border: "1px solid black" }}>
              <iframe
                width="560"
                height="315"
                src={info.link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </td>
            <td style={{ border: "1px solid black" }}>{info.description}</td>
          </tr>
        );
      });
      return (
        <div style={{ textAlign: "center" }}>
          {/* <nav><Link to="/create" className="text-Link">Skip{' >'}  </Link></nav> */}
          <h style={{ marginTop: "100px" }}>Subtitles </h>
          <table
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Subtitle</th>
                <th style={{ border: "1px solid black" }}>Link</th>
                <th style={{ border: "1px solid black" }}>Description</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>
      );
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
      <h1>Available Subtitles</h1>
      {renderAuth()}

      <h2>Write notes here</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="notes"
          name="notes"
          value={textBox}
          placeholder="notes"
          onChange={onChange}
        />
      </div>

      <p></p>
      <br />
      <button
        className="btn"
        onClick={() => {
          downloadPdf(textBox);
        }}
      >
        download notes
      </button>
      </div>
    </>
  );
}

export default ViewSubtitle;