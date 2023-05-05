import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const Cartproducts = ({product,currentUser}) => {
    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() 
    
    let startDate1 = date + (product && parseInt(product.data().deliveryDetails.processingTime.start))
  let endDate1 = date + (product && parseInt(product.data().deliveryDetails.processingTime.end))
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

    const handleRemove=(id)=>{
        const docRef = doc(db, `users/${currentUser.uid}/cart`, id);
        
        deleteDoc(docRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.")
      })
      .catch(error => {
          console.log(error);
      })
      }

    const handleDecrement=async(product)=>{
     
        const docRef1 = doc(db, `users/${currentUser.uid}/cart`, product.id);
        const data1 = {
        productName : product.data().productName,
        quantityCart: product.data().quantityCart>1 ? product.data().quantityCart-1 : 1,
        price:product.data().price,
          };
        updateDoc(docRef1, data1)
        console.log("updating")

    
}
const handleIncrement=async(product)=>{

       const docRef1 = doc(db, `users/${currentUser.uid}/cart`, product.id);
       const data1 = {
        productName : product.data().productName,
       quantityCart:product.data().quantityCart+1,
       price:product.data().price,
         };
       updateDoc(docRef1, data1)
       console.log("updating")

   
}



  return (
    <div className='w-full'>
        <ul className='flex justify-center flex-col flex-wrap items-start mb-16 '>

{product &&
  <li className=' p-5 pb-10 border-b w-full  flex items-center justify-center' key={product.id}>
    <div className='flex w-full justify-between px-5'>
    {/* <Link className='outline-none'  to={`/products/${product.id}`}>
    </Link> */}
      <div className='flex items-start  py-2'>
        <img className='h-40 w-40 object-cover' src={product.data().images[0].imageUrl} alt="" />
      <div className='pl-14'>
      <h1 className='text-2xl font-medium'>{product.data().productName}</h1> 
      <h1 className='mt-5 text-sm'>Qty:</h1>
      <div className='flex mt-4 text-sm  items-center'>
        
        <div className='cursor-pointer   rounded-md flex items-center justify-center py-0.5 px-3 bg-gray-100' onClick={()=>handleDecrement(product)}>-</div>
      <div className='mx-5'>
      {product.data().quantityCart}
      </div>
      <div className='cursor-pointer  rounded-md flex items-center justify-center py-0.5 px-3 bg-gray-100' onClick={()=>handleIncrement(product)}>+</div>
      </div>
      <div className='flex items-center mt-5'>
      <button className='cursor-pointer  font-medium bg-gray-100 py-1 px-3 rounded-md flex justify-center items-center mt-5' onClick={()=>{handleRemove(product.id)}}>Remove</button>
      </div>
      </div>
      </div>
      <div className=' flex justify-start flex-col items-end'>

    
      <div className='flex mb-1 items-center'>
            <CurrencyRupeeIcon className='' fontSize='string'/>
            <h1 className='text-lg font-semibold'>{product.data().price}<span className='text-base font-normal'>.00</span></h1>
        </div>
        <div className='flex items-center mb-5'>
        <CurrencyRupeeIcon className='' fontSize='string'/>
        <h1 className='line-through decoration-2 '>800</h1>
        </div>
        {parseInt(product.data().quantity) < 6 ?
                <div>
                {
               parseInt(product.data().quantity)  &&
               <div className='  '><span className=''> </span><span>Only {parseInt(product.data().quantity)} left!</span></div>
             }
             </div>
                
                :
                <div>
                {
                parseInt(product.data().quantity) > 0 &&
                <div className='  '><span className=''> </span><span>In stock</span></div>
              }
               </div>
              }
      <div className=' mt-2'>
        Sale: 10% off
      </div>
      <div className='mt-14 flex flex-col items-end'>
              <div>
                Delivery: <span className='text-orange-500 ml-1'>FREE</span>
              </div>
              <div className='flex text-sm text-gray-600 items-center mt-2'>
                <div className=''>
                    Estimated delivery:
                </div>
                {
                    startDate && endDate &&
                    <div className='ml-2'>
                {startDate.date} {startDate.month} - {endDate.date} {endDate.month}
                </div>
                }
              </div>
      </div>
      </div>
    </div>
  </li>
  }
</ul>
        
    </div>
  )
}

export default Cartproducts