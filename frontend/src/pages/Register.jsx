import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import "../CSS/login.css"


function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    gender:'male'
  })

  const { firstname,lastname, email,username, password, password2,gender } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/individualTrainee/home')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value

    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstname,
        lastname,
        email,
        username,
        password,
        gender
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='box-form'>
      <div className='center'>
      <section >
        <h1>
          <FaUser /> Register
        </h1>
        <p className="p1">Please enter all credentials</p>
      </section>

      <section className='center'>
        <form onSubmit={onSubmit}>
          <div >
            <input
              type='text'
              className='inputs'
              id='firstname'
              name='firstname'
              value={firstname}
              placeholder='First Name'
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type='text'
              className='inputs'
              id='lastname'
              name='lastname'
              value={lastname}
              placeholder='Last Name'
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type='email'
              className='inputs'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type='text'
              className='inputs'
              id='username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type='password'
              className='inputs'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type='password'
              className='inputs'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm Password'
              onChange={onChange}
            />
          </div>


        <p></p>
        <br/>
       
        <fieldset>
                <legend>Gender</legend>
          <div class="container">
            <ul className='ul1'>
              <li className='li1'>
            <input
              type="radio"
              
              id='male'
              name='gender'
              value="male"
              checked={formData.gender === "male"}
              onClick={onChange}
               />
            <label  htmlFor="full-time">Male</label>
            <div class="check"><div class="inside"></div></div>
            </li>
            <li>
            <input
              type="radio"
              id='female'
              name='gender'
              value="female"
              checked={formData.gender === "female"}
              onClick={onChange}
            />
            <label htmlFor="full-time">Female</label>
            <div class="check"><div class="inside"></div></div>
            </li>
            </ul>
        </div>
    
        <br/>
        </fieldset>

          <div className='center'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
            <br/>
            <p className="p2" style={{fontSize:'14px'}}>------------------ Already have an account? ------------------</p>
            <br/>
            <button className="btnGuest" onClick={() => navigate("/login")}>
             LogIn
         </button>
          </div>
        </form>
      </section>
    </div>
    
    </div>
  )
}

export default Register