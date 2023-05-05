import { async } from '@firebase/util'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import DeleteIcon from '@mui/icons-material/Delete';

const CommentsPublic = ({id,currentUser}) => {

    const [comments,setComments]=useState([])




    async function fetchComments() {
        const querySnapshot = await getDocs(collection(db, `products/${id}/comments`));
         setComments(querySnapshot.docs)
        }
        useEffect(() => {
            fetchComments()
           }, [])
           useEffect(() => {
            fetchComments()
           }, [currentUser])
  return (
    <div className='flex flex-col mt-7 items-start lg:ml-10  w-full justify-start '>
    <div className='lg:text-2xl text-xl font-semibold  mb-5 '>
        Reviews:
    </div>
    <div className='w-full flex mb-20 '>
        <div className='w-full'>
            {comments[0] ? comments.map((com)=>(
                <div className='flex justify-between items-center  lg:pr-20 w-full mt-10'>
                <div className='flex justify-cenetr flex-col text-black '>
               <div className='flex items-end'>
               <h1 className='italic lg:text-xl text-base underline underline-offset-4'>
                  {com && com.data().userName}
                </h1>
                <div className='text-sm pl-5 text-gray-500'>
                {com && com.data().date.month} - {com && com.data().date.day}
                </div>
               </div>
                <h1 className='pl-2 lg:mt-8  mt-6'>
                "{com && com.data().comment}"
                </h1>
                </div>
                </div>
            ))
            :
            <div>
                No reviews yet.
            </div>
            }
        </div>
    </div>
    
    </div>

  )
}

export default CommentsPublic