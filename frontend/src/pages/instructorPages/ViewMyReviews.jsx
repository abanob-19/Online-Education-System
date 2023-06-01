import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { reset } from "../../features/instructor/instructorSlice";

function ViewMyReviews() {
  //   <h1>Heelo</h1>;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, message, allCourses, isSuccess } = useSelector(
    (state) => state.instructor
  );

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

    // dispatch(viewMyCourses())

    if (isSuccess) {
      toast.success(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isSuccess, isError, message]);

  const coursesList = allCourses.map((c) => {
    return (
      <div key={c._id}>
        -------------------------------------
        {/* <h2>Course_id: {c._id}</h2> */}
        {/* <h2>Title: {c.title}</h2> */}
        {/* <h2>Hours: {c.hours}</h2>
        <h2>Rating:{c.rating}</h2>
        <h2>Price:{c.price}</h2> */}
        <h2>Reviews:</h2>
        {c.reviews.map((r) => {
          return (
            <>
              {r}
              <br />
            </>
          );
        })}
        <br />
      </div>
    );
  });

  if (isLoading) return <Spinner />;

  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <h1>Here is a list of all course reviews: </h1>
      {coursesList}
      </div>
    </>
  );
}

export default ViewMyReviews;
