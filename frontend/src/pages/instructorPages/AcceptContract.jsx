import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { accept, reset } from "../../features/instructor/instructorSlice";
import { updateUserInfo } from "../../features/auth/authSlice";

function AcceptContract() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function acceptClick() {
    await dispatch(accept(1));
    await dispatch(updateUserInfo());
    await navigate("/instructor/acceptPolicy");
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
    <div class='box-form' style={{width:'1500px'}}>
      <h1>Terms and Conditions</h1>
      <h2>PLEASE READ THESE TERMS CAREFULLY BEFORE USING THIS SITE</h2>
      <p>
        The materials on this website (the "Site") are provided by Advanced
        Micro Devices, Inc., and its subsidiaries ("AMD") as a service for its
        customers and may be used for personal and / or informational purposes
        only. When you access, browse or use this Site you accept, without
        limitation or qualification, the terms and conditions set forth below
        and any additional terms and conditions of use set forth in any
        sub-site. IF YOU DO NOT AGREE TO THEM, DO NOT USE THIS SITE OR DOWNLOAD
        MATERIALS FROM IT. Please note that when you enter any sub-site
        accessible through this homepage or any other page, such sub-site may
        have its own terms and conditions of use, which is specific to such
        sub-site. Notwithstanding the foregoing, a legally binding
        non-disclosure agreement between you and AMD shall supersede these Terms
        and Conditions of Use to the extent your use of AMD secure portals is
        within scope of such non-disclosure agreement.​
      </p>
      <h2> % taken by the company on each course uploaded</h2>
      <p>
        The company has the rights to take 10 % of the income gained by any
        instructor upon the registration of a registered trainee to his/her
        course. In case the course price is FREE the instructor will be rewarded
        with 1 $ for every trainee registration. In case of an Instructor's
        course getting refunded by a trainee registered to that course the
        refunded amount will be deducted from the balance of the Instructor's.
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

export default AcceptContract;
