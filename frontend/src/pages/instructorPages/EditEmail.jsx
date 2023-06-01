import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import Spinner from "../components/Spinner";
import { editEmail } from "../../features/instructor/instructorSlice";

function EditEmail() {
 const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
  const [formData, setFormData] = useState({
    email: "",
    id: user?._id
   
  });

  const {email} = formData;

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

    dispatch(editEmail(formData));
  };

  if (isLoading) {
    //return <Spinner />;
  }

  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Please Enter your Email</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={onChange}
            />
          </div>
          

          <p></p>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Edit Email
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

export default EditEmail;