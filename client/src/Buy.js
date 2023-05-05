import React, { useEffect, useRef, useState } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where  } from 'firebase/firestore'
import { async } from '@firebase/util'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { db } from './components/firebase'
import SignUp from './SignUp'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import "./css/Buy.css";
import CloseIcon from '@mui/icons-material/Close';
import Login from './components/Login'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useParams } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keys } from '@mui/system'
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import main11 from "./assets/main11.avif"
import main12 from "./assets/main12.webp"
import main13 from "./assets/main13.webp"
import main14 from "./assets/main14.gif"
import Swiper from './components/Swiper'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import BuyLinks from './components/BuyLinks';
import FilterListIcon from '@mui/icons-material/FilterList';
import HeaderBuy from './components/HeaderBuy';

const Buy = ({currentUser,signUp,error}) => {

const [data,setData]=useState([])
const [favourite,setFavourite]=useState([])
const [favData,setFavData]=useState([])
const [search,setSearch]=useState('')
const [secondImage,setSecondImage]=useState(false)
const [searchData,setSearchData]=useState("")
const [addedToCart, setAddedToCart]=useState(false)
const [orderId,setOrderId]=useState()
const [userName,setUserName]=useState()
const [favKeys,setFavKeys]=useState([])
const [catKey,setCatKey]=useState('')
const [catData,setCatData]=useState(false)
const [catBool,setCatBool]=useState(false)
const [discountBool,setDiscountBool]=useState(false)
const [sizeBool,setSizeBool]=useState(false)
const [colorBool,setColorBool]=useState(false)
const [brandBool,setBrandBool]=useState(false)
const [openFilter,setOpenFilter]=useState(false)
const [priseBool,setPriseBool]=useState(false)
const [catFilterData,setCatFilterData]=useState(false)
const [discountFilterData,setDiscountFilterData]=useState(false)
const [colorFilterData,setColorFilterData]=useState(false)
const [sizeFilterData,setSizeFilterData]=useState(false)
const [brandFilterData,setBrandFilterData]=useState(false)
const [priseFilterData,setPriseFilterData]=useState(false)

const imageRef = useRef(null);


// const fetchCatData=async(key)=>{
//   const q = query(collection(db, "products"), where("subCategory", "==", key));

// const querySnapshot = await getDocs(q);
// console.log(querySnapshot && querySnapshot.data());
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
// }

useEffect(() => {
  catKey && setCatData(data.filter((d)=>d.data().category.subCategory == catKey))
  setSearchData('')
}, [catKey])




const fetchUserName=async()=>{
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap)
}
let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/signin`; 
      navigate(path);
    } 

async function fetchFav() {
  const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/favourite`));
   setFavData(querySnapshot.docs)
   setFavKeys(querySnapshot.docs.map(doc=>doc.id));
  }

  
  

const fetchData=async()=>{
    const q = query(collection(db,"products"));
    const querySnapshot=await getDocs(q)
    setData(querySnapshot.docs)
}
const removeFromFav=(product)=>{
  const docRef = doc(db, `users/${currentUser.uid}/favourite`, product.id);
 
  deleteDoc(docRef)
  .then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
}





const addToFav=async(product)=>{
  const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "favourite")
        const ref= doc(colRef,product.id)
       
        await setDoc(ref, {
          productName:product.data().productName,
          images: product.data().images,
          quantity:product.data().quantity,
          descriptions:product.data().descriptions,
          price:product.data().price,
          owner:product.data().owner,
          deliveryDetails:product.data().deliveryDetails, 
          returnExchangeDays:product.data().returnExchangeDays,
                   });
  }
  useEffect(() => {
    fetchFav()

   }, [])
   useEffect(() => {
    fetchFav()
  // handleFavData()

   }, [addToFav,removeFromFav])


useEffect(() => {
  currentUser && fetchData()
 }, [])

const [quantity,setQuantity]=useState()
const [productId,setProductId]=useState()

const handleCatKey=(key)=>{
  setCatKey(key)
}


    
    const handleSearchSubmit=(e)=>{
      e.preventDefault();
      let keys=["productName","genre","description"]
      let searchResponse=data.filter((item)=>item.data().tags.includes(search) || item.data().productName.toLowerCase().includes(search))
      let searchd=data.filter((item)=>item.data().tags.includes(search))
      console.log(searchd.map(c=>c.data()));
      // item.data().description.toLowerCase().includes(search))
      // item.data()..toLowerCase().includes(search))  || data.filter((item)=>
      // item.data().description.toLowerCase().includes(search))
      search && searchResponse && setSearchData(searchResponse)
      setSearch("")
    }
    
    const handleAddToCart=async(id,product)=>{
        if(currentUser==="no user"){
          routeChange()
        }
        else{
          const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "cart")
        const ref= doc(colRef,id)
        setAddedToCart(true)
        setTimeout(() => {
            setAddedToCart(false)
        }, 3000);
       
        await setDoc(ref, {
          productName:product.data().productName,
          quantity:product.data().quantity,
          quantityCart:1,
          images: product.data().images,
          descriptions:product.data().descriptions,
          price:product.data().price,
          owner:product.data().owner,
          deliveryDetails:product.data().deliveryDetails, 
          returnExchangeDays:product.data().returnExchangeDays,
                   });
        }
        }
        
        const handleOrder=(price)=>{
           if(currentUser==="no user"){
            routeChange()
           }
           else{
            let options={
              key:'rzp_test_X2B5SLorcqiNpE',
              key_secret:'pRJLdQoEhiTQYbOEt2rLJxOW',
              amount: price *100,
              currency:"INR",
              name:"no name",
              description:"testing",
              handler: function(response){
                setOrderId(response.razorpay_payment_id)
              },
              theme:{
                color:"#3399cc"
              }
            }
            let pay= new window.Razorpay(options);
            pay.open()
           }
          }
          const fetchFilterData=async()=>{
            const q = query(collection(db,"products"));
            const querySnapshot=await getDocs(q)
            setDiscountFilterData(querySnapshot.docs.map((doc)=>doc.data().discount).filter((val,id,array) => array.indexOf(val) == id))
            setBrandFilterData(querySnapshot.docs.map((doc)=>doc.data().brandName).filter((val,id,array) => array.indexOf(val) == id))
            setPriseFilterData(querySnapshot.docs.map((doc)=>doc.data().price).filter((val,id,array) => array.indexOf(val) == id))
            setSizeFilterData(querySnapshot.docs.map((doc)=> doc.data().sizeDetails.map(size=> size.size)).filter((val,id,array) => array.indexOf(val) == id))
            setColorFilterData(querySnapshot.docs.map((doc)=>doc.data().colorDetails.map(color=>color.color)).filter((val,id,array) => array.indexOf(val) == id))
            setCatFilterData(querySnapshot.docs.map((doc)=>doc.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
        }
        useEffect(() => {
          currentUser && fetchFilterData()
         }, [])
          //fetching keys from fav

        //  favKeys && console.log(favKeys);
        let dataPre =  data.filter((item)=>
          "d"
          )
        //imageSelection
 
        const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
          const imageRef = useRef(null);
        
          return (
            <img className=''
              onMouseOver={() => {
                imageRef.current.src = secondaryImg;
              }}
              onMouseOut={() => {
                imageRef.current.src= primaryImg;
              }}
              src={primaryImg} 
              alt=""
              ref={imageRef}
            />
          )
        }

      const [openMenu,setOpenMenu]=useState(false)

      const handleOpenMenu=(pass)=>{
          setOpenMenu(pass)
      }

  return (
    <div>
      <div className='w-screen   textTop lg:text-sm flex justify-center items-center py-2 text-gray-300 bg-gray-600'>
        Want to associate with us as vendor, creator or seller?  <Link className='outline-none' to="/startshop"><h1 className='lg:ml-3 ml-1.5 hover:text-blue-500 underline underline-offset-2 cursor-pointer'>Enquire here</h1></Link>
    </div>
      <HeaderBuy openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

     
    <div className=''>
      <div className='flex justify-center lg:justify-between shadow-inner  items-center  h-12 lg:h-14  bg-gray-200 w-screen'>
     {/* //link */}
     <div className='flex justify-between items-center'>
     <Link className='outline-none hidden lg:block' to="/startshop"><h1 className='lg:ml-10 mr-5 hover:text-blue-600 hover:underline text-xs underline-offset-2 cursor-pointer'>Sell</h1></Link>
     <div className='flex items-center justify-between lg:items-center lg:justify-start '>
     <BuyLinks className="" setSearchData={setSearchData} currentUser={currentUser}  handleCatKey={handleCatKey}/>
     </div>
     </div>
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

     
    {/* {searchData  ?  */}
     {searchData || catData ? 
      <div className={`w-screen flex flex-col lg:flex-row  lg:justify-between  lg:items-start`}>
      <div className={`w-1/5 hidden sticky lg:flex items-center mt-20 justify-start filterHeight flex-col`}>
      <ul className=''>
        <li className='mb-5'>
          <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setCatBool(!catBool)}>
          CATEGORIES {
          catBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {catBool && 
          catFilterData.map((fil)=>
          <button onClick={()=>setCatKey(fil)} className='text-xs block focus:text-sm focus:font-semibold mt-2 cursor-pointer'>
            {fil}
          </button>
          )
          }
          </div>
        </li>
        <li className='mb-5'>
        <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setDiscountBool(!discountBool)}>
          DISCOUNTS {
          discountBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {discountBool && 
          discountFilterData.map((fil)=>
          <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
             <input value={fil} type="checkbox" /> {fil}%
          </div>
          )
          }
          </div>
        </li>
        <li className='mb-5'>
        <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setBrandBool(!brandBool)}>
          BRANDS {
          brandBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {brandBool && 
          brandFilterData.map((fil)=>
          <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
             <input value={fil} type="checkbox" /> {fil}
          </div>
          )
          }
          </div>  
        </li>
        <li className='mb-5'>
        <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setPriseBool(!priseBool)}>
          PRISE {
          priseBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {priseBool && 
          priseFilterData.map((fil)=>
          <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
             <input value={fil} type="checkbox" /> {fil}<br></br>
          </div>
          )
          }
          </div>  
        </li>
        <li className='mb-5'>
        <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setColorBool(!colorBool)}>
          COLOR {
          colorBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {colorBool && 
          colorFilterData.map((fill)=>
          <div onClick={()=>setCatKey(fill)} className='text-xs mt-2 cursor-pointer'>
            {fill && fill.map(fil=>
            <div className='mt-2'>
            <input value={fil} type="checkbox" /> {fil}
            </div>
           ) }
          </div>
          )
          }
          </div>  
        </li>
        <li className='mb-5'>
        <div>
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>setSizeBool(!sizeBool)}>
          SIZE {
          sizeBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
          <KeyboardArrowRightIcon className=' ml-20' />
    }
          </div>
          {sizeBool && 
         
          <div onClick={()=>setCatKey("")} className='text-xs mt-2 cursor-pointer'>
            
            <div className=' mt-2'>
            <input value="xs" type="checkbox" /> XS

            </div>
            <div className=' mt-2'>
            <input value="sm" type="checkbox" /> SM
              
            </div>
            <div className=' mt-2'>
            <input value="M" type="checkbox" /> M
              
            </div>
            <div className=' mt-2'>
            <input value="L" type="checkbox" /> L
              
            </div>
            <div className=' mt-2'>
            <input value="XL" type="checkbox" /> XL
              
            </div>

          </div>
          
          }
          </div>  
        </li>
      </ul>
      </div>
      <div className='w-full text-sm  mt-3 flex lg:hidden justify-end items-center'>
        <div onClick={()=>setOpenFilter(true)} className='border cursor-pointer py-1 px-2 mr-5'>
        <FilterListIcon fontSize='small' className='mr-1'/> Filter
        </div>
       </div>
      <div className='lg:w-4/5 w-full  lg:border-l-2 flex flex-wrap justify-around  items-center'>      
                 {(searchData || catData).map(product=>
                //  {searchData.map(product=>

           <div key={product.id} className='rounded-md lg:mt-10 mt-5 lg:pb-5 lg:mb-14 pb-3 transition-all duration-500 cursor-pointer flex-col  items-center justify-center border-gray-300 shadow-lg lg:shadow-2xl w-44 lg:w-72'>
             <Link className='outline-none'  to={`/products/${product.id}`}>
             <ImageToggleOnMouseOver className="transition-all duration-300"
           primaryImg={product.data().images && product.data().images[0].imageUrl}
           secondaryImg={product.data().images[2] ? product.data().images[2].imageUrl : product.data().images[0].imageUrl}
           alt="" />
             {/* {
               secondImage ? 
             <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={} alt={product.data().productName} />
               :
             <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={product.data().images && product.data().images[1].imageUrl} alt={product.data().productName} />
             } */}
             </Link>
           
             <div className='lg:pt-4 pt-2 px-2 lg:px-4'>
             <Link className='outline-none'  to={`/products/${product.id}`}>
 
                 <h1 className='lg:text-xl sm:font-medium text-sm mb-2  text-black'>{product.data().productName}</h1>
                 </Link>
               
                 <div className='flex justify-between items-center'>
                     <div className='flex '>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarHalfIcon style={{fontSize: '15px'}}/>
               <StarOutlineIcon style={{fontSize: '15px'}}/>
             </div>
                     <div className='text-white text-sm font-bold bg-gray-300 lg:h-7 lg:w-14 lg:mr-3 h-4.5 mr-1 w-10 flex justify-center items-center '>
                         {product.data().discount}%
                     </div>
                 </div>     
 
                 <div className='flex items-center justify-between'>
                   <div className='flex my-3'>
                   <CurrencyRupeeIcon className='' fontSize='string'/>
                     <h1 className='lg:text-xl text-base font-semibold'>{product.data().price}<span className='lg:text-base text-xs font-normal'>.00</span></h1>
                   </div>
                   <div className='mr-3'>
                   
                     {favKeys.includes(product.id) ? <FavoriteIcon onClick={()=>{
                       removeFromFav(product)
                     }}/> :  <FavoriteBorderIcon onClick={()=>{
                       addToFav(product)
                     }}/> }
                   
 
                   </div>
                 </div>
                 <button className='outline-none mx-auto  lg:mt-2 flex items-center justify-center text-sm lg:text-base w-40 lg:w-full text-white lg:h-9 h-7 bg-black'onClick={()=>handleAddToCart(product.id,product)} >Add to bag</button>
               
             </div>
             <div>
           
 
               </div>
         </div>
         )}
        </div>
    </div>
       :
       <div className={`w-screen   flex flex-col lg:flex-row  lg:justify-between  lg:items-start`}>
       <div className={`w-1/5 hidden sticky lg:flex items-center mt-20 justify-start filterHeight flex-col`}>
       <ul className=''>
         <li className='mb-5'>
           <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setCatBool(!catBool)}>
           CATEGORIES {
           catBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' />
     }
           </div>
           {catBool && 
           catFilterData.map((fil)=>
           <button onClick={()=>setCatKey(fil)} className='text-xs block focus:text-sm focus:font-semibold mt-2 cursor-pointer'>
             {fil}
           </button>
           )
           }
           </div>
         </li>
         <li className='mb-5'>
         <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setDiscountBool(!discountBool)}>
           DISCOUNTS {
           discountBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' />
     }
           </div>
           {discountBool && 
           discountFilterData.map((fil)=>
           <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
              <input value={fil} type="checkbox" /> {fil}%
           </div>
           )
           }
           </div>
         </li>
         <li className='mb-5'>
         <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setBrandBool(!brandBool)}>
           BRANDS {
           brandBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' />
     }
           </div>
           {brandBool && 
           brandFilterData.map((fil)=>
           <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
              <input value={fil} type="checkbox" /> {fil}
           </div>
           )
           }
           </div>  
         </li>
         <li className='mb-5'>
         <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setPriseBool(!priseBool)}>
           PRISE {
           priseBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' />
     }
           </div>
           {priseBool && 
           priseFilterData.map((fil)=>
           <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
              <input value={fil} type="checkbox" /> {fil}<br></br>
           </div>
           )
           }
           </div>  
         </li>
         <li className='mb-5'>
         <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setColorBool(!colorBool)}>
           COLOR {
           colorBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' />
     }
           </div>
           {colorBool && 
           colorFilterData.map((fill)=>
           <div onClick={()=>setCatKey(fill)} className='text-xs mt-2 cursor-pointer'>
             {fill && fill.map(fil=>
             <div className='mt-2'>
             <input value={fil} type="checkbox" /> {fil}
             </div>
            ) }
           </div>
           )
           }
           </div>  
         </li>
         <li className='mb-5'>
         <div>
           <div className='flex items-center justify-between cursor-pointer' onClick={()=>setSizeBool(!sizeBool)}>
           SIZE {
           sizeBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
           <KeyboardArrowRightIcon className=' ml-20' /> 
     }
           </div>
           {sizeBool && 
          
           <div onClick={()=>setCatKey("")} className='text-xs mt-2 cursor-pointer'>
             
             <div className=' mt-2'>
             <input value="xs" type="checkbox" /> XS
 
             </div>
             <div className=' mt-2'>
             <input value="sm" type="checkbox" /> SM
               
             </div>
             <div className=' mt-2'>
             <input value="M" type="checkbox" /> M
               
             </div>
             <div className=' mt-2'>
             <input value="L" type="checkbox" /> L
               
             </div>
             <div className=' mt-2'>
             <input value="XL" type="checkbox" /> XL
               
             </div>
 
           </div>
           
           }
           </div>  
         </li>
       </ul>
       </div>
       <div className='w-full text-sm  mt-3 flex lg:hidden justify-end items-center'>
        <div onClick={()=>setOpenFilter(true)} className='border cursor-pointer py-1 px-2 mr-5'>
        <FilterListIcon fontSize='small' className='mr-1'/> Filter
        </div>
       </div>
       
         <div className='lg:w-4/5 w-full  lg:border-l-2 flex flex-wrap justify-around  items-center'>    

                 {data.map(product=>

           <div key={product.id} className='rounded-md lg:mt-10 mt-5 lg:pb-5 lg:mb-14 pb-3 transition-all duration-500 cursor-pointer flex-col  items-center justify-center border-gray-300 shadow-lg lg:shadow-2xl w-44 lg:w-72'>
            
             <Link className='outline-none'  to={`/products/${product.id}`}>
             <ImageToggleOnMouseOver className="transition-all duration-300"
           primaryImg={product.data().images && product.data().images[0].imageUrl}
           secondaryImg={product.data().images[2] ? product.data().images[2].imageUrl : product.data().images[0].imageUrl}
           alt="" />
             {/* {
               secondImage ? 
             <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={} alt={product.data().productName} />
               :
             <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={product.data().images && product.data().images[1].imageUrl} alt={product.data().productName} />
             } */}
             </Link>
           
             <div className='lg:pt-4 pt-2 px-2 lg:px-4'>
             <Link className='outline-none'  to={`/products/${product.id}`}>
 
                 <h1 className='lg:text-xl sm:font-medium text-sm mb-2  text-black'>{product.data().productName}</h1>
                 </Link>
               
                 <div className='flex justify-between items-center'>
                     <div className='flex '>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarIcon style={{fontSize: '15px'}}/>
               <StarHalfIcon style={{fontSize: '15px'}}/>
               <StarOutlineIcon style={{fontSize: '15px'}}/>
             </div>
                     <div className='text-white text-sm font-bold bg-gray-300 lg:h-7 lg:w-14 lg:mr-3 h-4.5 mr-1 w-10 flex justify-center items-center '>
                         {product.data().discount}%
                     </div>
                 </div>     
 
                 <div className='flex items-center justify-between'>
                   <div className='flex my-3'>
                   <CurrencyRupeeIcon className='' fontSize='string'/>
                     <h1 className='lg:text-xl text-base font-semibold'>{product.data().price}<span className='lg:text-base text-xs font-normal'>.00</span></h1>
                   </div>
                   <div className='mr-3'>
                   
                     {favKeys.includes(product.id) ? <FavoriteIcon onClick={()=>{
                       removeFromFav(product)
                     }}/> :  <FavoriteBorderIcon onClick={()=>{
                       addToFav(product)
                     }}/> }
                   
 
                   </div>
                 </div>
                 <button className='outline-none mx-auto  lg:mt-2 flex items-center justify-center text-sm lg:text-base w-40 lg:w-full text-white lg:h-9 h-7 bg-black'onClick={()=>handleAddToCart(product.id,product)} >Add to bag</button>
               
             </div>
             <div>
           
 
               </div>
         </div>
         )}
         </div>
     </div>
}


{/*    
    <div className='w-screen  flex-wrap flex justify-around mt-14 items-center'>
        {addedToCart && <div className='absolute flex flex-wrap items-center justify-center z-50 mb-96 bg-green-200 px-5 py-2 rounded-xl success'><h1>Item added to cart</h1> <DoneIcon className='ml-2' /> </div>}
       
        {searchData ? 
       searchData.map(product=>
        <div key={product.id} className='rounded-md pb-5 mb-14 transition-all duration-500 cursor-pointer flex-col  items-center justify-center border-gray-300 shadow-2xl w-72 '>
          {handleFav(product.id)}
          <Link className='outline-none'  to={`/products/${product.id}`}>
          <img className='h-64 w-full mx-auto object-cover' src={product.data().images ? product.data().images[0].imageUrl : product.data().imageUrl} alt={product.data().productName} />
          </Link>
        
          <div className='pt-4 px-4'>
          <Link className='outline-none'  to={`/products/${product.id}`}>

              <h1 className='text-xl mb-2  text-black'>{product.data().productName}</h1>
            
              <div className='flex justify-between items-center'>
                  <div className='flex '>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarHalfIcon style={{fontSize: '15px'}}/>
            <StarOutlineIcon style={{fontSize: '15px'}}/>
           </div>
                  <div className='text-white text-sm font-bold bg-gray-300 h-7 w-14 mr-3 flex justify-center items-center '>
                      {product.data().discount}%
                  </div>
              </div>     
              </Link>

              <div className='flex items-center justify-between'>
                <div className='flex my-3'>
                <CurrencyRupeeIcon className='' fontSize='string'/>
                  <h1 className='text-xl font-semibold'>{product.data().price}<span className='text-base font-normal'>.00</span></h1>
                </div>
                 <div className='mr-3'>
                
                  {product.data().favourite ? <FavoriteIcon onClick={()=>{
                    removeFromFav(product)
                  }}/> :  <FavoriteBorderIcon onClick={()=>{
                    addToFav(product)
                  }}/> }
                 

                 </div>
              </div>
              <button className='outline-none  mt-2 flex items-center justify-center w-full text-white h-9 bg-black'onClick={()=>handleAddToCart(product.id,product)} >Add to cart</button>
             
          </div>
          <div>
         

            </div>
      </div>
   )  
     : 
    ( data &&
      data.map(product=>
           <div key={product.id} className='rounded-md pb-5 mb-14  transition-all duration-500 cursor-pointer flex-col  items-center justify-center border-gray-300 shadow-2xl w-72 '>
          {handleFav(product.id)}
          <Link className='outline-none'  to={`/products/${product.id}`}>
          <img className='h-64 w-full mx-auto object-cover' src={product.data().images ? product.data().images[0].imageUrl : product.data().imageUrl} alt={product.data().productName} />
          </Link>
        
          <div className='pt-4 px-4'>
          <Link className='outline-none'  to={`/products/${product.id}`}>

              <h1 className='text-xl mb-2  text-black'>{product.data().productName}</h1>
            
              <div className='flex justify-between items-center'>
                  <div className='flex '>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarHalfIcon style={{fontSize: '15px'}}/>
            <StarOutlineIcon style={{fontSize: '15px'}}/>
           </div>
                  <div className='text-white text-sm font-bold bg-gray-300 h-7 w-14 mr-3 flex justify-center items-center '>
                      {product.data().discount}%
                  </div>
              </div>     
              </Link>

              <div className='flex items-center justify-between'>
                <div className='flex my-3'>
                <CurrencyRupeeIcon className='' fontSize='string'/>
                  <h1 className='text-xl font-semibold'>{product.data().price}<span className='text-base font-normal'>.00</span></h1>
                </div>
                 <div className='mr-3'>
                
                  {product.data().favourite ? <FavoriteIcon onClick={()=>{
                    removeFromFav(product)
                  }}/> :  <FavoriteBorderIcon onClick={()=>{
                    addToFav(product)
                  }}/> }
                 

                 </div>
              </div>
              <button className='outline-none  mt-2 flex items-center justify-center w-full text-white h-8 bg-black'onClick={()=>handleAddToCart(product.id,product)} >Add to cart</button>
          </div>
          <div>
         

            </div>
      </div>
      ))
      }
        
    </div> */}
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
       {openFilter && 
           <div className={` w-screen text-sm h-screen bottom-0 bg-slate-400 z-50 sticky flex items-center justify-start  flex-col`}>
            <div  className='flex justify-end w-full mb-5 items-center pr-5 pt-5'>
            <CloseIcon onClick={()=>setOpenFilter(false)} className='cursor-pointer'/>
        </div>
           <ul className=''>
             <li className='mb-5'>
               <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setCatBool(!catBool)}>
               CATEGORIES {
               catBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {catBool && 
               catFilterData.map((fil)=>
               <button onClick={()=>setCatKey(fil)} className='text-xs block focus:text-sm focus:font-semibold mt-2 cursor-pointer'>
                 {fil}
               </button>
               )
               }
               </div>
             </li>
             <li className='mb-5'>
             <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setDiscountBool(!discountBool)}>
               DISCOUNTS {
               discountBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {discountBool && 
               discountFilterData.map((fil)=>
               <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
                  <input value={fil} type="checkbox" /> {fil}%
               </div>
               )
               }
               </div>
             </li>
             <li className='mb-5'>
             <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setBrandBool(!brandBool)}>
               BRANDS {
               brandBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {brandBool && 
               brandFilterData.map((fil)=>
               <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
                  <input value={fil} type="checkbox" /> {fil}
               </div>
               )
               }
               </div>  
             </li>
             <li className='mb-5'>
             <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setPriseBool(!priseBool)}>
               PRISE {
               priseBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {priseBool && 
               priseFilterData.map((fil)=>
               <div onClick={()=>setCatKey(fil)} className='text-xs mt-2 cursor-pointer'>
                  <input value={fil} type="checkbox" /> {fil}<br></br>
               </div>
               )
               }
               </div>  
             </li>
             <li className='mb-5'>
             <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setColorBool(!colorBool)}>
               COLOR {
               colorBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {colorBool && 
               colorFilterData.map((fill)=>
               <div onClick={()=>setCatKey(fill)} className='text-xs mt-2 cursor-pointer'>
                 {fill && fill.map(fil=>
                 <div className='mt-2'>
                 <input value={fil} type="checkbox" /> {fil}
                 </div>
                ) }
               </div>
               )
               }
               </div>  
             </li>
             <li className='mb-5'>
             <div>
               <div className='flex items-center justify-between cursor-pointer' onClick={()=>setSizeBool(!sizeBool)}>
               SIZE {
               sizeBool ? <KeyboardArrowDownIcon  className=' ml-20'/> :
               <KeyboardArrowRightIcon className=' ml-20' />
         }
               </div>
               {sizeBool && 
              
               <div onClick={()=>setCatKey("")} className='text-xs mt-2 cursor-pointer'>
                 
                 <div className=' mt-2'>
                 <input value="xs" type="checkbox" /> XS
     
                 </div>
                 <div className=' mt-2'>
                 <input value="sm" type="checkbox" /> SM
                   
                 </div>
                 <div className=' mt-2'>
                 <input value="M" type="checkbox" /> M
                   
                 </div>
                 <div className=' mt-2'>
                 <input value="L" type="checkbox" /> L
                   
                 </div>
                 <div className=' mt-2'>
                 <input value="XL" type="checkbox" /> XL
                   
                 </div>
     
               </div>
               
               }
               </div>  
             </li>
           </ul>
           </div>
       }
    </div>
  )
}

export default Buy