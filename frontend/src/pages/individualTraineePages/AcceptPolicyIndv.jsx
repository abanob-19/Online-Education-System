import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { acceptPolicy } from "../../features/individualTrainee/individualTraineeSlice";
import { setOnboarding, updateUserInfo } from "../../features/auth/authSlice";

function AcceptPolicyIndv() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function acceptClick() {
    await dispatch(acceptPolicy(1));
    await dispatch(updateUserInfo());
    await dispatch(setOnboarding(1));
    await navigate("/individualTrainee/home");
  }
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const { user } = useSelector((state) => state.auth);

  //   const { isLoading, isError, message, allCourses, isSuccess } = useSelector(
  //     (state) => state.instructor
  //   );

  //   useEffect(() => {
  //     if (isError) {
  //       toast.error(message);
  //     }

  //     if (!user) {
  //       navigate("/register");
  //     }

  //     // dispatch(viewMyCourses())

  //     if (isSuccess) {
  //       toast.success(message);
  //     }

  //     return () => {
  //       dispatch(reset());
  //     };
  //   }, [user, navigate, dispatch, isSuccess, isError, message]);

  //   //   const coursesList = allCourses.map((c) => {
  //   //     return (
  //   //       <div key={c._id}>
  //   //         -------------------------------------
  //   //         <h2>Title: {c.title}</h2>
  //   //         <h2>Hours: {c.hours}</h2>
  //   //         <h2>Rating:{c.rating}</h2>
  //   //         <h2>Price:{c.price}</h2>
  //   //         <br />
  //   //       </div>
  //   //     );
  //   //   });

  //   if (isLoading) return <Spinner />;

  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
      <h1>Refund Policy</h1>
      <p>
        Thank you for buying our courses. We ensure that our users have a
        rewarding experience while they discover, assess, and purchase our
        courses, whether it is instructor-led or self-paced training. As with
        any online purchase experience, there are terms and conditions that
        govern the Refund Policy. When you buy a training course on Panorama
        India Consultancy, you agree to our Privacy Policy, Terms of Use and
        refund policy.
        <br />
        Our refund policy is as follows:
      </p>
      <h2>Cancellation & Refunds: Online Training</h2>
      <h2>For Self Placed Learning:</h2>
      <p>
        Raise refund request within 2 days of purchase of course. Money back
        guarantee is void if the participant has accessed the content or
        downloaded the E-Book. Any refund request beyond 2 days of purchasing
        the course will not be accepted and no refund will be provided.
      </p>
      <h2>For Instructor Led Training:</h2>
      <p>
        Raise refund request within 2 days of purchase of course. Money back
        guarantee is void if the participant has accessed the content of any
        e-learning course or has attended Online Classrooms/received recordings.
        Also, In case a user downloads the E-Book for the course the money back
        guarantee will be void. Any refund request beyond 2 days of purchasing
        the course will not be accepted and no refund will be provided.
      </p>
      <h2>Refund request can be initiated in one way</h2>
      <p>
        In case item quantity is more than one, please reach out to our team
        through our email mentioned on the website or call us.
      </p>
      <h2>Refunds: Duplicate payment</h2>
      <p>
        Refund of the duplicate payment made by the delegate will be processed
        via the same source (original method of payment) in 10 working days post
        intimation by the customer.
      </p>
      <br />
      <button onClick={acceptClick} className="btn btn-block">
        {" "}
        Accept{" "}
      </button>
      </div>
    </>
  );
}

export default AcceptPolicyIndv;