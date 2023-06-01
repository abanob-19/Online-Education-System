import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import Spinner from "../components/Spinner";
import { coursePromo, editBio, editEmail } from "../../features/instructor/instructorSlice";

function EditPromo() {
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
  const [formData, setFormData] = useState({
    promotion: "",
    deadline: "",
    id: user._id
   
  });

  const {promotion, deadline} = formData;

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

    dispatch(coursePromo(formData));
  };

  if (isLoading) {
    //return <Spinner />;
  }

  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <section className="heading">
        <h1>
          <FaUser /> 
        </h1>
        <p>Please Add Promotion</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="promotion"
              name="promotion"
              value={promotion}
              placeholder="promotion"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type= "datetime-local"
              className="form-control"
              id="deadline"
              name="deadline"
              value={deadline}
              placeholder="deadline"
              onChange={onChange}
            />
          </div>
          

          <p></p>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add Promotion
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

export default EditPromo;