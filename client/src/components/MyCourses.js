import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from './firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import HeaderLearn from './HeaderLearn';


const MyCourses = ({currentUser}) => {

  const [courseData,setCourseData]=useState([])
  const [openMenu,setOpenMenu]=useState(false)

  const handleOpenMenu=(pass)=>{
      setOpenMenu(pass)
  }

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/courses`));
         setCourseData(querySnapshot.docs)
        }
        useEffect(() => {
            fetchData()
           }, [])
         
  return (
    <div>
               <HeaderLearn openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>


        {currentUser.uid!=="no user" ?
      
      <div>
<div className='flex mt-20 justify-around flex-wrap items-center'>
        {courseData[0] ? courseData.map((course)=>(
      <Link className='outline-none' key={course.id}  to={`/learn/courses/enrolled/${course.id}`}>
      <div  className='cursor-pointer hover:shadow-2xl transition-all duration-300 rounded-md w-72'>
      <div className='group flex justify-center  items-center relative cursor-pointer object-cover transition-all duration-300'>
          <div className='absolute h-10 w-10 hidden group-hover:flex justify-center items-center rounded-full bg-gray-100 opacity-60 '>
          <PlayArrowIcon fontSize='large'/>
          </div>
        <video className='w-72 object-cover outline-none' src={course.data().preview.videoUrl} alt={course.data().preview.videoName} />
        </div>
        <div className=' p-2 border'>
          <div className='flex justify-between  items-center'>
          <div className='flex text-base justify-center font-semibold items-center'>
          <CurrencyRupeeIcon fontSize='smal;'/>
          <h1>{course.data().coursePrice}</h1>
          </div>
          <div className='flex text-sm justify-center font-medium items-center'>
            <h1 className='mr-1'>15570</h1>
            <h1>(4.5)</h1>
          </div>
          </div>
          <div className='mt-2 flex flex-wrap text-lg font-medium'>
            <h1>{course.data().courseName && course.data().courseName}</h1>
          </div>
        </div>
      </div>
      </Link> 
        ))
        :
        <div>
        No courses available
      </div>
        
        }
       
      </div>
      </div>
      :
      <div>
        No courses available
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

export default MyCourses