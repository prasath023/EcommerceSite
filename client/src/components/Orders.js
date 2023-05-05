import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from './firebase';
import Header from './Header';
import OrderedProducts from './OrderedProducts';
import CloseIcon from '@mui/icons-material/Close';  

const Orders = ({currentUser}) => {
 const [orderData,setOrderData]=useState([])

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/orders`));
         setOrderData(querySnapshot.docs)
        }

useEffect(() => {
  fetchData()
}, [])

const [openMenu,setOpenMenu]=useState(false)

const handleOpenMenu=(pass)=>{
    setOpenMenu(pass)
}

  return (
    <div>
     <Header  openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>
      
        {
            orderData &&
            <div className='w-screen flex flex-col lg:pl-32 pt-10 px-3 lg:pt-16 justify-center'>
                {
                    orderData.map((product)=>
                          <div className='border lg:w-2/4 mb-10 p-2 lg:p-4 bg-slate-100 rounded-md'>
                           
                          <OrderedProducts  data={product} />

                          </div>
                    )
                }
            </div>
        }
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

export default Orders