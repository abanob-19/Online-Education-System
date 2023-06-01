import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  
  const [home,setHome] = React.useState("hello");
  const [count,setCount] = React.useState(0);
  const [users,setUsers] = React.useState({});

function addCount(){
  setCount(prev => prev+1)
}

const navigate = useNavigate()

React.useEffect(() =>
{
navigate('/login')

  // setCount(188);
  // fetch("https://swapi.dev/api/people/1").then(res => res.json()).then(data => setUsers(data))
  // setCount(190);

},[])


  return (
    <>
    <div>Home</div>
    <h1>{home}</h1>
    <p>{JSON.stringify(users, null, 2)}</p>
    <h2>Compiled {count} times</h2>
    <button onClick={addCount}>Click Me</button>
    </>
  )
}

export default Home