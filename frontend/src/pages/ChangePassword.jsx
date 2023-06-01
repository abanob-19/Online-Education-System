import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import Spinner from "../components/Spinner";
import { changePassword } from "../features/auth/authSlice";

function ChangePassword() {
  const {id, token} = useParams()
  const [formData, setFormData] = useState({
    password: "",
    id: id,
    token: token
   
   
  });

  const {password} = formData;

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

    dispatch(changePassword(formData));
  };



  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      <section className="heading">
        <h1>
          <FaUser /> Change Password
        </h1>
        <p>Please Enter your New Password</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type = "password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            />
          </div>
          

          <p></p>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Change Password
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

export default ChangePassword;