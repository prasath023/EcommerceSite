import React, { useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';


import {
  auth,
  db,
  onAuthStateChanged
} from "./firebase"
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


const HeaderBuy = ({currentUser,handleOpenMenu,openMenu1}) => {
  const [open,setOpen]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
  const [cartData,setCartData]=useState()


  let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/`; 
      navigate(path);
    }

  // async function fetchData() {
  //   const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/cart`));
  //    setCartData(querySnapshot.docs)
  //   }
  //   useEffect(() => {
  //     fetchData()
  //    }, [cartData])
  //    useEffect(() => {
  //     fetchData()
  //    }, [])
  async function fetchCartData() {
    const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/cart`));
     setCartData(querySnapshot.docs)
    }
    useEffect(() => {
      fetchCartData()
     }, [cartData])
     useEffect(() => {
      fetchCartData()
     }, [])
 const auth = getAuth();

 const handleLogOut=()=>{ 
  signOut(auth).then(() => {
  }).catch((error) => {
    // An error happened.
  });
 }
 useEffect(()=>{
  handleOpenMenu(openMenu)
 },[openMenu])

 useEffect(()=>{
setOpenMenu(openMenu1)
},[openMenu1])

  return (
    <div className=' w-screen bg-gray-100 text-gray-800 shadow-md  header flex justify-center items-center h-11 lg:h-14'>
      <nav className='flex justify-between items-center w-full'>
        <div className='pl-5 lg:hidden'>
        <MenuIcon onClick={()=>setOpenMenu(!openMenu)} className='cursor-pointer' />
        </div>
        <div className='lg:w-56 w-24 -ml-7 flex justify-center items-center'>
        <Link className='outline-none' to="/"> learnB<span className='text-orange-500 font-semibold'>u</span>y </Link>
        </div>
        <ul className='hidden lg:flex text-sm justify-between w-2/4'>
        <li>
            <Link className='outline-none' to="/aboutus"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>About Us</button></Link>
          </li>
        <li>
            <Link className='outline-none' to="/learn"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Workshops</button></Link>
          </li>
          <li>
            <Link className='outline-none' to="/startshop"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Raw Materials</button></Link>
          </li>
          
          <li>
            <Link className='outline-none' to="/buy"><button className='outline-none focus:scale-110 focus:text-black focus:font-semibold'>Marketplace</button></Link>
          </li>
        </ul>
        <div className='flex justify-end lg:justify-end pr-5 lg:pr-14 w-2/4 lg:w-1/4 items-center'>
        {/* <div className='flex relative justify-center items-center'>
          {
          cartData && <div className='text-xs absolute mb-10 ml-9 rounded-full h-5 w-5 bg-red-600 cursor-pointer flex justify-center items-center text-white'>
            {cartData.length}
          </div>
          }
         <Link className='outline-none'  to="/cart">
          <div className='p-3 text-gray-200 rounded-full btn1 cursor-pointer flex justify-center items-center '>
        <ShoppingCartIcon/>
        </div>
        </Link>
        </div> */}
        {/* <div className='flex textAddress w-24 lg:w-32 cursor-pointer flex-col items-start justify-start text-xs'>
          <div className='flex justify-center lg:mb-1 items-center'>
            <LocationOnOutlinedIcon  fontSize='smalo'/>
            <div className='lg:text-sm textAddress font-semibold hover:underline underline-offset-2'>
              Add address
            </div>

          </div>
          <div className='ml-2 textAddress font-medium'>
            No address
          </div>
        </div> */}
        <div className='flex mr-5 lg:mr-3 relative justify-center items-center'>
          {
          cartData && <div className='text-xs absolute lg:mb-8 mb-6 ml-12 lg:ml-12 lg:-mr-1 font-semibold rounded-full h-4 w-4  cursor-pointer flex justify-center items-center text-black'>
            {cartData.length}
          </div>
          }
        
          <div className='ml-3 hidden text-gray-600 hover:text-gray-900 transition-all duration-200  btn1 cursor-pointer lg:flex justify-center items-center '>
          <Link className='outline-none'  to="/cart"><LocalMallSharpIcon fontSize='large'/></Link>
        </div>
        <div className='ml-5 lg:hidden text-gray-600 hover:text-gray-900 transition-all duration-200  btn1 cursor-pointer flex justify-center items-center '>
        <Link className='outline-none'  to="/cart"><LocalMallSharpIcon fontSize='medium'/></Link>
        </div>
        
        
        </div>
        
        <div className='lg:flex hidden justify-center cursor-pointer items-center ml-3 mr-6 hover:text-gray-900 transition-all duration-200 text-gray-600'>
        <Link className='outline-none'  to="/favorite-products"> <FavoriteBorderSharpIcon fontSize='large'/></Link>
        </div>
        <div className='flex lg:hidden justify-center cursor-pointer items-center  mr-3.5 hover:text-gray-900 transition-all duration-200 text-gray-600'>
        <Link className='outline-none'  to="/favorite-products"> <FavoriteBorderSharpIcon fontSize='medium'/></Link>
        </div>
        
            <AccountCircleIcon className='cursor-pointer' onClick={()=>setOpen(!open)} fontSize='large'/>
            {open && 
            <div className='absolute z-50 lg:right-12 top-20'>
              <div className='py-3'>
            <div className='w-3 h-3 shadow-2xl  rotate-45 right-2 z-10 top-1.5 bg-white  absolute'>

            </div>
            <div className='bg-white shadow-2xl p-4 z-30  text-xs'>

           {
currentUser !== "no user" &&

<div>
<Link className='outline-none' to="/orders"><div onClick={()=>setOpen(false)} className='mb-5 hover:text-blue-600 hover:underline underline-offset-2 cursor-pointer mt-5 mx-4'>
             Orders
              </div></Link>
              <Link className='outline-none' to="/billings">  <div onClick={()=>setOpen(false)} className=' hover:text-blue-600 hover:underline underline-offset-2 cursor-pointer mx-4'>
                Course Billing
                </div></Link>
</div>
           }
           
                <div className='mb-5 mt-5 hover:font-semibold cursor-pointer mx-4'>
           {currentUser !== "no user" ? <Link className='outline-none' to="/signin" onClick={handleLogOut}>Logout</Link> : <Link className='outline-none' to="/signin">Signin</Link>} 
                
                </div>            
            </div>
        </div>
            </div>
            }
           {/* {currentUser !== "no user" ? <Link className='outline-none' to="/signin" onClick={handleLogOut}>Logout</Link> : <Link className='outline-none' to="/signin">Signin</Link>}  */}
        </div>
      </nav>
    </div>
  )
}

export default HeaderBuy