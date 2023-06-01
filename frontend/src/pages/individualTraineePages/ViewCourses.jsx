import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import {
  viewAllCourses,
  reset,
  registerCourse,
  viewAllCoursesFiltered,
  rateCourses,
} from "../../features/individualTrainee/individualTraineeSlice";
import { updateUserInfo } from "../../features/auth/authSlice";
import StripeContainer from "../../components/StripeContainer";

function ViewCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filtering, setFiltering] = useState(false);
  const [flickering, setFlickering] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [popularity, setPopularity] = useState(false);
  // const [usingWallet,setUsingWallet] = useState(false)

  const [formData, setFormData] = useState({
    subject: "",
    startPrice: null,
    endPrice: null,
    startRate: null,
    endRate: null,
  });

  const { subject, startPrice, endPrice, startRate, endRate } = formData;

  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, message, courses, isSuccess } = useSelector(
    (state) => state.individualTrainee
  );

  var bool = !courses;
  const [payingList, setPayingList] = React.useState([]);
  if (bool) {
    var help = new Array(courses.length + 1);
    for (let i = 0; i < help.length; i++) {
      help[i] = false;
    }
    setPayingList(help);
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    // dispatch(viewMyCourses())

    if (isSuccess) {
      // toast.success(message)
    }

    if (!filtering) {
      dispatch(viewAllCourses());
    } else {
      dispatch(
        viewAllCoursesFiltered({
          subject: subject,
          startPrice: startPrice,
          endPrice: endPrice,
          startRate: startRate,
          endRate: endRate,
        })
      );
    }

    if (courses && courses.length != 0) {
      if (payingList.length === 0) {
        var help = new Array(courses.length + 1);
        for (let i = 0; i < help.length; i++) {
          help[i] = false;
        }
        setPayingList(help);
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message, filtering, flickering]);

  async function registerCourseClick(courseID) {
    await dispatch(
      registerCourse({
        courseID: courseID,
      })
    );
    await dispatch(updateUserInfo(1));
  }

  async function registerCourseClick2(cid, price, index) {
    var help = payingList;
    if (courses && courses.length != 0) {
      if (payingList.length === 0) {
        help = new Array(courses.length + 1);
        for (let i = 0; i < help.length; i++) {
          help[i] = false;
        }
        setPayingList(help);
      }
    }

    if (price == 0) {
      registerCourseClick(cid);
    } else {
      for (let i = 0; i < help.length; i++) {
        help[i] = payingList[i];
        if (i == index) {
          help[i] = !payingList[i];
        }
      }
      setPayingList(help);
      console.log(payingList);
      setFlickering((prev) => !prev);
    }
  }

  function rateCourseClick(course_id) {
    dispatch(
      rateCourses({
        course_id: course_id,
        newRating: rating,
      })
    );
  }

  function popularityClick() {
    setPopularity(prev=> !prev);
  }



  const [rating, setRating] = useState(0);

  function filterCoursesClick() {
    if (
      subject === "" &&
      (startPrice === null || startPrice === "") &&
      (endPrice === null || endPrice === "") &&
      (startRate === null || startRate === "") &&
      (endRate === null || endRate === "")
    ) {
      dispatch(viewAllCourses());
    } else {
      setFlickering((prev) => !prev);
      setFiltering(true);
    }
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function removeFiltersClick() {
    setFormData({
      subject: "",
      startPrice: null,
      endPrice: null,
      startRate: null,
      endRate: null,
    });
    dispatch(viewAllCourses());
  }

  const handleChange = () => {
    // setUsingWallet(prev => !prev)
  };

  let h = [...courses];
  if(popularity){
  h.sort(function(s1,s2){
    return s2.numOfTrainees-s1.numOfTrainees;
  })
}

  const coursesList = h.map((c, index) => {
    if (c.closed) {
      return;
    }

    var alreadyRegistered = false;
    for (let i = 0; i < user.registeredCourses.length; i++) {
      if (user.registeredCourses[i] == c._id) {
        alreadyRegistered = true;
        break;
      }
    }

    var number = 0;
    for (let i = 0; i < c.rating.length; i++) {
      number = number + parseInt(c.rating[i], 10);
    }
    number = Math.round((number / c.rating.length) * 10) / 10;
    var pricex = c.price;
    var discounted = false;
    if (c.discount != 0 && c.price != 0) {
      pricex = Math.round(c.price * (1 - parseInt(c.discount, 10) / 100.0));
      discounted = true;
    }
    var pricex2 = pricex;
    // if(usingWallet){
    //   pricex2 = pricex-user.wallet
    // }

    index++;
    return (
      <div key={c._id}>
        -------------------------------------
        <h2>Title: {c.title}</h2>
        <h2>Hours: {c.hours}</h2>
        <h2>Rating:{number}</h2>
        {discounted && (
          <>
            <h2>
              Price:
              <p style={{ textDecorationLine: "line-through" }}>
                was {c.price}{" "}
              </p>
            </h2>
            <h2>
              now:{Math.round(c.price * (1 - parseInt(c.discount, 10) / 100.0))}
            </h2>
            <h2>Discount: {c.discount} %</h2>
          </>
        )}
        {!discounted && (
          <>
            <h2>Price: {c.price}</h2>
          </>
        )}
        {/* { (!alreadyRegistered && payingList[index] && pricex!=0) &&
     (<>Use wallet credit ({user.wallet? user.wallet : 0}):
      <label>
        <input
          type="checkbox"
          checked={usingWallet}
          onChange={handleChange}
        />
      </label>
     
     
      </>
     
     )} */}
        {!alreadyRegistered && payingList[index] && pricex2 > 0 && (
          <StripeContainer
            amount={pricex2 * 100}
            traineeID={user.token}
            method={() => registerCourseClick(c._id)}
            startLoad={() => setPayLoading(true)}
            endLoad={() => setPayLoading(false)}
          />
        )}
        {!alreadyRegistered && (
          <button
            className="btn"
            onClick={() => {
              registerCourseClick2(c._id, pricex2, index);
            }}
          >
            {" "}
            {!payingList[index] ? "Register to this course" : "Cancel"}{" "}
          </button>
        )}
        {alreadyRegistered && <h3>You are registered to this course</h3>}
        <br />
        <h2>Course Preview:</h2>
      <iframe width="560" height="315" src={c.courseVideoPreview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


      </div>
    );
  });

  // const examsDisplay = exams.map(q => {
  //     return (
  //         <div key={q.number}>
  //         </div>
  //     )
  // })

  if (isLoading || payLoading) return <Spinner />;

  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
      <h1>Here is a list of all available courses: </h1>
      <label>Subject:</label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subject}
          placeholder="Subject"
          onChange={onChange}
        />
      </div>
      <label>Minimum Price: </label>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          id="startPrice"
          name="startPrice"
          value={startPrice}
          placeholder="Free"
          onChange={onChange}
        />
      </div>
      <label>Maximum Price: </label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="endPrice"
          name="endPrice"
          value={endPrice}
          placeholder="No upper bound"
          onChange={onChange}
        />
      </div>
      <label>Minimum Rate: </label>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          id="startRate"
          name="startRate"
          value={startRate}
          placeholder="Min rate"
          onChange={onChange}
        />
      </div>
      <label>Maximum Rate: </label>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="endRate"
          name="endRate"
          value={endRate}
          placeholder="Max rate"
          onChange={onChange}
        />
      </div>

      <button className="btn" onClick={filterCoursesClick}>
        Filter
      </button>
      <button className="btn" onClick={removeFiltersClick}>
        Remove filters
      </button>
      <button className="btn" onClick={popularityClick}>
        Sort by {popularity? "date of addition":"popularity"}
      </button>

      {coursesList}
      </div>
    </>
  );
}

export default ViewCourses;
