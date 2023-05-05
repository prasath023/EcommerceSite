import { async } from '@firebase/util'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import DeleteIcon from '@mui/icons-material/Delete';

const CourseReviewPublic = ({id,currentUser}) => {

    const [comments,setComments]=useState([])




    async function fetchComments() {
        const querySnapshot = await getDocs(collection(db, `learning/${id}/comments`));
         setComments(querySnapshot.docs)
        }
        useEffect(() => {
            fetchComments()
           }, [])
           useEffect(() => {
            fetchComments()
           }, [currentUser])
  return (
    <div className='flex flex-col items-start mt-2 w-full justify-start '>
    <div className='lg:text-2xl text-lg font-semibold  mb-1 '>
        Reviews:
    </div>
    <div className='w-full flex mb-20'>
        <div className='w-full'>
            {comments[0] ? comments.map((com)=>(
                <div className='flex justify-between items-center  pr-20 w-full mt-4 mb-6 lg:mt-10'>
                <div className='flex justify-cenetr flex-col text-black '>
               <div className='flex items-end'>
               <h1 className='italic lg:text-xl underline underline-offset-4'>
                  {com && com.data().userName}
                </h1>
                <div className='lg:text-sm text-xs ml-5 text-gray-500'>
                {com && com.data().date.month} - {com && com.data().date.day}
                </div>
               </div>
                <h1 className='ml-2 text-sm mt-5 lg:mt-8 '>
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

export default CourseReviewPublic