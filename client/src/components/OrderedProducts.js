import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const OrderedProducts = ({data}) => {

    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()

    let date = data && data.data().date.day
    let month = data && data.data().date.month
    
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
  


  return (
    
          <div className='flex w-full'>
                            <div className='w-1/4 flex  '>
                    <Link className='outline-none'  to={`/products/${data.data().id}`}>
                            
                                <img className='lg:w-40 w-20 h-20 lg:h-40' src={data.data().images[0].imageUrl} alt={data.data().images[0].imageName} />
                    </Link>
                    {/* <Link className='outline-none lg:hidden '  to={`/products/${data.data().id}`}>
                                <h1 className='text-2xl font-medium mb-3 '>{data.data().productName}</h1>
                    </Link> */}
                            </div>
                            <div className='lg:pl-5 w-3/4'>
                    <Link className='outline-none '  to={`/products/${data.data().id}`}>
                                <h1 className='lg:text-2xl font-medium mb-1 lg:mb-3 '>{data.data().productName}</h1>
                    </Link>
                                <div className='lg:h-16 '>
                                <p className='w-full text-xs hidden lg:block  lg:text-sm'>{data.data().descriptions[0].description.slice(0,150)}</p>
                                <p className='w-full text-xs lg:hidden  lg:text-sm'>{data.data().descriptions[0].description.slice(0,100)}</p>

                                </div>
                                <div className='flex justify-between items-center font-medium pt-2 lg:py-3  mt-1 lg:mt-2 '>
   
                                <div className='lg:text-base text-sm cursor-pointer flex '>
    Arriving on {endDate && endDate.date} {endDate && endDate.month}
    </div>
    <div className='  hover:text-blue-600 lg:text-base text-sm hover:underline underline-offset-2 cursor-pointer'>
   See more
    </div>
    
  </div>
                                
                            </div>
                            </div>
  )
}

export default OrderedProducts