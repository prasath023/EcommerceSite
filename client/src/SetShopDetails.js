import React, { Component, useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import CountriesSelect from "react-form-countries-select";
import { doc, setDoc } from 'firebase/firestore';
import { db } from './components/firebase';
import Header from './components/Header';
import CloseIcon from '@mui/icons-material/Close';



const SetShopDetails = ({currentUser}) => {

    const [countryName, setCountryName]=useState("India")
    const [storeName, setStoreName]=useState("")
    const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }
    // const handleSelect = (countryName) => {
    //         console.log(country)
    //         
    //         	
    //         
    //       }
    useEffect(() => {
        const getUserDetails=()=>{
          fetch("https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1")
          .then(res=>res.json())
          .then(data=> setCountryName(data.country_name)) 
        }
    
        getUserDetails()
        
      }, [])


    const shopDetails=async()=>{
        const ref= doc(db,"sellers",currentUser.uid)
      const email=currentUser.email
      const docRef= await setDoc(ref,{
        email:email,
        storeName,
        countryName,
      })
      setCountryName("");
      setStoreName("")
      }
     
      const handleCountryName=(name)=>{
            setCountryName(name)
      }

  return (
    <div>
     <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>


        <div className='w-screen h-screen flex items-center justify-center'>
       <div className='flex items-center border w-96  py-16 -mt-10 justify-center flex-col'>
       <input 
        onChange={(e) => setStoreName(e.target.value)} value={storeName}
        placeholder='shop name' className='px-4 py-2  border outline-none mb-8 h-12 w-72' type="text" />
       <input 
        onChange={(e) => setCountryName(e.target.value)} value={countryName}
        placeholder='shop country' className='px-4 py-2  border outline-none mb-8 h-12 w-72' type="text" />
       <Link to="/placeproduct" className='outline-none'> <div onClick={(e)=>shopDetails(e)} className='py-3 bg-blue-700 outline-none rounded-lg text-white px-7 cursor-pointer text-xl font-semibold'>Continue</div> </Link>
       </div>
      </div> 
      {openMenu &&
       <div className={`menu ${openMenu && "menuAnimation"} sticky w-screen bottom-0 bg-slate-400 z-50`}>
        <div  className='flex justify-end items-center pr-5 pt-5'>
            <CloseIcon onClick={()=>setOpenMenu(false)} className='cursor-pointer'/>
        </div>
        <ul className='flex items-center flex-col text-base text-left lg:text-sm mt-10'>
        <li className='mb-5'>
            <Link className='outline-none' to="/aboutus"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>About Us</button></Link>
          </li>
        <li className='mb-5'>
            <Link className='outline-none' to="/learn"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Workshops</button></Link>
          </li>
          <li className='mb-5'>
            <Link className='outline-none' to="/startshop"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Raw Materials</button></Link>
          </li>
          
          <li className='mb-5'>
            <Link className='outline-none' to="/buy"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Marketplace</button></Link>
          </li>
        </ul>
       </div>
       }
    </div>
  )
}

export default SetShopDetails