import React from 'react'
import { useState, useEffect } from 'react'




function AdminRefund({r,reject,accept}) {


  const [formData, setFormData] = useState({
    refundAmount: r.amount
    })

const { refundAmount } = formData

  const onChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
  
    }))
  }

  return (
    // <div onClick={()=>click(r.title)}>
    <>
    <b>{r.userName}</b> requests <b>{r.amount}</b> after viewimg <b>{r.percent} %</b> of the Course <b>{r.courseName}</b> 
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
                  placeholder="Refund Amount"
                  onChange={onChange}
                />
    <button onClick={() => accept(r._id,refundAmount,r.issuerID)} >Refund</button>
    <button onClick={() => reject(r._id)}>Reject</button>
    <br/>
    
    
      </>

  )
}

export default AdminRefund