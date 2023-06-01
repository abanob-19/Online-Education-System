import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminCourse from '../../components/AdminCourse'
import Spinner from '../../components/Spinner'
import {viewRequests,reset,viewUnseenReports,setStatus,viewAllReports,rejectRefundRequest,acceptRefundRequest} from '../../features/admin/adminSlice'
import AdminRefund from '../../components/AdminRefund'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


function ViewRefunds() {


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

    const {  isLoading, isError, message, courses ,isSuccess,reports,requests} = useSelector(
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

        dispatch(viewRequests())
            

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

async function rejectClick(id){

  confirmAlert({
    title: "Reject this request",
    message:
      "Are you sure you want to reject this request. You can not undo this action!",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          await dispatch(rejectRefundRequest({id:id}))
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

async function refundClick(id,amount,instructor){

  confirmAlert({
    title: "Refund an amount of "+amount,
    message:
      "Are you sure you refund this request. You can not undo this action!",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          await dispatch(acceptRefundRequest({
            id:id,
            amount:amount,
            instructor:instructor
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


const requestsList = requests.map(r => {
return(

  <>
  <AdminRefund r={r} reject={rejectClick} accept={refundClick}/>
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
    <h1>Here is a list of all refund requests: </h1>

    {requestsList}
    </div>
    </>
  )
}

export default ViewRefunds
