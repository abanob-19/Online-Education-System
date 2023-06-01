import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Spinner from "../../components/Spinner"; //../ means go back one step in the file system
import { searchMyCourses } from "../../features/instructor/instructorSlice";

function SearchMyCourses() {
 const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
      const { courses } = useSelector(
        (state) => state.instructor
      );
  const [formData, setFormData] = useState({
    searchQuery: "",
    
   
  });

  const {searchQuery} = formData;

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(searchMyCourses(formData));
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
        <p>Search</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="searchCourse"
              name="searchQuery"
              value={searchQuery}
              placeholder="Search Course"
              onChange={onChange}
            />
          </div>
          

          <p></p>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Search Course
            </button>
          </div>
        </form>
      </section>

      <h1>Here is a list of all available courses: </h1>
      {coursesList}
      </div>
    </>

  );
}



export default SearchMyCourses;