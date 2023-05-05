import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import CourseReview from './CourseReview';
import { db } from './firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import DoneIcon from '@mui/icons-material/Done';
import hash from "hash.js"
import "../css/Course.css"
import CloseIcon from  '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import CourseReviewPublic from './CourseReviewPublic';
import Header from './Header';
import HeaderLearn from './HeaderLearn';

const Course = ({currentUser}) => {
    let { id } = useParams();
    const [data,setData]=useState('')
    const [subTopicsOpen,setSubTopicsOpen]=useState(false)
    const [subTopicsClose,setSubTopicsClose]=useState(false)
    const [topics,setTopics]=useState('')
    const [topicData,setTopicData]=useState([])
    const [topicDataCopy,setTopicDataCopy]=useState([])
    const [subTopics,setSubTopics]=useState('')
    const [orderId,setOrderId]=useState('')
    const [openReq,setOpenReq]=useState(false)
    const [enKeys,setEnKeys]=useState('')
    const [order_Id,setOrder_Id]=useState('')
    const [orderSuccessfull,setOrderSuccessfull]=useState(false)
    const [paymentId,setPaymentId]=useState('')
    const [lecturesLength,setLecturesLength]=useState('')
    const [orderSignature,setOrderSignature]=useState('')

    const [comments,setComments]=useState([])
    const [openMenu,setOpenMenu]=useState(false)
    const [favKeys,setFavKeys]=useState([])
    const [favData,setFavData]=useState([])
  
    
  async function fetchFav() {
    const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/favouriteCourse`));
     setFavData(querySnapshot.docs)
     setFavKeys(querySnapshot.docs.map(doc=>doc.id));
    }

    const removeFromFav=(product)=>{
      const docRef = doc(db, `users/${currentUser.uid}/favouriteCourse`, product.id);
     
      deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
    }
    
const addToFav=async(data)=>{
  const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "favouriteCourse")
        const ref= doc(colRef,data.id)
       
        await setDoc(ref, {
          courseName: data.data().courseName,
          coursePrice: data.data().coursePrice,
         
          descriptions: data.data().descriptions,
          reviews: data.data().reviews,
          topics: data.data().topics,
          
          sold:data.data().sold,
          comment:data.data().comment,
         enrolled:data.data().enrolled,
         level: data.data().level,
         tags: data.data().tags,
         preview: data.data().preview,
         whatLearn: data.data().whatLearn,
         whoLearn: data.data().whoLearn,
         courseProject: data.data().courseProject,
         requirements: data.data().requirements,
                   });
  }
  useEffect(() => {
    fetchFav()

   }, [])
   useEffect(() => {
    fetchFav()
  // handleFavData()

   }, [addToFav,removeFromFav])


    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
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
           }, [currentUser])


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/signin`; 
      navigate(path);
    }

    async function fetchData() {
        const docRef = doc(db, "learning", `${id}`);
        const docSnap = await getDoc(docRef);
        setTopics(docSnap.data().topics)
        let lectures=0
        docSnap.data().topics.map(top=>{
          lectures +=top.topic.subTopics.length
        })
        setLecturesLength(lectures && lectures)
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
   
    async function fetchEnrolled() {
      const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/courses`));
       setEnKeys(querySnapshot.docs.map(doc=>doc.id));
      }
      useEffect(() => {
        fetchEnrolled()
      }, [])
      
    const handleAfterEnrolement=async(response,idd,data)=>{
     
      if(response){

          
          
          const docRef = doc(db, "users", currentUser.uid);
          const colRef = collection(docRef, "courses")
          const ref= doc(colRef,data.id)
         
          await setDoc(ref, {
              courseName: data.data().courseName,
              coursePrice: data.data().coursePrice,
             
              descriptions: data.data().descriptions,
              reviews: data.data().reviews,
              topics: data.data().topics,
              
              sold:data.data().sold,
              comment:data.data().comment,
             enrolled:data.data().enrolled,
             level: data.data().level,
             tags: data.data().tags,
             preview: data.data().preview,
             whatLearn: data.data().whatLearn,
             whoLearn: data.data().whoLearn,
             courseProject: data.data().courseProject,
             requirements: data.data().requirements,
              });
          
              const docRef1 = doc(db, `learning/${id}`);
              const data1 = {
                sold:data.data().sold+1,

                };
              updateDoc(docRef1, data1)
              console.log("updating")


      }

    }

  
    

    const handleEnrole=async(price,data)=>{
       if(currentUser==="no user"){
        routeChange()
       }else{
        const result = await axios.post("http://localhost:5000/payment/orders",{
          amount:price
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: "rzp_test_odY3sbinsFsLcH", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Prasath Corp.",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
             
                   handleAfterEnrolement(response,order_id,data)

            },
            prefill: {
                name: "Prasath",
                email: "prasath@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Prasath Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
        let pay= new window.Razorpay(options);
        pay.open()
       }
      }

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
    

  return (
    <div className='w-screen flex justify-center flex-col items-center mx-auto'>
          <HeaderLearn openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

        {data &&
        <div>
        <div className='lg:flex hidden w-full justify-around  items-start'>
        <div className=' containerLeft pl-16 mt-12 border-r-2 pr-16 '>
           <div className='w-full'>
           <video controls className='w-full outline-none' src={data.data().preview.videoUrl} alt={data.data().preview.videoName}/>
           <div>
            

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



            <ul className='mb-20'>
              {topicData && 
              <h1 className='text-2xl mt-12 font-semibold mb-10'>Course content:</h1>
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
             <h1 className={`font-semibold ${c.open && " "}`}>
              {
                c.topicName
              }
              
            </h1>
            <h1 className='text-xs font-medium'>
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
                  <div className='pl-8 pr-2 w-full mt-0'>
                   <div className='w-full flex items-center mt-3'>
                   <PlayCircleIcon style={{fontSize:"14px"}} className='mr-4' />
                    <h1 className=' '>
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
           <CourseReviewPublic id={id} currentUser={currentUser} />
        </div>
        <div className='containerRight sticky right-0 top-0 pt-10 flex flex-col ml-5 pl-5 pr-5 mb-5 justify-start items-start'>
            <div className=' flex justify-start w-full items-center mb-4'>
            <h1 className="text-2xl font-bold">{data.data().courseName}</h1>
            </div>
            <div className=' flex justify-center items-center '>
            <h1 className=' pr-2 text-xl font-semibold border-slate-600'>
            {data.data().sold} <span className='text-sm ml-1 font-medium'>Students</span>
           </h1>
            <h1 className="text-sm text-gray-700 ml-2 font-medium "> <span className='text-xl mr-1 font-semibold '>{comments && comments.length}</span> Reviews</h1>
            </div>  
        
            <div className='flex justify-between  mt-7 mb-10 items-center'>
                <div className='flex justify-start items-center'>
                <CurrencyRupeeIcon style={{fontSize:"28px"}}/>
                <h1 className='text-2xl font-bold'>{data.data().coursePrice}</h1>
                </div>
                <div className='flex ml-2 text-gray-500  line-through decoration-2 relative justify-center items-center'>
                <CurrencyRupeeIcon style={{fontSize: '15px',textDecorationLine: "lineThrough"}}/>
                  <h1 className=' text-gray-500   '>{4000}</h1>
                </div>
                <div className='ml-3 text-sm'>
                  <h1>5% Off</h1>
                </div>
            </div>
               {
                enKeys.includes(data.id) ?
                <Link className='outline-none w-full' key={data.id}  to={`/learn/courses/enrolled/${data.id}`}> <button className='outline-none text-white mt-2  flex items-center justify-center w-full text-lg font-medium  h-10 bg-black'>Go to course</button></Link>
                :
                <button onClick={()=>handleEnrole(data.data().coursePrice,data)} className='outline-none text-white mt-2  flex items-center justify-center w-full text-lg font-medium  h-10 bg-black'>Enrole now</button>
               }
        <div className='border-t-2 w-full pt-10 text-gray-600 mt-10'>
            <div className='mb-3  flex justify-start items-center'>
            <PermIdentityOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {data.data().sold} Students
            </h1>
            </div>
            <div className='mb-3  flex justify-start items-center'>
            <LayersOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {
              topics.length 
            } Sections
            </h1>
            </div>
            <div className='mb-3  flex justify-start items-center'>
            <TheatersOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {lecturesLength && lecturesLength} Lectures
            
            </h1>
            </div>
            <div className='mb-3  flex justify-start items-center'>
            <BarChartOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
              Level: <span className='text-orange-500'>{data.data().level}</span>
            </h1>
            </div>
            <div className='mb-3  flex justify-start items-center'>
            <SentimentSatisfiedAltOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            Online and at your own pace
            </h1>
            </div>
           
            <div className='mb-3  flex justify-start items-center'>
            <VolumeUpOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            Audio: English
            </h1>
            </div>
            <div className='mb-3  flex justify-start items-center'>
            <AllInclusiveOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
              Unlimited access forever
            </h1>
            </div>
        </div>
        </div>
        </div>
        <div className='lg:hidden flex flex-col'>
            <div className='text-xs py-3 px-4 text-orange-500 font-medium'>
              category > subcategory
            </div>
            <div className='w-full'>
           <video controls className='w-full outline-none' src={data.data().preview.videoUrl} alt={data.data().preview.videoName}/>
           </div>
           <div className=' flex flex-col justify-start px-4 w-full items-center mt-4 mb-3'>
            <h1 className="text-xl font-bold mb-2">{data.data().courseName}</h1>
            <p className='text-xs'>{data.data().descriptions[0].description}</p>
            </div>
            <div className='px-4 flex justify-start items-center '>
            <h1 className=' pr-2 text-base font-medium border-slate-600'>
            {data.data().sold} <span className='text-sm ml-1 font-normal'>Students</span>
           </h1>
            <h1 className="text-sm  ml-2 "> <span className='text-base mr-1 font-medium '>{comments && comments.length}</span> Reviews</h1>
            </div> 
            <div className='flex justify-start mt-5 px-2 items-center'>
                <div className='flex justify-start items-center'>
                <CurrencyRupeeIcon style={{fontSize:"20px"}}/>
                <h1 className='text-xl font-bold'>{data.data().coursePrice}</h1>
                </div>
                <div className='flex ml-2 text-gray-500  line-through decoration-2 relative justify-center items-center'>
                <CurrencyRupeeIcon style={{fontSize: '15px',textDecorationLine: "lineThrough"}}/>
                  <h1 className=' text-gray-500   '>{4000}</h1>
                </div>
                <div className='ml-3 text-sm'>
                  <h1>5% Off</h1>
                </div>
            </div>
            <div className='flex px-4 mt-7 justify-center items-center'>
            {
                enKeys.includes(data.id) ?
                <Link className='outline-none w-full' key={data.id}  to={`/learn/courses/enrolled/${data.id}`}> <button className='outline-none text-white  flex items-center justify-center w-full text-base font-medium  h-10 bg-black'>Go to course</button></Link>
                :
                <button onClick={()=>handleEnrole(data.data().coursePrice,data)} className='outline-none text-white flex items-center justify-center w-full text-base font-medium  h-10 bg-black'>Enrole now</button>
               }
               <div className='h-10 ml-3 w-12 flex justify-center items-center border'>
               {favKeys.includes(data.id) ? <FavoriteIcon onClick={()=>{
                       removeFromFav(data)
                     }}/> :  <FavoriteBorderIcon onClick={()=>{
                       addToFav(data)
                     }}/> }
               </div>
            </div>
            <div className='w-full mt-10 px-4'>
              <div className='border p-5'>
                <h1 className='font-semibold'>
                  What you'll learn
                </h1>
                <div className='mt-3 flex'>
                  <DoneIcon style={{fontSize:"14px"}}/>
                <p className='text-xs ml-3'>{ data.data().whatLearn }</p>

                </div>
              </div>

            </div>
            <div className='px-4 mt-7'>
              <h1 className='font-semibold'>This course includes:</h1>
              <div className=' text-gray-600 mt-3'>
            <div className='mb-2  flex justify-start items-center'>
            <PermIdentityOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {data.data().sold} Students
            </h1>
            </div>
            <div className='mb-2  flex justify-start items-center'>
            <LayersOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {
              topics.length 
            } Sections
            </h1>
            </div>
            <div className='mb-2  flex justify-start items-center'>
            <TheatersOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            {lecturesLength && lecturesLength} Lectures
            
            </h1>
            </div>
            <div className='mb-2  flex justify-start items-center'>
            <BarChartOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
              Level: <span className='text-orange-500'>{data.data().level}</span>
            </h1>
            </div>
            <div className='mb-2  flex justify-start items-center'>
            <SentimentSatisfiedAltOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            Online and at your own pace
            </h1>
            </div>
           
            <div className='mb-2  flex justify-start items-center'>
            <VolumeUpOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
            Audio: English
            </h1>
            </div>
            <div className='mb-2  flex justify-start items-center'>
            <AllInclusiveOutlinedIcon fontSize=" mr-2" />
            <h1 className='text-xs'>
              Unlimited access forever
            </h1>
            </div>
        </div>
            </div>
            <ul className='px-4 mb-5'>
              {topicData && 
              <h1 className='text-lg my-5  font-semibold '>Course content:</h1>
              }
              {topicData && topicData.map((c,index)=>
            <li key={index} className="bg-white  relative w-full flex-wrap  flex flex-col justify-center items-start border pt-5 cursor-pointer" >
             <div className='w-full'>
             <div className='flex w-full justify-start pb-5  items-center'>
                {
                  !c.open ? 
                  <div onClick={()=>{
                
                   handleOpen(index)
                  }} className='text-xl absolute   w-full  h-16  flex justify-start pl-3 items-center  bg-transparent font-bold'>
                   <KeyboardArrowDownSharpIcon style={{fontSize:"16px"}} />
                  </div>
                  :
                  <div onClick={()=>{
                   handleClose(index)
                    
                  }} className=' absolute  w-full  h-16 flex justify-start pl-3  items-center  bg-transparent font-bold'>
                  <KeyboardArrowUpSharpIcon style={{fontSize:"16px"}} />
                </div>
                }
             <div className='ml-10 pr-2 w-full flex justify-between items-center'>
             <h1 className={`font-semibold text-sm w-3/4 ${c.open && " "}`}>
              {
                c.topicName
              }
              
            </h1>
            <h1 className='text-xs font-medium pr-2'>
            {
                c.subTopicsLength 
              } 
              {
                c.subTopicsLength > 1 ? " lectures" : " lecture"
              }
            </h1>
             </div>
             </div>
             <div className={`text-xs bg-white ${c.open && "w-full pb-5 "}`}>
              {
                c.subTopics && c.subTopics.map(sub=>
                  <div className='pl-8 pr-2 w-full mt-0'>
                   <div className='w-full flex items-center mt-3'>
                   <PlayCircleIcon style={{fontSize:"12px"}} className='mr-4' />
                    <h1 className=' '>
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
            {
              <ul className='mt-5  px-4'>
                {data.data().requirements && 
                <div className={`border-t ${openReq && 'pb-5'} border-b`}>
                  <div onClick={()=>setOpenReq(!openReq)} className='flex justify-between pr-1 cursor-pointer items-center'>
                  <h1 className='text-lg mt-4  font-semibold mb-4'>Requirements</h1>
                  <KeyboardArrowDownSharpIcon style={{fontSize:"22px"}} />
                  </div>
                  {
                    openReq &&
                    <div>
                      {data.data().requirements.map((req)=>
               <li className='text-sm list-disc leading-loose ml-4'>
                {req}
               </li> 
              )}
                    </div>
                  }
                </div>
                }
              </ul>
            }
            <div>
            {data.data().descriptions &&
              <div className='mt-7 px-4'>
               <h1 className='text-lg font-semibold mb-4' >Description</h1>
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
          <div className='px-4'>
           <CourseReviewPublic id={id} currentUser={currentUser} />
          </div>
        </div>
        </div>
        }
        {/* <div className='mt-32'>
            <CourseReview id={id} currentUser={currentUser}/>
        </div> */}
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

export default Course