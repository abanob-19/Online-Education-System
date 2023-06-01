import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminCourse from '../../components/AdminCourse'
import Spinner from '../../components/Spinner'
import {viewAllCourses,reset,viewAllCoursesFiltered,setDiscountCourses} from '../../features/admin/adminSlice'

function ViewCourses() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [filtering,setFiltering] = useState(false)
    const [flickering,setFlickering] = useState(false)


    const [formData, setFormData] = useState({
        subject: '',
        startPrice: null,
        endPrice: null,
        startRate:null,
        endRate:null,
      })

  const { subject,startPrice, endPrice ,startRate , endRate,discount} = formData

    const { user } = useSelector(
        (state) => state.auth
    )

    const {  isLoading, isError, message, courses ,isSuccess} = useSelector(
        (state) => state.admin
    )

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


        return () => {
            dispatch(reset())
        }
}, [user, navigate, dispatch,isError,message,filtering,flickering])



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

  async function changeDiscount(courseIDs, discount) {
    if(discount<0 || discount>100){
      toast.error("Discount must be between 0 and 100")
    }else{
    await dispatch(
      setDiscountCourses({
        courseIDs: courseIDs,
        discount: discount,
      })
    )
    setFlickering(prev=> !prev)
    }
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


const coursesList = courses.map(c => {
return(<>
  <AdminCourse c={c} onChanged={changeDiscount} />
  </>)
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

          <button className='btn btn-block' onClick={filterCoursesClick}>
              Filter
            </button>
            <button className='btn btn-block' onClick={removeFiltersClick}>
              Remove filters
            </button>

            <input
              type='number'
              className='form-control'
              id='discount'
              name='discount'
              value={discount}
              placeholder='Discount'
              onChange={onChange}
              // min="1" max="5"
            />
    <button className='btn' onClick={() => {
 changeDiscount(courses, discount)
    }}> Set Discount</button>

    {coursesList}
    </div>
    </>
  )
}

export default ViewCourses
