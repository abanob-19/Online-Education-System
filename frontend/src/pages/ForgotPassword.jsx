import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import Spinner from "../components/Spinner";
import { forgotPassword } from "../features/auth/authSlice";

function ForgotPassword() {
 
  const [formData, setFormData] = useState({
    email: "",
   
   
  });

  const {email} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  


  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(formData));
  };



  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <section className="heading">
        <h1>
          <FaUser /> Forgot Password
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
              Send Email
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

export default ForgotPassword;