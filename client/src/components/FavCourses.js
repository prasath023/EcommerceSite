import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import HeaderBuy from './HeaderBuy';
import HeaderLearn from './HeaderLearn';
const FavCourses = ({currentUser}) => {
    const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/signin`; 
      navigate(path);
    } 

    const [favData,setFavData]=useState([])

    async function fetchFav() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/favouriteCourse`));
         setFavData(querySnapshot.docs)
        }
        const removeFromFav=(product)=>{
            const docRef = doc(db, `users/${currentUser.uid}/favouriteCourse`, product.id);
           
            deleteDoc(docRef)
            .then(() => {
              console.log("Entire Document has been deleted successfully.")
          })
          .catch(error => {
              console.log(error);
          })

          }

          useEffect(() => {
            fetchFav()
          }, [])
          console.log(favData && favData);
          useEffect(() => {
              fetchFav()
            }, [removeFromFav])
          
  return (
    <div>
<HeaderLearn openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>
<div className='flex lg:mt-12 mt-5 justify-between lg:px-12 px-3 w-screen flex-wrap items-center '>
        {favData && favData.map((course)=>
      <div className=' hover:shadow-2xl transition-all w-44   lg:w-72 duration-300 rounded-md shadow-2xl mb-16'>
                <Link className='outline-none' key={course.id}  to={`/learn/courses/${course.id}`}><div className='group flex justify-center  items-center relative cursor-pointer object-cover transition-all duration-300'>
          <div className='absolute h-10 w-10 hidden lg:-z-50 group-hover:flex justify-center items-center rounded-full bg-gray-100 opacity-60 '>
          <PlayArrowIcon fontSize='small'/>
          </div>
          <div className='absolute h-10 w-10 hidden -z-50 lg:z-50 group-hover:flex justify-center items-center rounded-full bg-gray-100 opacity-60 '>
          <PlayArrowIcon fontSize='large'/>
          </div>
        <video className='lg:w-72 w-44 object-cover outline-none' src={course.data().preview.videoUrl} alt={course.data().preview.videoName} />
        </div></Link>
        <div className=' lg:pb-5 pb-3 lg:pt-3 pt-1 lg:px-3 px-2  border'>
          
        <Link className='outline-none' key={course.id}  to={`/learn/courses/${course.id}`}><div  className='mt-1  text-sm lg:text-lg font-semibold'>
            <h1>{course.data().courseName && course.data().courseName}</h1>
          </div></Link>
          <div className='mt-3 lg:block hidden'>
            <p className='text-xs '>
            {course.data().descriptions && course.data().descriptions[0].description.length > 120 ? (course.data().descriptions[0].description.slice(0,120)+"...") : course.data().descriptions[0].description}
            </p>
          </div>
          <div className='pl-2 lg:pr-5 pr-3 flex justify-between items-center'>
          <div className=' flex justify-start lg:my-4 my-2 items-center '>
            <h1 className=' lg:pr-2 pr-1 lg:text-sm text-sm font-medium border-slate-600'>
            {course.data().sold} 
            </h1>
            <h1 className="lg:text-sm text-xs  "> <span className=' lg:mr-1 '>({course.data().comment})</span></h1>
          </div>
          <div className='lgmr-3 text-xs lg:text-base bg-gray-200 cursor-pointer'>
          <h1 className='py-1 px-2' onClick={()=>{
                    removeFromFav(course)}}>Remove</h1>
          </div>
          </div>
          <div className='flex justify-start mt-2 items-baseline'>
          <div className='flex text-sm lg:text-lg lg:mr-2 mr-1  font-semibold items-baseline'>
          <CurrencyRupeeIcon fontSize='smal;'/>
          <h1>{course.data().coursePrice}</h1>
          </div>
          <div className='flex text-xs lg:text-base   items-baseline'>
          <CurrencyRupeeIcon fontSize='smal;'/>
          <h1 className='line-through'>2000</h1>
          </div>
          <div className='text-xs lg:text-sm lg:ml-3 ml-2 mb-1 flex items-baseline'>
            10% off
          </div>
          
          </div>
     <Link className='outline-none' key={course.id}  to={`/learn/courses/${course.id}`}>
          <div className='w-full flex justify-center items-center lg:py-2 py-1 lg:mt-4 mt-2 bg-black rounded-sm text-xs lg:text-base text-white lg:font-medium'>
            View course
          </div>
      </Link> 

        </div>
      </div>
        )}
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

export default FavCourses