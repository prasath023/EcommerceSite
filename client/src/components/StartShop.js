import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { db } from './firebase';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';  

const StartShop = ({currentUser}) => {
    const [ sellerData,setSellerData ]=useState(false)
    const [ user,setUser ]=useState([])

    // async function fetchData() {
    //     const querySnapshot = await getDocs(collection(db, `sellers/${currentUser.uid}/products`));
    //      setSellerData(querySnapshot.docs.map(doc=>doc.id))
    //      console.log(querySnapshot.docs.map(doc=>doc.id))
    //     }

     let navigate = useNavigate(); 
      const routeChange = () =>{ 
        let path = `/signin`;
        navigate(path);
      }
      
        const fetchData=async()=>{
          const q = query(collection(db,"sellers"));
          const querySnapshot=await getDocs(q)
         setSellerData(querySnapshot.docs.filter(doc=>doc.id===currentUser.uid))
      }
     
        useEffect(() => {
            fetchData()
           }, [currentUser])

           useEffect(() => {
            fetchData()
           }, [])

    console.log(sellerData);
   
    const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }

  return (
    <div>
     <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

        <div className='w-screen h-screen flex items-center -mt-10 justify-center flex-col'>
      <p className='text-5xl font-semibold text-center leading-normal'>Shoppers can’t wait to <br></br>see what you have in store</p>
     {
      currentUser==="no user" ?
      <div>
      <div onClick={()=>routeChange()} className='px-7 bg-blue-700 rounded-lg text-white py-3 cursor-pointer text-xl font-semibold mt-9 '>Get Started</div>
      </div>
      :
      <div>
         { sellerData[0] ? 
      <Link to="/shop"  className='outline-none'><div className='px-7 bg-blue-700 rounded-lg text-white py-3 cursor-pointer text-xl font-semibold mt-9 '>Get Started</div></Link>
      : 
      <Link to="/shopname" className='outline-none'><div className='px-7 bg-blue-700 rounded-lg text-white py-3 cursor-pointer text-xl font-semibold mt-9 '>Get Started</div></Link>
    
    }
      </div>
     }
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

export default StartShop