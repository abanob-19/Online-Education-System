import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Spinner from "../components/Spinner"; //../ means go back one step in the file system
import { getMostPopular } from "../features/auth/authSlice";

function mostPopularCourse() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { courses } = useSelector(
    (state) => state.auth
  );




  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login')
    }


  }, [user, isError, isSuccess, message, navigate, dispatch]);



  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(getMostPopular());
  };

  if (isLoading) {
    //return <Spinner />;
  }

  const coursesList = courses.map((c) => {
    return (
      <div key={c._id}>
        -------------------------------------
        <h2>Title: {c.title}</h2>
        <h2>Hours: {c.hours}</h2>
        <h2>Rating:{c.rating}</h2>
        <h2>Price:{c.price}</h2>
        <br />
      </div>
    );
  });

  if (isLoading) return <Spinner />;

  return (
    <>
<div class='box-form' style={{width:'1500px'}}>
      <section className="heading">
        <h1>
          <FaUser />
        </h1>
        <p>Most Popular Course</p>
      </section>

    
      <h1>Here is a list of the most popular courses: </h1>
      {coursesList}
      </div>
    </>

  );
}



export default mostPopularCourse;