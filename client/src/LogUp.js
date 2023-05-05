import { Link } from "react-router-dom";
import React, { useState } from 'react'
const LogUp = (signUpComponent) => {
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  console.log(signUpComponent);

      const handleEmail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value)
      }
      const handlePassword=(e)=>{
        e.preventDefault();
        setPassword(e.target.value)
      }
      const handleUserName=(e)=>{
        e.preventDefault();
        setUserName(e.target.value)
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        // signUp(email,password,userName)
      }

  return (
    <div className='flex justify-center items-center flex-col h-screen w-screen'>
    {/* {error && <div className='text-red-400'>{error}</div>} */}
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <input onChange={handleUserName} className='border outline-none py-3 px-5 mb-5' name="username" type="text" placeholder=''  /> <br />
      <input onChange={handleEmail} className='border outline-none py-3 px-5 mb-5' name="email" type="email" placeholder=''  /> <br />
      <input onChange={handlePassword} className='border outline-none py-3 mb-5 px-5' name="password" type="password" placeholder=''  />  
      <button type="submit" onSubmit={handleSubmit} className='outline-none w-full bg-black mb-5 text-white py-2 font-medium' >SignUp</button>
    </form>
    <p>Already having an account <Link className='outline-none' to="/signin"><span className='underline underline-offset-4 text-lg font-medium' >SignIn</span></Link></p>
</div>
  )
}
export default LogUp