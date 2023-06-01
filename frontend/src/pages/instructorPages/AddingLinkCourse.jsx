import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../../components/Spinner'
import { viewMyCourses, reset ,viewAllCourses } from '../../features/instructor/instructorSlice'
import InstructorCourse from '../../components/InstructorCourse'

// import { addAdmin,addInstructor,addCorporateTrainee, reset} from '../../features/admin/adminSlice'

function AddingLinkCourse() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(
        (state) => state.auth
    )

    const { courses, isLoading, isError, message, currCourse,isSuccess,currExam } = useSelector(
        (state) => state.instructor
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(viewMyCourses())


        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch,currCourse,currExam])


    async function viewAllCoursesClick() {
        await dispatch(viewAllCourses(1))
        navigate('/instructor/viewCourses')
    }

    if (isLoading)
        return <Spinner />

     
     const coursesArr = courses.map(c=>{
       
            return (
                <InstructorCourse key={c._id} course={c} />
            )
            console.log(courses)
        
           
        })
    return (

        <>
        <div class='box-form' style={{width:'1500px'}}>
            <h1>Here is a list of your courses:</h1>
            {coursesArr}
             <button onClick={viewAllCoursesClick}> View All Courses </button>
             </div>
        </>
    )
}

export default Home