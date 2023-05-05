import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = ({currentUser}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/`; 
      navigate(path);
    }
    const handleEmail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value)
      }
      const handlePassword=(e)=>{
        e.preventDefault();
        setPassword(e.target.value)
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          currentUser.uid && routeChange() 
        })
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }

  return (
    <div className='flex justify-center items-center flex-col h-screen w-screen'>
         <form onSubmit={handleSubmit} className='flex flex-col'>
      <input onChange={handleEmail} placeholder="email" required className='border outline-none py-3 px-5 mb-5' name="email" type="email" /> <br />
      <input onChange={handlePassword} placeholder="password" required className='border outline-none py-3 mb-5 px-5' name="password" type="password" />  
      <button type='submit' onSubmit={handleSubmit} className='outline-none w-full bg-black mb-5 text-white py-2 font-medium' >SignIn</button>
    </form>
        <p>Create an account <Link className='outline-none' to="/signup"><span className='underline underline-offset-4 text-lg font-medium' >SignUp</span></Link></p>
    </div>
  )
}

export default Login