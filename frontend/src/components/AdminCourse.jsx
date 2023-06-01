import React from 'react'
import { useState, useEffect } from 'react'

function AdminCourse({c,onChanged}) {
    // <div>AdminCourse</div>
    const [discount,setDiscount] = useState(c.discount? c.discount : 0)

      var number = 0;
  for (let i = 0; i < c.rating.length; i++) {
    number = number + parseInt(c.rating[i], 10);
  }
  number = Math.round((number / c.rating.length) * 10) / 10;


  const onChange = (e) => {
    setDiscount(e.target.value)
  }

  
    return (
    <div key={c._id}>
    -------------------------------------
    <h2>Title: {c.title}</h2>
    <h2>Hours: {c.hours}</h2>
    <h2>Rating:{number}</h2>
    <h2>Price:{c.price}</h2>
    <h2>Discount: {c.discount? c.discount : '0'} %</h2>
    <input
              type='number'
              className='form-control'
              id='discount'
              name='discount'
              value={discount}
              placeholder='Discount'
              onChange={onChange}
            />
    <button className='btn' onClick={() => {
 onChanged([c._id], discount)
    }}> Set Discount</button>
    <br/>
    </div>
    )
}

export default AdminCourse