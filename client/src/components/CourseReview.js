import { async } from '@firebase/util'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import DeleteIcon from '@mui/icons-material/Delete';

const CourseReview = ({id,currentUser}) => {
const [comment,setComment]=useState()
const [comments,setComments]=useState([])
const [userName,setUserName]=useState()
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() 
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
const fetchUserName=async()=>{
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap)
}

//   let newDate = new Date()
//   let date = newDate.getDate();
//   // month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   // month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ]
// const monthsWith31=["Jan",  "Mar",  "May",
// "Jul", "Aug",  "Oct",  "Dec"]
// const monthsWith30=[
//   "Apr", "Jun",
//   "Sep", "Nov",
// ]
//   let month = newDate.getMonth() 
//   console.log(date);
//   console.log();
 
//   if(monthsWith31.includes(monthNames[month])){
//     if(date+start > 31){
//       deldate - 31 
//     }
   
//   }



useEffect(() => {
 fetchUserName()
}, [currentUser])

const handleComment=(e)=>{
setComment(e.target.value)
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    const docRef = doc(db, "learning", id);
    const colRef = collection(docRef, "comments")
    await addDoc(colRef, {
        userName:userName && userName.data().userName || "user",
        comment:comment,
        userId: currentUser && currentUser.uid,
        date:{
            day:date,
            month: monthNames[month]
        }
        }).then(()=>{
            setComment("")
            async function fetchCommentData() {
                const docRef = doc(db, "learning", id);
                const docSnap = await getDoc(docRef);
                let data={
                    comment:parseInt(docSnap.data().comment)+1
                }
                updateDoc(docRef, data)
            }
            fetchCommentData()
        })
}
   async function fetchComments() {
    const querySnapshot = await getDocs(collection(db, `learning/${id}/comments`));
     setComments(querySnapshot.docs)
    }
    useEffect(() => {
        fetchComments()
       }, [])
    useEffect(() => {
        fetchComments()
       }, [handleSubmit])

const handleDelete=(commentId)=>{
    const docRef = doc(db, `learning/${id}/comments`, commentId);
    
    deleteDoc(docRef).then(()=>{
        async function fetchCommentData() {
            const docRef = doc(db, "learning", id);
            const docSnap = await getDoc(docRef);
            let data={
                comment:parseInt(docSnap.data().comment)-1
            }
            updateDoc(docRef, data)
        }
        fetchCommentData()
    })
}

  return (
    <div>
        <div className='flex flex-col items-start  w-full justify-start '>
        <div className='text-2xl hidden lg:block font-semibold ml-10 mb-5 '>
            Reviews:
        </div>
        <div className='w-full flex mb-12 lg:mb-20 px-4 lg:ml-10'>
            <div className='w-full'>
                {comments[0] ? comments.map((com)=>(
                    <div className='flex justify-between items-center  lg:pr-20 w-full mt-7 lg:mt-10'>
                    <div className='flex justify-cenetr flex-col text-black '>
                   <div className='flex items-end'>
                   <h1 className='italic lg:text-xl underline underline-offset-4'>
                      {com && com.data().userName}
                    </h1>
                    <div className='lg:text-sm text-xs ml-5 text-gray-500'>
                    {com && com.data().date.month} - {com && com.data().date.day}
                    </div>
                   </div>
                    <h1 className='pl-2 text-sm lg:text-base lg:mt-8 mt-5 '>
                    "{com && com.data().comment}"
                    </h1>
                    </div>
                    <div>
                        {currentUser.uid === com.data().userId && <DeleteIcon className='text-gray-500 hover:text-red-600 transition-all duration-1000 cursor-pointer' onClick={()=>handleDelete(com.id)}/> }
                    </div>
                    </div>
                ))
                :
                <div>
                    Be the first person to make a review.
                </div>
                }
            </div>
        </div>
        <div className='w-full px-4 mb-20'>
            <div className='w-full'>
                <form onSubmit={(e)=>{
                        handleSubmit(e)
                    }}  className='flex w-full  justify-start items-center'>
                    <input onChange={(e)=>{
                        handleComment(e)
                    }} value={comment} className='h-12 border p-4 w-3/4  lg:text-xl font-medium outline-none' placeholder='comment your thoughts..' type="text" />
                    <button onSubmit={(e)=>{
                        handleSubmit(e)
                    }} className='bg-black text-white outline-none h-12 w-1/4 text-sm lg:text-lg font-medium'>Submit</button>
                </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CourseReview