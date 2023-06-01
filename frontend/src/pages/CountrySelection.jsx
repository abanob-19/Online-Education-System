import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import Spinner from "../components/Spinner";
import { selectCountry } from "../features/auth/authSlice";

function SelectCountry() {
 const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
  const [formData, setFormData] = useState({
    country: ""
   
  });

  const {country} = formData;

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

    dispatch(selectCountry(formData));
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
        <p>Please Enter your Country</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={country}
              placeholder="country"
              onChange={onChange}
            />
          </div>
          

          <p></p>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Select Country
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

export default SelectCountry;