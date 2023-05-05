import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddCources from './components/AddCourses';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from './components/firebase';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Header from './components/Header';
import CloseIcon from '@mui/icons-material/Close';  
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeaderLearn from './components/HeaderLearn';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';


const Learn = ({currentUser}) => {
  const [courses,setCourses]=useState()
  const [openMenu,setOpenMenu]=useState(false)
  const [comments,setComments]=useState([])
  const [favKeys,setFavKeys]=useState([])
  const [favData,setFavData]=useState([])
  const [search,setSearch]=useState('')

  
async function fetchFav() {
  const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/favouriteCourse`));
   setFavData(querySnapshot.docs)
   setFavKeys(querySnapshot.docs.map(doc=>doc.id));
  }

  
  const handleSearchSubmit=(e)=>{
    e.preventDefault();
    // let keys=["productName","genre","description"]
    // let searchResponse=data.filter((item)=>item.data().tags.includes(search) || item.data().productName.toLowerCase().includes(search))
    // let searchd=data.filter((item)=>item.data().tags.includes(search))
    // console.log(searchd.map(c=>c.data()));
    // // item.data().description.toLowerCase().includes(search))
    // // item.data()..toLowerCase().includes(search))  || data.filter((item)=>
    // // item.data().description.toLowerCase().includes(search))
    // search && searchResponse && setSearchData(searchResponse)
    // setSearch("")
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





const addToFav=async(data)=>{
  const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "favouriteCourse")
        const ref= doc(colRef,data.id)
       
        await setDoc(ref, {
          courseName: data.data().courseName,
          coursePrice: data.data().coursePrice,
         
          descriptions: data.data().descriptions,
          reviews: data.data().reviews,
          topics: data.data().topics,
          
          sold:data.data().sold,
          comment:data.data().comment,
         enrolled:data.data().enrolled,
         level: data.data().level,
         tags: data.data().tags,
         preview: data.data().preview,
         whatLearn: data.data().whatLearn,
         whoLearn: data.data().whoLearn,
         courseProject: data.data().courseProject,
         requirements: data.data().requirements,
                   });
  }
  useEffect(() => {
    fetchFav()

   }, [])
   useEffect(() => {
    fetchFav()
  // handleFavData()

   }, [addToFav,removeFromFav])
  // async function fetchComments(id) {
  //   const querySnapshot = await getDocs(collection(db, `learning/${id}/comments`));
  //    return querySnapshot.docs.length
  //   }
    

  const handleOpenMenu=(pass)=>{
      setOpenMenu(pass)
  }
  const fetchCourses=async()=>{
    const q = query(collection(db,"learning"));
    const querySnapshot=await getDocs(q)
    setCourses(querySnapshot.docs)
}

useEffect(() => {
  fetchCourses()
}, [])


  return (
    <div className='flex justify-center flex-col items-center'>
          <HeaderLearn openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

    
      <div className='h-12 lg:h-14 bg-gray-200 shadow-inner flex lg:justify-end justify-center  w-screen  text-xs lg:text-sm items-center'>
      <div className=' lg:mr-5 '>
        <button type='text' className='outline-none hidden w-96 cursor-default focus:ring-inset  bg-white border-black border shadow-inner lg:flex justify-center items-center'>
          <input value={search} className=' py-2 outline-none w-80' onChange={(e)=>setSearch(e.target.value.toLowerCase())} placeholder='Search' type="text" />
          <SearchIcon fontSize='large' className='text-gray-600 hover:text-gray-900 transition-all duration-200 cursor-pointer' onClick={(e)=>handleSearchSubmit(e)}/>
        </button>
        <button type='text' className=' outline-none h-10 lg:hidden w-full cursor-default focus:ring-inset  bg-white border-black border shadow-inner flex justify-between px-3 items-center'>
          <input value={search} className='text-sm py-2 h-9 pl-2 outline-none w-3/4' onChange={(e)=>setSearch(e.target.value.toLowerCase())} placeholder='Search' type="text" />
          <SearchIcon fontSize='large' className='text-gray-600 hover:text-gray-900 transition-all duration-200 cursor-pointer' onClick={(e)=>handleSearchSubmit(e)}/>
        </button>
        </div>
      </div>
      <div className='w-full text-sm  mt-3 flex lg:hidden justify-end items-center'>
        <div  className='border cursor-pointer py-1 px-2 mr-5'>
        <FilterListIcon fontSize='small' className='mr-1'/> Filter
        </div>
       </div>
      <div className='flex lg:mt-12 mt-5 justify-between lg:px-12 px-3 w-screen flex-wrap items-center '>
        {courses && courses.map((course)=>(
      <div key={course.id} className=' hover:shadow-2xl transition-all w-44   lg:w-72 duration-300 rounded-md shadow-2xl mb-16'>
                <Link className='outline-none'   to={`/learn/courses/${course.id}`}><div className='group flex justify-center  items-center relative cursor-pointer object-cover transition-all duration-300'>
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
          <div className='cursor-pointer'>
          {favKeys.includes(course.id) ? <FavoriteIcon onClick={()=>{
                       removeFromFav(course)
                     }}/> :  <FavoriteBorderIcon onClick={()=>{
                       addToFav(course)
                     }}/> }
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
        ))}
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

export default Learn