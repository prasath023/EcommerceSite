import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';  
import Header from './Header';
import { Link } from 'react-router-dom';
import Sell from '../Sell';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const Shop = ({currentUser}) => {
    const [openMenu,setOpenMenu]=useState(false)
    const [openProducts,setOpenProducts]=useState(true)
    const [openSettings,setOpenSettings]=useState(false)
    const [openOrders,setOpenOrders]=useState(false)
    const [orderData,setOrderData]=useState([])

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, `sellers/${currentUser.uid}/orders`));
         setOrderData(querySnapshot.docs)
        }

useEffect(() => {
  fetchData()
}, [openOrders])
    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }


  return (
    <div className='flex flex-col'>
     <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>
        
        <div className='flex justify-start items-start w-screen'>
            <div className='w-1/4 bg-gray-200 pl-10 h-screen sticky top-0 pt-20'>
                <ul>
                    <li onClick={()=>{
                        setOpenProducts(true)
                        setOpenSettings(false)
                        setOpenOrders(false)
                    }} className='mb-5 cursor-pointer'>
                    Products
                    </li>
                    <li onClick={()=>{
                        setOpenProducts(false)
                        setOpenSettings(false)
                        setOpenOrders(true)
                    }} className='mb-5 cursor-pointer'>
                    Orders
                    </li>
                    <li onClick={()=>{
                        setOpenProducts(false)
                        setOpenSettings(true)
                        setOpenOrders(false)
                    }} className='mb-5 cursor-pointer'>
                    Settings
                    </li>
                </ul>
            </div>
            <div className='w-4/5'>
            {
                openProducts &&
                <Sell currentUser={currentUser} />
            }

            {
                openOrders &&
                <div className=''>
                    {
                        orderData[0] &&
                        <ul className=''>
                            {orderData.map((order)=>
                               
                                    <li className=''>
                                        {order.data().buyer}
                                    </li>
                                
                            )}
                        </ul>
                        
                    }
                </div>
            }

            {
                openSettings &&
                <div>
                    
                </div>
            }
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

export default Shop