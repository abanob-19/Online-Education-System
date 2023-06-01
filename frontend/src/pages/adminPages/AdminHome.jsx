import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../../components/Spinner'
import { addAdmin,addInstructor,addCorporateTrainee, reset} from '../../features/admin/adminSlice'


function AdminHome() {
  

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user} = useSelector(
    (state) => state.auth
  )

  const {isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  )

 
  
  useEffect(() => {
    if(!user || user.role !== 'Admin')
    navigate('/')

    if(isSuccess){
      toast.success("User added successfuly")
      setFormData({
        username:'',
        password:'',
      })
    }

    if (isError) {
      toast.error(message)
    }
  
  dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
React.useEffect(() =>
{
  // setCount(188);
  // fetch("https://swapi.dev/api/people/1").then(res => res.json()).then(data => setUsers(data))
  // setCount(190);

},[])

const onChange = (e) => {
  const {name, value, type, checked} = e.target
  setFormData((prevState) => ({
    ...prevState,
    [name]: type === "checkbox" ? checked : value

  }))
}

const onSubmit = (e) => {
  e.preventDefault()

  // dispatch(login(formData))
}

function addAdminf(){
  dispatch(addAdmin(formData))
  }

  function addInstructorf(){
  dispatch(addInstructor(formData))

  }

  function addCorporateTraineef(){
    dispatch(addCorporateTrainee(formData))

  }

  if(isLoading)
    return <Spinner />
  return (
    <>
     <div className='box-form' style={{width:'1500px'}}>
    <h1>Admin Home</h1>
    
          
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </div>

        <p></p>
        <br/>

            <button onClick={addAdminf} className='btn btn-block'>
              Add as another Admin
            </button>
            <button onClick={addInstructorf} className='btn btn-block'>
              Add as an Instructor
            </button>
            <button onClick={addCorporateTraineef} className='btn btn-block'>
              Add as a Corporate Trainee
            </button>
            <button onClick={() => navigate('/admin/viewCourses')} className='btn btn-block'>
              View All courses
            </button>
            <button onClick={() => navigate('/admin/viewReports')} className='btn btn-block'>
              View reports
            </button>
            <button onClick={() => navigate('/admin/viewRefunds')} className='btn btn-block'>
              View Refund Requests
            </button>
            <button onClick={() => navigate('/admin/viewCourseRequests')} className='btn btn-block'>
              View Course Requests
            </button>


</div>
    </>
  ) 
}

export default AdminHome