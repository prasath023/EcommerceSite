import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from './firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Comments from './Comments';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

//rounded

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { useNavigate } from "react-router-dom";
import CommentsPublic from './CommentsPublic';
import Header from './Header';
import SwiperProduct from './SwiperProduct';
import HeaderBuy from './HeaderBuy';

const Product = ({currentUser}) => {
    let { id } = useParams();
    const [data,setData]=useState()
    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()
    const [orderId,setOrderId]=useState()
    const [activeImage,setActiveImage]=useState("")
    const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/signin`; 
      navigate(path);
    }
    async function fetchData() {
        const docRef = doc(db, "products", `${id}`);
        const docSnap = await getDoc(docRef);
        setData(docSnap)
    }
    useEffect(() => {
     fetchData()
    }, [])
    useEffect(() => {
        fetchData()
       }, [id])

       const handleAddToCart=async(product,id)=>{
        if(currentUser==="no user"){
          routeChange()
        }
        else{
          const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "cart")
        const ref= doc(colRef,id)
      
      
       
        await setDoc(ref, {
                   productName:product.data().productName,
                   images: product.data().images,
                   descriptions:product.data().descriptions,
                   price:product.data().price,
                   owner:product.data().owner,
                   quantity:product.data().quantity,
                   quantityCart:1,
                   deliveryDetails:product.data().deliveryDetails, 
                   returnExchangeDays:product.data().returnExchangeDays,
                   });
        }
 }
 const handleOrder=(price)=>{
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

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() 
  
  let startDate1 = date + (data && parseInt(data.data().deliveryDetails.processingTime.start))
let endDate1 = date + (data && parseInt(data.data().deliveryDetails.processingTime.end))
console.log(endDate1);
const handleDate=async()=>{

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
const monthsWith31=["Jan",  "Mar",  "May",
"Jul", "Aug",  "Oct",  "Dec"]
const monthsWith30=[
 "Feb","Apr", "Jun",
  "Sep", "Nov",
]


setStartDate({
  date:  startDate1,
  month: monthNames[month]
})
setEndDate({
  date:  endDate1,
  month: monthNames[month] 
})

if(monthsWith30.includes(monthNames[month])){
 
  if(startDate1 > 30){
    let newStartDate = startDate1 - 30;
    let startMonth = monthNames[month+1]
     setStartDate({
     date: newStartDate,
     month: startMonth
    })
     }
    
       if(endDate1 > 30){
        let newEndDate = endDate1 - 30;
        let endMonth = monthNames[month+1]
         setEndDate({
         date: newEndDate,
         month: endMonth
        })
         }      
}
if(monthsWith31.includes(monthNames[month])){
 
  if(startDate1 > 31){
 let newStartDate = startDate1 - 31;
 let startMonth = monthNames[month+1]
  setStartDate({
  date: newStartDate,
  month: startMonth
 })
  }
  if(endDate1 > 31){
    let newEndDate = parseInt(endDate1) - 31;
    let endMonth = monthNames[month+1]
     setEndDate({
     date: newEndDate,
     month: endMonth
    })
     }
}
  }
  useEffect(()=>{
    handleDate()
  },[])
  useEffect(()=>{
    handleDate()
  },[startDate1,endDate1])

  console.log(startDate);
  console.log(endDate);

  return (
    <div className='w-screen flex justify-between flex-col items-strech'>
     <HeaderBuy openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>
        
        {data && 
        <div>
        <div className='lg:flex hidden mt-12 justify-between items-start'>
          <div className='w-3/5 border-r-2 pr-10 left-0 right-10'>
            <div className='  flex justify-center items-start'>
          
          <div className='flex mx-10 justify-center flex-col items-start'>
          {data.data().images &&  data.data().images.map((image)=>
           <div className='mb-4'>
             <button className='h-14 w-14 focus:outline-none focus:ring focus:ring-gray-700 border  flex justify-center items-center '>
               <img onClick={()=>setActiveImage(image)} className='h-14 w-14 cursor-pointer' src={image.imageUrl} alt={image.imageName} />
             </button>
             
           </div>
          )}
          </div>
          <div className=' flex justify-center items-center flex-col'>
             {activeImage ?
               <img style={{height:"31rem" , width:"37rem"}} src={activeImage.imageUrl} alt={activeImage.imageName} />
             :
             <img style={{height:"31rem" , width:"37rem"}} src={data.data().images[0].imageUrl} alt={data.data().images[0].imageName} />
           }
           
             </div>
       </div>
          <div className='mt-16 mb-14  ml-10 '>
             
              <div className='mt-10'>
          
          
          {data.data().personalisationDescription &&
              <div className='mt-20'>
                <div className='flex  mb-5 justify-start items-end'>
                <h1 className='text-2xl font-semibold mr-2'>Customization </h1>
                <p className='leading-loose'>{data.data().personalisationOptional && "(optional)"}</p>
                </div>
                <p>{data.data().personalisationDescription}</p>
                <input placeholder='Enter the customization' className='h-12  w-72 mt-12 shadow-inner rounded-lg bg-slate-100 p-3 outline-none' type="text" />
              </div>
              }
              {data.data().descriptions &&
              <div className='mt-12'>
               <h1 className='text-2xl font-semibold mb-5' >Description</h1>
              <ul>
              { data.data().descriptions.map(des=>
                
                <div>
                {des.type==="point" &&
          <ul className=''>
          {
            <li className='list-disc leading-loose ml-4 '>
             <div className='flex  items-start'>
           <p>{des.description}</p>
          </div>
            </li>
          }
        </ul>
          }
          {des.type==="paragraph" &&
          <div className='flex leading-relaxed my-5 items-start'>
           <p className=''>{des.description}</p>
          </div>           
          }
                </div>  
                )}
              </ul>
              </div>
          }
          {data.data().materials &&
          <div>
          <h1 className='mb-3 mt-10 font-semibold text-xl'>Details</h1>
            <div>
              {data.data().materials && data.data().materials.map(material=>
                <h1 className=''><span className='font-normal leading-loose mr-1'>{material.materialKey}</span>: <span className='ml-5 text-sm'>{material.materialValue}</span></h1>
              )}
              </div>
              </div>
            }
        </div>
            </div>
            <CommentsPublic className="" id={id} currentUser={currentUser} />
          </div>
        
        <div className='w-2/5 flex sticky  top-0 right-0 flex-col pr-10 pl-10 justify-start items-start'>
          <div className='border-b-2 pt-3 w-full pb-6'>
            <div className=' flex justify-between  items-center mb-2'>
            <h1 className="text-3xl font-bold">{data.data().productName}</h1>
                     
            </div>
            <div className='text-lg font-bold mb-3'>
             <h1> <span className='font-normal mr-1'>from</span> {data.data().brandName}</h1>
            </div>
            <div>
            <div className=' flex justify-start items-center'>
           <div className='flex  border-r-2 pr-2 border-slate-600'>
            <StarIcon fontSize='small'/>
            <StarIcon fontSize='small'/>
            <StarIcon fontSize='small'/>
            <StarHalfIcon fontSize='small'/>
            <StarOutlineIcon fontSize='small'/>
           </div>
            <h1 className='text-sm pl-2'> {data.data().rating} Ratings</h1>
            </div>   
            </div>
            </div>

            <div className='flex border-b-2  pb-7 justify-between w-full mt-7 mb-7 items-center'>
                <div>
                <div className='flex justify-start items-center'>
                  
                <div className='flex mr-3 text-4xl justify-start items-center'>
                  <CurrencyRupeeIcon style={{fontSize: '30px'}}/>
                <h1 className=' font-bold'>{data.data().price}</h1>
                  </div>
                <div className='flex line-through decoration-2 relative justify-center items-center'>
                <CurrencyRupeeIcon style={{fontSize: '15px',textDecorationLine: "lineThrough"}}/>
                  <h1 className='text-2xl font-bold '>{880}</h1>
                </div>
                </div>
                <div className='flex justify-center flex-col mt-3'>
                  <h1 className='text-black mb-2 font-semibold'>You save: <CurrencyRupeeIcon style={{fontSize: '15px'}}/>101 ({data.data().discount}%)</h1>
                  <h1 className='text-sm'>(Inclusive of all taxes)</h1>
                </div>
                </div>
                {parseInt(data.data().quantity) < 6 ?
                <div>
                {
               parseInt(data.data().quantity)  &&
               <div className='text-white text-lg  font-semibold bg-black px-5 py-1 flex justify-center items-center '><span className=''> </span><span>Only {parseInt(data.data().quantity)} left!</span></div>
             }
             </div>
                
                :
                <div>
                {
                parseInt(data.data().quantity) > 0 &&
                <div className='text-white text-lg  font-semibold bg-black px-5 py-1 flex justify-center items-center '><span className=''> </span><span>In stock</span></div>
              }
               </div>
              }
            </div>
            <div className='flex justify-between flex-col border-b-2 mb-7 pb-8 w-full'>

<div className='flex  mb-3 justify-center items-center border px-5 font-medium bg-gray-200 py-3 '>
  <LocalShippingIcon className='mr-3'/>
  <div>
    <h1>Will be shipped within {startDate.date} {startDate.month} - {endDate.date} {endDate.month}</h1>
  </div>
</div>

  <div className='flex  justify-center items-center border px-5 font-medium bg-gray-200 py-3 '>
    <h1 className='mr-1'>{data.data().returns && "Return "}</h1>
    <h1 className='mr-1'>{data.data().exchanges && data.data().returns ? " / Exchange" : "Exchange"}</h1>
    <h1>in {data.data().returnExchangeDays} days</h1>
  </div>

</div>
<button className='flex text-xl font-semibold text-white justify-center items-center border px-5  bg-black w-full py-3 ' onClick={()=>handleAddToCart(data,id)} >Add to bag</button>

                {/* <button onClick={()=>handleOrder(data.data().price)} className='outline-none rounded-sm mt-2 flex items-center justify-center w-72 text-lg font-medium hover:bg-yellow-400 h-10 bg-yellow-500'>Buy now</button> */}
             
        
        </div>
        
        </div>
        <div className='flex flex-col mt-7 lg:hidden'>
          <div className='flex px-3 flex-col justify-center mb-1 items-start '>
           
          <div className='flex mb-2 text-sm w-full justify-between items-center'>
          <div className='flex items-center font-medium'>
             <h1> <span className='font-normal mr-1'>from</span> {data.data().brandName}</h1>
            </div>
           <div className='flex items-center justify-center'>
           <div className='flex border-slate-600'>
            47
           </div>
            <h1 className='text-xs pl-1'> (20)</h1>
           </div>
            </div>   
            
          
            <div className=' flex justify-between w-full items-center mb-3'>
            <h1 className="text-xl font-medium">{data.data().productName}</h1>
                     
            </div>
            
          </div>
              <div className='mb-7'>
                <SwiperProduct data={data && data.data().images} />
              </div>
              <div>
              <div className='flex border-b-2 px-3 pb-7 justify-between w-full mb-7 items-start'>
                <div>
                <div className='flex justify-start items-center'>
                  
                <div className='flex mr-2 text-2xl justify-start items-center'>
                  <CurrencyRupeeIcon style={{fontSize: '22px'}}/>
                <h1 className=' font-bold'>{data.data().price}</h1>
                  </div>
                <div className='flex line-through decoration-2 relative justify-center items-center'>
                <CurrencyRupeeIcon style={{fontSize: '15px',textDecorationLine: "lineThrough"}}/>
                  <h1 className='text-xl font-bold '>{880}</h1>
                </div>
                </div>
                <div className='flex justify-center flex-col mt-3'>
                  <h1 className='text-black mb-4 font-medium'>You save: <CurrencyRupeeIcon style={{fontSize: '15px'}}/>101 ({data.data().discount}%)</h1>
                  <h1 className='text-xs '>( Inclusive of all taxes )</h1>
                </div>
                </div>
                {parseInt(data.data().quantity) < 6 ?
                <div>
                {
               parseInt(data.data().quantity)  &&
               <div className='text-white text-sm  font-semibold bg-gray-800 px-3 py-1 flex justify-center items-center '><span className=''> </span><span>Only {parseInt(data.data().quantity)} left!</span></div>
             }
             </div>
                
                :
                <div>
                {
                parseInt(data.data().quantity) > 0 &&
                <div className='text-white text-lg  font-semibold bg-black px-5 py-1 flex justify-center items-center '><span className=''> </span><span>In stock</span></div>
              }
               </div>
              }
            </div>
            <div className='flex justify-between flex-col border-b-2 mb-7 pb-8 w-full'>

<div className='flex  mb-3 justify-start text-xs items-center  px-4 '>
  <div>
    <h1>Will be shipped within {startDate.date} {startDate.month} - {endDate.date} {endDate.month}</h1>
  </div>
</div>

  <div className='flex  justify-start text-xs items-center  px-3 mb-8  '>
    <h1 className='mr-1'>{data.data().returns && "Return "}</h1>
    <h1 className='mr-1'>{data.data().exchanges && data.data().returns ? " / Exchange" : "Exchange"}</h1>
    <h1>in {data.data().returnExchangeDays} days</h1>
  </div>
  <div className='w-full px-3'>
  <button className='flex text-lg font-medium text-white justify-center items-center border  bg-black w-full py-1.5 ' onClick={()=>handleAddToCart(data,id)} >Add to bag</button>

  </div>

</div>
<div>
<div className=' px-3 '>
             
             <div className=''>
         
         
         {data.data().personalisationDescription &&
             <div className=''>
               <div className='flex  mb-5 justify-start items-end'>
               <h1 className='text-xl font-semibold pr-2'>Customization </h1>
               <p className='leading-loose'>{data.data().personalisationOptional && "(optional)"}</p>
               </div>
               <p>{data.data().personalisationDescription}</p>
               <input placeholder='Enter the customization' className='h-12  w-72 mt-12 shadow-inner rounded-lg bg-slate-100 p-3 outline-none' type="text" />
             </div>
             }
             {data.data().materials &&
         <div>
         <h1 className='mb-3 font-semibold text-xl'>Details:</h1>
           <div>
             {data.data().materials && data.data().materials.map(material=>
               <h1 className=''><span className='font-medium text-sm leading-loose mr-1'>{material.materialKey}</span>: <span className='ml-5 text-sm'>{material.materialValue}</span></h1>
             )}
             </div>
             </div>
           }
             {data.data().descriptions &&
             <div className='mt-8 lg:mb-0'>
              <h1 className='text-xl font-semibold mb-5' >Description:</h1>
             <ul className='text-xs'>
             { data.data().descriptions.map(des=>
               
               <div>
               {des.type==="point" &&
         <ul className=''>
         {
           <li className='list-disc leading-loose ml-4 '>
            <div className='flex  items-start'>
          <p>{des.description}</p>
         </div>
           </li>
         }
       </ul>
         }
         {des.type==="paragraph" &&
         <div className='flex leading-relaxed my-5 items-start'>
          <p className=''>{des.description}</p>
         </div>           
         }
               </div>  
               )}
             </ul>
             </div>
         }
         
       </div>
           </div>
           <div className='text-sm px-3 '>
           <CommentsPublic className="" id={id} currentUser={currentUser} />
           </div>
</div>

         
              </div>
        </div>
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

export default Product