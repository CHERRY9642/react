import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const native=useNavigate();
  const change =()=>{
    native("/Signup")
  }

  return (
    <div>
        <h1>this is Home page</h1>
        <button  onClick={change}>Signup</button>
    </div>
  )
}

export default Home
