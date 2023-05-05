import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';  
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';

const HomeElements = ({currentUser}) => {
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
  
    let data={}
  return (
    <div className=' flex justify-center mb-10 w-full items-center flex-col'>
        <div className='flex justify-center w-full  items-center flex-col'>
            <h1 className='text-3xl font-semibold py-10'>Workshops</h1>
            <div className='w-full'>
            <div className='flex w-full items-center justify-around'>
                {
                    courses && courses.map((course)=>
                    <div className='py-2 flex justify-center flex-wrap w-80 flex-col items-center rounded-2xl bg-gray-100'>
                    <h1 className='px-4 py-2 text-left text-lg font-medium'>{course.data().courseName}</h1>
                    <video className='px-1 w-80' src={course.data().preview.videoUrl}></video>
                    <div className='px-2 pb-2 w-full flex justify-center border-b-2 border-black my-3 text-2xl text-orange-600 font-semibold '>RECORDED VIDEOS</div>
                    <Link className='outline-none'   to={`/learn/courses/${course.id}`}>  <div className='bg-black mb-2 rounded-full flex items-center justify-center py-2 w-56 text-lg font-medium text-white'>View Course</div></Link>
                    <div className='flex w-full px-2 justify-end items-center'>
                        <h1 className='pr-20 font-semibold '>Rs.{course.data().coursePrice}/-</h1>
                        <div className='cursor-pointer'>
          {favKeys.includes(course.id) ? <FavoriteIcon onClick={()=>{
                       removeFromFav(course)
                     }}/> :  <FavoriteBorderIcon onClick={()=>{
                       addToFav(course)
                     }}/> }
          </div>
                    </div>
                </div>
                    )
                }
                <div className='py-2 flex justify-center flex-wrap w-80 flex-col items-center rounded-2xl bg-gray-100'>
                    <h1 className='px-4 py-2 text-left text-lg font-medium'>Cold process soap making workshop</h1>
                    <img className='px-1 w-80' src="
                    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5QJd7j-CBqql2wJOqvxFBNA_etmQwg6FOLT8D_o04yTQwtObSuFaCtWnd-FTZIEDDzs&usqp=CAU
                    " alt="" />
                    <div className='px-2 pb-2 w-full flex justify-center border-b-2 border-black my-3 text-2xl text-orange-600 font-semibold '>RECORDED VIDEOS</div>
                    <div className='bg-black mb-2 rounded-full flex items-center justify-center py-2 w-56 text-lg font-medium text-white'>View Course</div>

                    <div className='flex w-full px-2 justify-end items-center'>
                        <h1 className='pr-20 font-semibold '>Rs.15000/-</h1>
                        <FavoriteBorderIcon/>
                    </div>
                </div>
                <div className='py-2 flex justify-center flex-wrap w-80 flex-col items-center rounded-2xl bg-gray-100'>
                    <h1 className='px-4 py-2 text-left text-lg font-medium'>Cold process soap making workshop</h1>
                    <img className='px-1 w-80' src="
                    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5QJd7j-CBqql2wJOqvxFBNA_etmQwg6FOLT8D_o04yTQwtObSuFaCtWnd-FTZIEDDzs&usqp=CAU
                    " alt="" />
                    <div className='px-2 pb-2 w-full flex justify-center border-b-2 border-black my-3 text-2xl text-orange-600 font-semibold '>RECORDED VIDEOS</div>
                    <div className='bg-black mb-2 rounded-full flex items-center justify-center py-2 w-56 text-lg font-medium text-white'>View Course</div>

                    <div className='flex w-full px-2 justify-end items-center'>
                        <h1 className='pr-20 font-semibold '>Rs.15000/-</h1>
                        <FavoriteBorderIcon/>
                    </div>
                </div>
                
            </div>
            <div className='w-full justify-end items-center pr-10 mt-4 border-b-2 border-black pb-8  flex'>
            <Link className='outline-none' to="/learn"><div className='flex hover:bg-gray-100 transition-all duration-300 px-5 py-1 rounded-full justify-center flex-col items-center'>
                            <EastIcon/>
                            <h1>more</h1>
                        </div>
                        </Link>
                    </div>
            </div>
            
        </div>
    </div>
  )
}

export default HomeElements