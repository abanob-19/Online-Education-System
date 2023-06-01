import React from 'react'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { useNavigate,Link ,useLocation} from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'

import { reportProblem, reset } from '../../features/instructor/instructorSlice'

function ReportProblem(){
      const navigate = useNavigate();
      const dispatch = useDispatch();
      // const location = useLocation();
      // const course_ID = location.state.courseID
      // const issuer_ID  = location.state.issuerID
    //   const subtitles = location.state.subtitles
    
      const { user} = useSelector(
        (state) => state.auth
      )
    
      const {isLoading, isError, isSuccess, message,currCourse, courses, } = useSelector(
        (state) => state.instructor
      )
      const [formData, setFormData] = useState({
        title :'',
        text:'',
        type:'',
        courseID:currCourse._id,
        issuerID:user._id
      })
      const { title,text,type} = formData
      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) {
            navigate('/login')
        }
        // if (!currCourse) {
        //     navigate('/corporateTrainee/home')
        // }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch,currCourse, courses ])

    const onSubmit = (e) => {
        e.preventDefault()
      }
    const onChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function OnClickreportProblem(){
        if(title===''  || text ===''  || type === ''){
            toast.error("Please enter all fields")
        }
        else{
        console.log(formData)
        toast.success("Report Submitted Successfuly")
        dispatch(reportProblem(formData))
        // dispatch(logOutReset())
        navigate('/instructor/home')
    }
}

    if(isLoading)
    return <Spinner />
  return (
    <>
    <br/>
    <div class="box-form" style={{"width":"1300px"}}>
     
      <section className="center">
         <h1 style={{"fontSize":"40px"}}>Report a Problem </h1>
       </section>
        <div className='form-group' style={{"paddingLeft":"80px","paddingRight":"80px"}}>
            <input
              type='text'
              className='inputs'
              id='title'
              name='title'
              value={title}
              placeholder='Title'
              onChange={onChange}
            />
          </div>
          <div className='form-group' 
                style={{"paddingLeft":"80px","paddingRight":"80px"}}>
            <input
              type='text'
              className='form-control'
              id='text'
              name='text'
              value={text}
              placeholder='Enter a brief description of the problem'
              style={{"height":"100px"}}
              onChange={onChange}
            />
          </div>
          <div className='form-group' style={{"paddingLeft":"80px","paddingRight":"80px"}}>
            <input
              type='text'
              className='form-control'
              id='type'
              name='type'
              value={type}
              placeholder='Type'
              onChange={onChange}
            />
          </div>

        <p></p>
        <br/>
        <div style={{"paddingLeft":"80px","paddingRight":"80px"}}>
            <button onClick={OnClickreportProblem} className='btn btn-block' >
              Submit Report
            </button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
    </div>
    </>
  )
}

export default ReportProblem
