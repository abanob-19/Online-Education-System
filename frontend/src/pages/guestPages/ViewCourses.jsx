import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import {viewAllCourses,viewAllCoursesFiltered} from '../../features/guest/guestSlice'


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

    const {  isLoading, isError, message, courses ,isSuccess} = useSelector(
        (state) => state.guest
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


}, [user, navigate, dispatch,isError,message,filtering,flickering])

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
  var number = 0;
  for (let i = 0; i < c.rating.length; i++) {
    number = number + parseInt(c.rating[i], 10);
  }
  number = Math.round((number / c.rating.length) * 10) / 10;
    return (
    <div key={c._id}>
    -------------------------------------
    <h2>Title: {c.title}</h2>
    <h2>Hours: {c.hours}</h2>
    <h2>Rating:{number}</h2>
    <h2>Price:{c.price}</h2>
    <h2>Course Preview:</h2>
    <iframe width="560" height="315" src={c.courseVideoPreview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <br/>
    </div>
    )
})




    if(isLoading)
        return <Spinner/>

  return (
    <>
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
          <label>Minimum Price: </label>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='startPrice'
              name='startPrice'
              value={startPrice}
              placeholder='Free'
              onChange={onChange}
            />
          </div>
          <label>Maximum Price: </label>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='endPrice'
              name='endPrice'
              value={endPrice}
              placeholder='No upper bound'
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
    </>
  )
}

export default ViewCourses