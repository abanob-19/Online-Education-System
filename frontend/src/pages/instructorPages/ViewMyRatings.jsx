import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { reset } from "../../features/instructor/instructorSlice";

function ViewCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, allUser } = useSelector((state) => state.auth);

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

  if (isLoading) return <Spinner />;
  {
    //var sum = 1;
    var number = 0;
    for (let i = 0; i < user.rating.length; i++) {
      number = number + parseInt(user.rating[i], 10);
    }
    number = Math.round((number / user.rating.length) * 10) / 10;
  }

  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <h1>Here is a list of your rating and reviews: </h1>
      <h2>Rating:</h2>
      {number}

      <br />
      <h2>Reviews:</h2>
      {user.reviews.map((r) => {
        return (
          <>
            {r}
            <br />
          </>
        );
      })}
      </div>
    </>
  );
}

export default ViewCourses;
