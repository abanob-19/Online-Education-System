import React from 'react'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'

import { addLinktoSubtitle, reset, logOutReset } from '../../features/instructor/instructorSlice'

function AddingSubtitle(){
      const navigate = useNavigate();
      const dispatch = useDispatch()
    
      const { user} = useSelector(
        (state) => state.auth
      )
    
      const {isLoading, isError, isSuccess, message,currCourse, courses, } = useSelector(
        (state) => state.instructor
      )
      const [formData, setFormData] = useState({
        title:currCourse.title,
        subtitles: '',
        link: '',
        description : ''
      })
      const { title,subtitles,link,description } = formData
      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) {
            navigate('/login')
        }
        if (!currCourse) {
            navigate('/instructor/home')
        }

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

    function addSubtitle(){
        if(subtitles===''  || link ===''  || description === ''){
            toast.error("Please enter all fields")
        }
        else{
        // console.log(formData)
        toast.success("Subtitle Added successfuly")
        dispatch(addLinktoSubtitle(formData))
        dispatch(logOutReset())
        navigate('/instructor/home')
    }
}

    if(isLoading)
    return <Spinner />
  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
    <h1>Add New Subtitle</h1>
    
        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='subtitle'
              name='subtitles'
              value={subtitles}
              placeholder='Subtitle'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='link'
              name='link'
              value={link}
              placeholder='Link'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              value={description}
              placeholder='Description'
              onChange={onChange}
            />
          </div>

        <p></p>
        <br/>
            <button onClick={addSubtitle} className='btn btn-block'>
              Add Subtitle
            </button>
            </div>
    </>
  )
}

export default AddingSubtitle