import React from 'react'




function AdminReport({r,status}) {



  return (
    // <div onClick={()=>click(r.title)}>
    <div>
    Title: {r.title}
  <br/>
  Status: {r.status}
  <br/>
  Type: {r.type}
  <br/>
  Issued By: {r.issuerID}
  <br/>
  Concerning the course: {r.courseID}
  <br/>
  <fieldset>
  <legend>Text</legend>
  {r.text}
  </fieldset>
  Mark as: <br/>
  {r.status!=="Pending" && (<button onClick={() => status(r._id,"Pending")}>Pending</button>)}
  {r.status!=="Resolved" && (<button onClick={() => status(r._id,"Resolved")}>Resolved</button>)}
  <br/>
  <br/>
  </div>

  )
}

export default AdminReport