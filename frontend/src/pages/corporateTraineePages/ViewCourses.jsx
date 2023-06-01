import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import {viewAllCourses,reset,registerCourse,viewAllCoursesFiltered,viewMyRequests,requestCourse} from '../../features/corporateTrainee/corporateTraineeSlice'
import {updateUserInfo} from '../../features/auth/authSlice'


function ViewCourses() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [filtering,setFiltering] = useState(false)
    const [flickering,setFlickering] = useState(false)
    const [popularity, setPopularity] = useState(false);


    const [formData, setFormData] = useState({
        subject: '',
        startPrice: null,
        endPrice: null,
        startRate:null,
        endRate:null,
      })

  const { subject,startPrice, endPrice ,startRate , endRate} = formData

    const { user } = useSelector(
        (state) => state.auth
    )

    const {  isLoading, isError, message, courses ,isSuccess,requests} = useSelector(
        (state) => state.corporateTrainee
    )


    
function filterCoursesClick(){
    if(subject==='' && (startPrice === null || startPrice === '') && (endPrice ===null || endPrice === '') 
    && (startRate ===null || startRate === '') && (endRate ===null || endRate === '')){
    dispatch(viewAllCourses())
    }else{
        setFlickering(prev=> !prev)
        setFiltering(true)
    }
}

const onChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value

    })) 
  }

  function removeFiltersClick(){
    setFormData({
    subject: '',
    startPrice: null,
    endPrice: null,
    startRate:null,
    endRate:null,
    })
    dispatch(viewAllCourses())
}


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        // dispatch(viewMyCourses())

        if (isSuccess) {
            toast.success(message)
        }

        if(!filtering){
            dispatch(viewAllCourses())
            }else{
                dispatch(viewAllCoursesFiltered({
                    subject:subject,
                    startPrice:startPrice,
                    endPrice:endPrice,
                    startRate:startRate,
                    endRate:endRate,
                }
                ))
            }

        dispatch(viewMyRequests())


        return () => {
            dispatch(reset())
        }
}, [user, navigate, dispatch,isError,message,filtering,flickering])


async function requestCourseClick(courseID) {
    await dispatch(requestCourse({
        courseID:courseID,
        issuerID:user._id,
    }))
    setFlickering(prev => !prev)
}

function popularityClick() {
  setPopularity(prev=> !prev);
}

let h = [...courses];
if(popularity){
h.sort(function(s1,s2){
  return s2.numOfTrainees-s1.numOfTrainees;
})
}

const coursesList = h.map(c => {
  if(c.closed){
    return;
  }
    var alreadyRegistered = false
    for(let i =0;i<user.registeredCourses.length;i++){
        if(user.registeredCourses[i]==c._id){
            alreadyRegistered= true
            break
        }
        
    }

    var alreadyRequested = false
    for(let i =0;i<requests.length;i++){
      if(requests[i].courseID==c._id){
        alreadyRequested= true
        break
      }
    }

    var number = 0;
  for (let i = 0; i < c.rating.length; i++) {
    number = number + parseInt(c.rating[i], 10);
  }
  number = Math.round((number / c.rating.length) * 10) / 10;

    return (
    <div key={c._id}>
    
    <h2>Title: {c.title}</h2>
    <h2>Hours: {c.hours}</h2>
    <h2>Rating:{number}</h2>
    {(!alreadyRegistered && !alreadyRequested)&& (<button className='btn' onClick={() => {requestCourseClick(c._id)}}> Request access to this course </button>)}
    {alreadyRegistered && (<h3>You are registered to this course</h3>)}
    {alreadyRequested && (<h3>Your request to this course is pending</h3>)}
    <br/>
    <h2>Course Preview:</h2>
    <iframe width="560" height="315" src={c.courseVideoPreview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    )
})

// const examsDisplay = exams.map(q => {
//     return (
//         <div key={q.number}>
//         </div>
//     )
// })



    if(isLoading)
        return <Spinner/>

  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
    <h1>Here is a list of all available courses: </h1>
    <label>Subject:</label>
            <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='subject'
              name='subject'
              value={subject}
              placeholder='Subject'
              onChange={onChange}
            />
          </div>
          <label>Minimum Rate: </label>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='startRate'
              name='startRate'
              value={startRate}
              placeholder='Min rate'
              onChange={onChange}
            />
          </div>
          <label>Maximum Rate: </label>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='endRate'
              name='endRate'
              value={endRate}
              placeholder='Max rate'
              onChange={onChange}
            />  
          </div>

          <button className='btn' onClick={filterCoursesClick}>
              Filter
            </button>
            <button className='btn' onClick={removeFiltersClick}>
              Remove filters
            </button>
            <button className="btn" onClick={popularityClick}>
        Sort by {popularity? "date of addition":"popularity"}
        </button>

    
    {coursesList}
    </div>
    </>
  )
}

export default ViewCourses