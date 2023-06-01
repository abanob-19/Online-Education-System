import React from 'react'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'

import { addCourse,addLinkToCourse, reset, logOutReset } from '../../features/instructor/instructorSlice'

function AddingCourse(){
      const navigate = useNavigate();
      const dispatch = useDispatch()
    
      const { user} = useSelector(
        (state) => state.auth
      )
    
      const {isLoading, isError, isSuccess, message, courses, } = useSelector(
        (state) => state.instructor
      )
      const [formData, setFormData] = useState({
        title:'',
        price: '',
        hours: '',
        summary : '',
        subject:'',
        courseVideoPreview:''
      })
      const { title, price , hours, summary, subject,courseVideoPreview} = formData
      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) {
            navigate('/login')
        }
        // if (!currCourse) {
        //     navigate('/instructor/home')
        // }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch, courses ])

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

    function addcourse(){
        if(title ===''|| price==='' || hours==='' ||summary===''||subject===''||courseVideoPreview===''){
            toast.error("Please enter all fields")
        }
        else{
        // console.log("loooooogggg" + formData)
        toast.success("Course Added successfuly")
        dispatch(addCourse(formData))
        const {title , courseVideoPreview} = formData
        // dispatch(addLinkToCourse({title,courseVideoPreview }))
        dispatch(logOutReset())
        navigate('/instructor/home')
    }
}

    if(isLoading)
    return <Spinner />
  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
    <h1>Add New Course</h1>
    
        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={title}
              placeholder='Title'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='price'
              name='price'
              value={price}
              placeholder='Price'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='hours'
              name='hours'
              value={hours}
              placeholder='Hours'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='summary'
              name='summary'
              value={summary}
              placeholder='Summary'
              onChange={onChange}
            />
          </div>
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
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='courseVideoPreview'
              name='courseVideoPreview'
              value={courseVideoPreview}
              placeholder='Course Video Preview'
              onChange={onChange}
            />
          </div>

        <p></p>
        <br/>
            <button onClick={addcourse} className='btn btn-block'>
              Add Course
            </button>
            </div>
    </>
  )
}

export default AddingCourse