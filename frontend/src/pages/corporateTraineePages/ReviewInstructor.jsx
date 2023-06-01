import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

import {
  reset,
  reviewCourses,
  reviewInstructors,
} from "../../features/corporateTrainee/corporateTraineeSlice";

function ReviewInstructor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const {
    reviewingInstructor,
    isLoading,
    isError,
    isSuccess,
    message,
    courses,
  } = useSelector((state) => state.corporateTrainee);

  const [formData, setFormData] = useState({
    reviews: "",
  });
  const { reviews } = formData;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [
    reviewingInstructor,
    user,
    navigate,
    isError,
    message,
    dispatch,
    courses,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function addReviewInstructor() {
    if (reviews === "") {
      toast.error("Please enter all fields");
    } else {
      const rev = {
        Instructor_id: reviewingInstructor._id,
        newReview: reviews,
      };
      // console.log("loooooogggg" + formData)
      dispatch(reviewInstructors(rev));
      toast.success("Review Added successfuly");
      //const { title, courseVideoPreview } = formData;
      //dispatch(addLinkToCourse({title,courseVideoPreview }))
      //dispatch(logOutReset());
      navigate("/corporateTrainee/home");
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
      <h1>Add a review</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="reviews"
          name="reviews"
          value={reviews}
          placeholder="reviews"
          onChange={onChange}
        />
      </div>

      <p></p>
      <br />
      <button onClick={addReviewInstructor} className="btn btn-block">
        Add Review
      </button>
      </div>
    </>
  );
}

export default ReviewInstructor;