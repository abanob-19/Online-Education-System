import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminCourse from '../../components/AdminCourse'
import Spinner from '../../components/Spinner'
import {viewCourseRequests,reset,viewUnseenReports,setStatus,viewAllReports,courseRequestResponse,acceptRefundRequest} from '../../features/admin/adminSlice'
import AdminRefund from '../../components/AdminRefund'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


function ViewCourseRequests() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [filtering,setFiltering] = useState(false)
    const [flickering,setFlickering] = useState(false)


    const [formData, setFormData] = useState({
      refundAmount: 0
      })

  const { refundAmount } = formData


    const { user } = useSelector(
        (state) => state.auth
    )

    const {  isLoading, isError, message, courses ,isSuccess,reports,requests,courseRequests} = useSelector(
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

        dispatch(viewCourseRequests())
            

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

const onChange = (e) => {
  const {name, value, type, checked} = e.target
  setFormData((prevState) => ({
    ...prevState,
    [name]: type === "checkbox" ? checked : value

  }))
}


async function setStatusClick(id,status){
  await dispatch(setStatus({
      id:id,
      status:status
  })) 
  setFlickering(prev => !prev)
}

async function rejectClick(InstructorID,courseID){

  confirmAlert({
    title: "Reject this request",
    message:
      "Are you sure you want to reject this request. You can not undo this action!",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          await dispatch(courseRequestResponse({
            instructorID:InstructorID,
            courseID:courseID,
            allow:false,
          }))
          await setFlickering(prev => !prev)
        },
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });



}

async function allowClick(InstructorID,courseID){

  confirmAlert({
    title: "Allow access",
    message:
      "Are you sure you accept this request. You can not undo this action!",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          await dispatch(courseRequestResponse({
            instructorID:InstructorID,
            courseID:courseID,
            allow:true,
          }))
          await setFlickering(prev => !prev)
        },
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });



}


const requestsList = courseRequests.map(r => {
return(

  <>
  {/* <AdminRefund r={r} reject={rejectClick} accept={refundClick}/> */}
  <h3>
  <b>{r.instructor.username}</b> has requested access to <b>{r.course.title}</b> 
  </h3>
  <button onClick={() => allowClick(r.instructor._id,r.course._id)}>Allow</button>
  <br></br>
  <button onClick={() => rejectClick(r.instructor._id,r.course._id)}>Reject</button>
  </>
/* <>
<b>{r.issuerID}</b> requests <b>{r.amount}</b> after viewimg <b>{r.percent} %</b> of the Course <b>{r.courseID}</b> 
{r.text && (<fieldset>
  <legend>Text</legend>
  {r.text}
</fieldset>)}
<br></br>
Refund Amount:
<input
              type='number'
              className='form-control'
              id='refundAmount'
              name='refundAmount'
              value={refundAmount}
              placeholder={r.amount}
              onChange={onChange}
            />
<button>Refund</button>
<button>Reject</button>
<br/>


</> */
)
})


    if(isLoading)
        return <Spinner/>

  return (
    <>
     <div className='box-form' style={{width:'1500px'}}>
    <h1>Here is a list of all course requests: </h1>

    {requestsList}
    </div>
    </>
  )
}

export default ViewCourseRequests
