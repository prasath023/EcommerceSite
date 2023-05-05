import React, { useState } from 'react'
import Header from './Header'
import Swiper from './Swiper'
import "../css/Home.css"
import CloseIcon from '@mui/icons-material/Close';  
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeElements from './HomeElements';
import HomeElementsProduct from './HomeElementsProduct';
import Offer from './Offer';
import MostLiked from './MostLiked';


const Home = ({currentUser}) => {
  const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }

  return (
    <div className=''>
    <div className='w-screen  textTop lg:text-sm flex justify-center items-center py-2 text-gray-300 bg-gray-600'>
        Want to associate with us as vendor, creator or seller? <Link className='outline-none' to="/startshop"><h1 className='lg:ml-3 ml-1.5 hover:text-blue-500 underline underline-offset-2 cursor-pointer'>Enquire here</h1></Link>
    </div>
     
       {/* <div className='w-screen h-14  flex items-center justify-between'>
      <div className='w-1/5 flex items-center justify-center'>
        logo
      </div>
       <div className=' lg:mr-5 lg:w-4/5 px-10'>
        <button type='text' className='outline-none hidden w-full cursor-default rounded-2xl focus:ring-inset  bg-white border-black border shadow-inner lg:flex justify-between px-7 items-center'>
          <input  className=' py-2 outline-none w-4/5'  placeholder='Search' type="text" />
          <SearchIcon fontSize='large' className='text-gray-600 hover:text-gray-900 transition-all duration-200 cursor-pointer' />
        </button>
        <button type='text' className=' outline-none h-10 lg:hidden w-full cursor-default focus:ring-inset  bg-white border-black border shadow-inner flex justify-between px-3 items-center'>
          <input  className='text-sm py-2 h-9 pl-2 outline-none w-3/4'  placeholder='Search' type="text" />
          <SearchIcon fontSize='large' className='text-gray-600 hover:text-gray-900 transition-all duration-200 cursor-pointer' />
        </button>
        </div>
        <div className='w-1/5'>

        </div>
       </div> */}

       <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>
       <div className='homeDiv pb-10 border-b-2 border-black'>
       <Swiper currentUser={currentUser}/>
       </div>
       <HomeElements currentUser={currentUser}/>
       <HomeElementsProduct currentUser={currentUser}/>
       <Offer currentUser={currentUser}/>
       <MostLiked currentUser={currentUser}/>
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

export default Home