import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import CourseReview from './CourseReview';
import { db } from './firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import hash from "hash.js"
import "../css/EnrolledCourse.css"
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import HeaderLearn from './HeaderLearn';


const EnrolledCourse = ({currentUser}) => {
    let { id } = useParams();
    const [data,setData]=useState('')
    const [subTopicsOpen,setSubTopicsOpen]=useState(false)
    const [subTopicsClose,setSubTopicsClose]=useState(false)
    const [topics,setTopics]=useState('')
    const [topicData,setTopicData]=useState([])
    const [topicDataCopy,setTopicDataCopy]=useState([])
    const [subTopics,setSubTopics]=useState('')
    const [orderId,setOrderId]=useState('')
    const [openContent,setOpenContent]=useState(true)
    const [openReq,setOpenReq]=useState(false)
    const [openReviews,setOpenReviews]=useState(false)
    const [openOverView,setOpenOverView]=useState(false)
    const [order_Id,setOrder_Id]=useState('')
    const [orderSuccessfull,setOrderSuccessfull]=useState(false)
    const [paymentId,setPaymentId]=useState('')
    const [activeVideo,setActiveVideo]=useState('')
    const [orderSignature,setOrderSignature]=useState('')

    const [openMenu,setOpenMenu]=useState(false)

  const handleOpenMenu=(pass)=>{
      setOpenMenu(pass)
  }

    async function fetchData() {
      const docRef = doc(db, `users/${currentUser.uid}/courses`,id);

        const docSnap = await getDoc(docRef);
        setTopics(docSnap.data().topics)
        
        setTopicData(docSnap.data().topics.map(top=>
          (
             {
              topicName: top.topic.topicName,
              subTopicsLength: top.topic.subTopics.length,
              subTopics:'',
              open:false,
            }
          )
          ))
          setTopicDataCopy(docSnap.data().topics.map(top=>
            (
               {
                topicName:top.topic.topicName,
                subTopicsLength: top.topic.subTopics.length,
                subTopics:"",
                open:false,
              }
            )
            ))
        setData(docSnap)
    }
    useEffect(() => {
     fetchData()
    
    }, [])
    
  
    // useEffect(() => {
      
     
    //  }, [topics])
    //  useEffect(() => {
    //   topics && topics.map(topic=>{
    //    setTopicData([...topicData,{
    //     topicName:topic.topicName
    //    }])
    //   })
     
    //  }, [])
    // console.log(topicData && topicData);
   

 
  
    

  
      // const handleList=(index)=>{
      //   console.log("clicked",index);
      //   // setSubTopics(topics[index].data())
      //   // setSubTopics(topics[index].topic.subTopics)
      //   if(subTopicsOpen){
          
      //     setSubTopicsOpen(false)

      //   }
      //   if(subTopicsClose){
      //     setTopicData(topicDataCopy)
      //     setSubTopicsClose(false)
      //   }
       
      // }
      const handleOpen=(index)=>{
        const newTopicData=[...topicData];
        newTopicData[index].subTopics=topics[index].topic.subTopics;
        newTopicData[index].open=true;
        setTopicData(newTopicData)
      }
      const handleClose=(index)=>{
       const newTopicData=[...topicData];
       newTopicData[index].subTopics=[];
       newTopicData[index].open=false;
       setTopicData(newTopicData)
      }
    const handleTick=(course,topic,subTopic,id)=>{
      const docRef1 = doc(db, `users/${currentUser.uid}/courses`, course.id);
      const data1 = {
       
          };
        updateDoc(docRef1, data1)
    }
    const handleRemoveTick=(course)=>{
      const docRef1 = doc(db, `users/${currentUser.uid}/courses`, course.id);
      const data1 = {
        completed:false,
          };
        updateDoc(docRef1, data1)
    }

    // useEffect(() => {
    //   fetchData()
     
    //  }, [handleTick,handleRemoveTick])



  return (
    <div className='w-screen flex justify-center flex-col items-center mx-auto'>
                  <HeaderLearn openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>


       
        {data &&
        <div>
        <div className='lg:flex hidden w-full justify-around  items-start'>
        <div className=' containerLeft border-r-2 '>
           <div className='w-full'>
          
            {
                activeVideo ?

           <video controls className='w-full outline-none' src={activeVideo.videoUrl.videoUrl}/>
                :
           <video controls className='w-full outline-none' src={data.data().preview.videoUrl} alt={data.data().preview.videoName}/>

            }
           <div>
            
            <div className='px-10 pb-16'>
           {data.data().descriptions &&
              <div className='mt-12'>
               <h1 className='text-2xl font-semibold mb-5' >Description:</h1>
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

            {
              <ul className=''>
                {data.data().requirements && 
                <h1 className='text-2xl mt-12 font-semibold mb-5'>Requirements:</h1>
                }
              {data.data().requirements.map((req)=>
               <li className='list-disc leading-loose ml-4'>
                {req}
               </li> 
              )}
              </ul>
            }

            {
              data.data().whoLearn &&
              <div>
                <h1 className='text-2xl mt-12 font-semibold mb-5'>Who this course is for:</h1>
                <p>{ data.data().whoLearn }</p>
              </div>
            }

          {
              data.data().whatLearn &&
              <div>
                <h1 className='text-2xl mt-12 font-semibold mb-5'>What you'll learn:</h1>
                <p>{ data.data().whatLearn }</p>
              </div>
            }



           
           </div>
           </div>
           </div>
           <div className=''>
            <CourseReview id={id} currentUser={currentUser}/>
        </div>
        </div>
        <div className='containerRight hidden sticky right-0 top-0 pt-5 lg:flex flex-col pl-5 pr-5 mb-5 justify-start items-start'>
        <ul className='mb-10'>
              {topicData && 
              <h1 className='text-xl font-semibold mb-5'>Course content</h1>
              }
              {topicData && topicData.map((c,index)=>
            <li key={index} className="bg-white relative w-full flex-wrap  flex flex-col justify-center items-start border pt-5 cursor-pointer" >
             <div className='w-full'>
             <div className='flex w-full justify-start pb-5  items-center'>
                {
                  !c.open ? 
                  <div onClick={()=>{
                  
                   handleOpen(index)
                  }} className='text-xl absolute   w-full  h-16  flex justify-start pl-5 items-center  bg-transparent font-bold'>
                   <KeyboardArrowDownSharpIcon />
                  </div>
                  :
                  <div onClick={()=>{
                   handleClose(index)
                    
                  }} className='text-xl absolute  w-full  h-16 flex justify-start pl-5  items-center  bg-transparent font-bold'>
                  <KeyboardArrowUpSharpIcon />
                </div>
                }
             <div className='ml-14 pr-5 w-full flex justify-between items-center'>
             <h1 className={`w-3/4 font-semibold mr-1 ${c.open && " "}`}>
              {
                c.topicName
              }
              
            </h1>
            <h1 className='w-1/4 text-xs font-medium'>
            {
                c.subTopicsLength 
              } 
              {
                c.subTopicsLength > 1 ? " lectures" : " lecture"
              }
            </h1>
             </div>
             </div>
             <div className={`text-sm bg-white ${c.open && "w-full pb-5 "}`}>
              {
                c.subTopics && c.subTopics.map((sub,index)=>
                  <div  className='pl-5 pr-2 w-full mt-0'>
                   <div className='w-full flex justify-start items-center mt-3'>
                    <div className='w-1/5 flex justify-center items-center'>
                    {
                      sub.completed ? 
                    <div onClick={()=>handleRemoveTick(data,c,sub,index)} className='h-3 w-3 mr-4  bg-blue-600 border'></div>
                      : 
                    <div onClick={()=>handleTick(data,c,sub,index)} className='h-3 w-3 mr-4 border-black  border'></div>
                    }
                   <PlayCircleIcon style={{fontSize:"14px"}} className='' />
                   </div>
                    <h1  onClick={()=>setActiveVideo(sub)}  className='flex w-4/5 flex-wrap '>
                      {sub.subTopic}
                    </h1>
                   </div>
                  </div>
                  )
              }
             </div>
             </div>
             
            </li>
              )
            }
            </ul>
            
        </div>
        </div>
        <div className='lg:hidden flex flex-col'>
          
            <div className=' flex justify-start w-full px-2 items-center my-4'>
            <h1 className="text-lg font-semibold">{data.data().courseName}</h1>
            </div>
            
            <div className='w-full'>
            {
                activeVideo ?

           <video controls className='w-full outline-none' src={activeVideo.videoUrl.videoUrl}/>
                :
           <video controls className='w-full outline-none' src={data.data().preview.videoUrl} alt={data.data().preview.videoName}/>

            }
           </div>

            <div>
              <ul className='flex justify-between px-4 py-4  items-center'>
                <li onClick={()=>{
                  setOpenContent(true)
                  setOpenOverView(false)
                  setOpenReq(false)
                  setOpenReviews(false)
                }} className='text-sm cursor-pointer font-medium'>Content</li>
                <li onClick={()=>{
                  setOpenContent(false)
                  setOpenOverView(true)
                  setOpenReq(false)
                  setOpenReviews(false)
                }} className='text-sm cursor-pointer font-medium'>Overview</li>
                <li onClick={()=>{
                  setOpenContent(false)
                  setOpenOverView(false)
                  setOpenReq(true)
                  setOpenReviews(false)
                }} className='text-sm cursor-pointer font-medium'>Requirements</li>
                <li onClick={()=>{
                  setOpenContent(false)
                  setOpenOverView(false)
                  setOpenReq(false)
                  setOpenReviews(true)
                }} className='text-sm cursor-pointer font-medium'>Reviews</li>
              </ul>
              <div>
                {
                  openContent && 

                  <ul className='mb-10'>
              
              {topicData && topicData.map((c,index)=>
            <li key={index} className="bg-white relative w-full flex-wrap  flex flex-col justify-center items-start border pt-5 cursor-pointer" >
             <div className='w-full'>
             <div className='flex w-full justify-start pb-5  items-center'>
                {
                  !c.open ? 
                  <div onClick={()=>{
                  
                   handleOpen(index)
                  }} className='text-xl absolute   w-full  h-16  flex justify-start pl-5 items-center  bg-transparent font-bold'>
                   <KeyboardArrowDownSharpIcon fontSize='small' />
                  </div>
                  :
                  <div onClick={()=>{
                   handleClose(index)
                    
                  }} className='text-xl absolute  w-full  h-16 flex justify-start pl-5  items-center  bg-transparent font-bold'>
                  <KeyboardArrowUpSharpIcon fontSize='small' />
                </div>
                }
             <div className='ml-14 pr-5 w-full flex justify-between items-center'>
             <h1 className={`text-sm w-3/4 font-semibold mr-5 ${c.open && " "}`}>
              {
                c.topicName
              }
              
            </h1>
            <h1 className='text-xs w-1/4 font-medium'>
            {
                c.subTopicsLength 
              }
              {
                c.subTopicsLength > 1 ? " lectures" : " lecture"
              }
            </h1>
             </div>
             </div>
             <div className={`text-sm bg-white ${c.open && "w-full pb-5 "}`}>
              {
                c.subTopics && c.subTopics.map(sub=>
                  <div onClick={()=>setActiveVideo(sub)} className='pl-8 pr-2 w-full mt-0'>
                   <div className='w-full flex items-center mt-3'>
                   <PlayCircleIcon style={{fontSize:"14px"}} className='mr-4' />
                    <h1    className=' '>
                      {sub.subTopic}
                    </h1>
                   </div>
                  </div>
                  )
              }
             </div>
             </div>
             
            </li>
              )
            }
            </ul>

                }
                {
                  openOverView && 

                  <div className='mb-5'>
                   {data.data().descriptions &&
              <div className=' mt-5  lg:mt-12 px-4'>
              <ul className='text-xs'>
              { data.data().descriptions.map(des=>
                
                <div>
                {des.type==="point" &&
          <ul className='text-xs'>
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

                }
                {
                  openReviews && 

                  <div>
                 <CourseReview id={id} currentUser={currentUser}/>
                  </div>

                }
                {
                  openReq && 

                  <div>
                   {
              <ul className='px-4 mt-5'>
                
              {data.data().requirements.map((req)=>
               <li className='list-disc text-sm leading-loose ml-4'>
                {req}
               </li> 
              )}
              </ul>
            }
                  </div>

                }
                
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

export default EnrolledCourse