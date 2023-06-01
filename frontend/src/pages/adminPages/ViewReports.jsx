import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminCourse from '../../components/AdminCourse'
import Spinner from '../../components/Spinner'
import {viewAllReports,reset,viewUnseenReports,setStatus} from '../../features/admin/adminSlice'
import AdminReport from '../../components/AdminReport'


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

    const {  isLoading, isError, message, courses ,isSuccess,reports} = useSelector(
        (state) => state.admin
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }


        if (isSuccess) {
            toast.success(message)
        }

        if(!filtering){
            dispatch(viewAllReports())
            }else{
                dispatch(viewUnseenReports())
            }

        return () => {
            dispatch(reset())
        }
}, [user, navigate, dispatch,isError,message,filtering,flickering])



function viewAllReportsClick(){
    dispatch(viewAllReports())
        // setFlickering(prev=> !prev)
        setFiltering(false)
    
}



  function viewUnseenReportsClick(){
    dispatch(viewUnseenReports())
    setFiltering(true)

}


async function setStatusClick(id,status){
  await dispatch(setStatus({
      id:id,
      status:status
  }))
  setFlickering(prev => !prev)
}


const reportsList = reports.map(r => {
return(<>

  <AdminReport r={r} status={setStatusClick} />


  {/* <AdminCourse c={c} onChanged={changeDiscount} /> */}
  </>)
})
// "type": "financial",
// "title": "First Problem",
// "text": "Lorem",
// "status": "unseen",
// "issuerID": "638e407dc457af2d1255409c",
// "courseID": "635acd2e36a221bfaebcf130"

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
    <h1>Here is a list of all available reports: </h1>

          <button className='btn btn-block' onClick={viewAllReportsClick}>
              View All Reports
            </button>
            <button className='btn btn-block' onClick={viewUnseenReportsClick}>
              View Unseen Reports
            </button>

    {reportsList}
    </div>
    </>
  )
}

export default ViewCourses
