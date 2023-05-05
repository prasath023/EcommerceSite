import React from 'react'
import "../css/Offer.css"
import ss1 from "../assets/ss1.png"
import ss2 from "../assets/ss2.png"
import ss3 from "../assets/ss3.png"
const Offer = () => {
  return (
    <div className='mb-10 px-5 border-b-2 border-black pb-10 flex justify-center items-center flex-col'>
    <h1 className='text-3xl font-semibold py-10'>Offers</h1>
    <div className='bg-orange-200 rounded-2xl relative pt-14 px-5 w-full flex flex-wrap justify-around items-center'>
        <div className='mb-10 offerH flex justify-center items-center' >
        <img className='offerH object-cover' src={ss1} alt="" />
        <div className='offerH px-8 pt-64 pb-1 absolute'>
            <div className='w-full flex justify-center items-center rounded-lg  h-24 bg-white'>
                <h1 className='text-lg font-medium text-orange-600'>Upto 50% off</h1>
            </div>
        </div>
        </div>

        <div className='mb-10 offerH flex justify-center items-center' >
        <img className='offerH object-cover' src={ss2} alt="" />
        <div className='offerH px-7 pt-64 pb-1 absolute'>
            <div className='w-full flex justify-center items-center rounded-lg  h-24 bg-white'>
                <h1 className='text-lg font-medium text-orange-600'>Upto 50% off</h1>
            </div>
        </div>
        </div>
        <div className='mb-10 offerH flex justify-center items-center' >
        <img className='offerH object-cover' src={ss3} alt="" />
        <div className='offerH px-6 pt-64 pb-1 absolute'>
            <div className='w-full flex justify-center items-center rounded-lg  h-24 bg-white'>
                <h1 className='text-lg font-medium text-orange-600'>Upto 50% off</h1>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Offer