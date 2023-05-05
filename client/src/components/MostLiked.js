import React from 'react'

const MostLiked = () => {
  return (
    <div className='flex justify-center flex-col items-center mb-20 px-5'>
            <h1 className='text-3xl font-semibold pb-10'>Most Loved Products</h1>
            <div className='bg-yellow-200 py-10 w-full rounded-2xl flex justify-around items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-40 rounded-xl" src="https://images.mamaearth.in/catalog/product/o/n/onion-hair-shampoo-250ml-with-ingredient_2.jpg?fit=contain&width=400&height=400" alt="" />
                    <h1 className='mt-4 font-semibold '>Rs.150/-</h1>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-40 rounded-xl" src="https://images.mamaearth.in/catalog/product/u/b/ubtan.jpg?fit=contain&width=400&height=400" alt="" />
                    <h1 className='mt-4 font-semibold '>Rs.299/-</h1>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-40 rounded-xl" src="https://images.mamaearth.in/catalog/product/v/i/vit-c-face-wash-1.jpg?fit=contain&width=400&height=400" alt="" />
                    <h1 className='mt-4 font-semibold '>Rs.149/-</h1>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-40 rounded-xl" src="https://images.mamaearth.in/catalog/product/u/b/ubtan_face_mask_1.jpg?fit=contain&width=400&height=400" alt="" />
                    <h1 className='mt-4 font-semibold '>Rs.199/-</h1>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-40 rounded-xl" src="https://images.mamaearth.in/catalog/product/a/r/artboard_3_3.png?fit=contain&width=400&height=400" alt="" />
                    <h1 className='mt-4 font-semibold '>Rs.350/-</h1>
                </div>
            </div>
    </div>
  )
}

export default MostLiked