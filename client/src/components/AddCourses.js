import { async } from '@firebase/util'
import { addDoc, collection, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, storage } from './firebase'
import CloseIcon from '@mui/icons-material/Close';
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import Header from './Header';


const AddCourses = ({currentUser}) => {
const [courseName,setCourseName]=useState("")
const [coursePrice,setCoursePrice]=useState("")
const [setCourseImage]=useState("")
const [topic,setTopic]=useState("")
const [topics,setTopics]=useState([])
const [subTopic,setSubTopic]=useState("")
const [videoUrl1,setVideoUrl1]=useState("")
const [videoUrl,setVideoUrl]=useState("")
const [subTopicDuration,setSubTopicDuration]=useState("")
const [subTopics,setSubTopics]=useState([])
const [currentVideo1,setCurrentVideo1]=useState("")
const [currentVideo,setCurrentVideo]=useState("")
const [progress1,setProgress1]=useState("")
const [progress,setProgress]=useState("")

const [blue,isBlue]=useState(false)
const [blue1,isBlue1]=useState(false)
const [level,setLevel]=useState('')
const [ tags,setTags ]=useState([])
const [ tag,setTag ]=useState("")
const [ requirements,setRequirements ]=useState([])
const [ requirement,setRequirement ]=useState("")

const [ customDes,setCustomDes ]=useState("point")
const [ whatLearn,setWhatLearn ]=useState("")
const [ whoLearn,setWhoLearn ]=useState("")
const [ courseProject,setCourseProject ]=useState("")
const [ description,setDescription ]=useState("")
const [ descriptions,setDescriptions ]=useState([])
const [addSubTopics,setAddSubTopics]=useState(false)
const [openMenu,setOpenMenu]=useState(false)

const handleOpenMenu=(pass)=>{
    setOpenMenu(pass)
}
//end of boolean state variables

const handleSubmit=async(e)=>{
  e.preventDefault();
  let data={
    courseName,
    sold:0,
    coursePrice,
    
    reviews:0,
    enrolled:0,
    topics,
    level,
    comment:0,
    tags,
    preview:videoUrl1, 
    descriptions,
    whatLearn,
    whoLearn,
    courseProject,
    requirements,
  }
  const colRef = collection(db, "learning")
  await addDoc(colRef,data)
  .then((doc)=>{
    setCourseName("")
    setCoursePrice("")
    setCourseImage("")
  })
}

const handleAddTopic=(e)=>{
  e.preventDefault();
  setAddSubTopics(true)
}

const handleAddRequirements=(e)=>{
  setRequirements([...requirements,requirement])
  setRequirement("")
}
const handleRemoveRequirement=(t)=>{
setRequirements(requirements.filter(tg=>tg!==t))

}

const handleAddTags=(e)=>{
  setTags([...tags,tag])
  setTag("")
}
const handleRemoveTag=(t)=>{
setTags(tags.filter(tg=>tg!==t))

}

const handleAddSubTopics=(e)=>{
  e.preventDefault();
  setSubTopics([...subTopics,
  {
    subTopic,
    videoUrl,
    subTopicDuration,
  }
  ])
  setCurrentVideo("")
  setSubTopic("")
  setVideoUrl("")
  setSubTopicDuration("")
  isBlue1(true)
  // setTopics([...topics,{
  //   topicName:topic,
   
  // }])
}
const handleAddDescription=(e)=>{
  setDescription(e.target.value)
  }
  const handleAddDes=()=>{
    setDescriptions([...descriptions,
    {
      type: customDes,
      description: description,
    }
    ])
    setDescription("")
  }
useEffect(() => {
  }, [handleAddSubTopics])

  const handleAddToTopic=(e)=>{
    e.preventDefault();
    setTopics([...topics,{
      topic:{
          topicName:topic,
          subTopics,
      }
    }])
    setSubTopics("")
    setTopic("")
    setAddSubTopics(false)
    isBlue(true)
  isBlue1(false)

  }
  useEffect(() => {
    }, [handleAddToTopic])


    const uploadVideo1=async()=>{

      if(currentVideo1==""){
          return
      }
      else{
          const imageRef = ref(storage,`courses/previews/${currentVideo1.name + currentUser.uid}`)
          console.log("clicked");
          const uploadTask = uploadBytesResumable(imageRef,currentVideo1)
          uploadTask.on("state_changed", (snapshot) => {
            let progres=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress1(progres)
            console.log(progres);
            // render progress
          });
          await uploadTask;
          let videoUrll = await getDownloadURL(uploadTask.snapshot.ref)
          setVideoUrl1({
            videoName: currentVideo1.name + currentUser.uid,
            videoUrl:videoUrll
          })

      }  
  }

  const deleteVideo1=(name)=>{
    const desertRef = ref(storage, `courses/previews/${name}`);
// Delete the file
deleteObject(desertRef).then(() => {
// File deleted successfully
console.log("success");
}).catch((error) => {
// Uh-oh, an error occurred!
});
}


    const uploadVideo=async()=>{

      if(currentVideo==""){
          return
      }
      else{
          const imageRef = ref(storage,`courses/videos/${currentVideo.name + currentUser.uid}`)
          console.log("clicked");
          const uploadTask = uploadBytesResumable(imageRef,currentVideo)
          uploadTask.on("state_changed", (snapshot) => {
            let progres=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progres)
            console.log(progres);
            // render progress
          });
          await uploadTask;
          let videoUrll = await getDownloadURL(uploadTask.snapshot.ref)
          setVideoUrl({
            videoName: currentVideo.name + currentUser.uid,
            videoUrl:videoUrll,
            completed:false,
          })

      }  
  }
console.log(subTopics);

    const deleteVideo=(name)=>{
      const desertRef = ref(storage, `courses/videos/${name}`);
// Delete the file
deleteObject(desertRef).then(() => {
// File deleted successfully
console.log("success");
}).catch((error) => {
// Uh-oh, an error occurred!
});
  }
  // useEffect(() => {
  //     if(currentVideo){
  //         const imageRef = ref(storage,`courses/${currentVideo.name + currentUser.uid}`)
          
  //         // setImages([...images,res])
         
         
  //     }
      

  // }, [uploadVideo])



  return (
    <div className='flex justify-center flex-wrap flex-col items-center'>
<Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

        {/* <form onSubmit={(e)=>{handleSubmit(e)}} className='flex mt-40 justify-center items-center flex-col'> */}
        <div className='flex  flex-col justify-around w-screen items-center'>
              
            <div className='flex justify-center flex-col items-center '>
            <div className='flex w-full bg-gray-100 border mb-20 pl-32 pt-20 justify-start flex-col items-start '>
            <input onChange={(e)=>setCourseName(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder='Course name' type="text" />
            <input onChange={(e)=>setCoursePrice(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder='Price' type="number" />
            <input onChange={(e)=>setWhatLearn(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder='what you will learn in this course? ' type="text" />
            <input onChange={(e)=>setWhoLearn(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder=" what is this course's project?" type="text" />
            <input onChange={(e)=>setCourseProject(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder='who is this online course for?' type="text" />
            

            <div className='flex'>
                <label className="custom-file-upload mb-5 cursor-pointer flex items-center justify-center h-32 w-32 bg-gray-100 border rounded-lg">
                <input required  className='h-32 w-32 bg-gray-100 mb-5' onChange={(e)=>setCurrentVideo1(e.target.files[0])} type="file" />
                <CloudUploadIcon className='m-1'/>
               {currentVideo1 && 
               <h1 className='text-xs'>{currentVideo1.name}</h1> || "Attach"}
                </label>
               </div> 
               {progress1 && progress1}
            <div onClick={uploadVideo1} className='bg-gray-200 cursor-pointer rounded-lg flex justify-center py-2 px-5'>Upload</div>
            <div onClick={()=>deleteVideo1(videoUrl1.videoName)} className='py-2 px-4 rounded-lg bg-red-500 flex justify-center mt-5 cursor-pointer text-white'>delete</div>



            <input onChange={(e)=>setCourseImage(e.target.value)} className='border p-3 mr-5 mb-10 h-14 w-64 outline-none' placeholder='Image url' type="text" />
            <div className='mt-10 border   py-10 w-screen justify-between flex flex-wrap'>
      <div className='w-1/2 pl-10'>
      <h1 className='text-lg font-medium'>Over view</h1>
      <div className='flex flex-col justify-start mt-5 items-start'>
        <div onChange={(e)=>setCustomDes(e.target.value)}>
        <input required className='' type="radio" value="paragraph" name="description" /> Paragraph 
        <input required className='ml-5' type="radio" value="point" name="description" /> Point
        </div>
        <div className='flex justify-center mt-7 items-center'>
       <textarea required  value={description} onChange={(e)=>handleAddDescription(e)} className='mr-5 px-4 py-2 border outline-none  h-24 w-72' type="text" />
        {
          customDes === "paragraph" ?
          <div onClick={handleAddDes} className='flex cursor-pointer justify-center items-center rounded-lg h-12 text-white w-40 font-semibold bg-blue-600'>
            Add as paragraph
          </div>
          :
          <div onClick={handleAddDes} className='flex cursor-pointer justify-center items-center rounded-lg h-12 text-white w-36 font-semibold bg-blue-600'>
            Add as point
          </div>
        }
        </div>
      </div>
      </div>
      <div className='flex flex-wrap flex-col mt-5  px-5'>
       {descriptions[0] &&  
        <div className='flex justify-start mb-5  '>
        <h1 className=' text-xl font-semibold'>Preview of your description</h1> 
        </div>
        }
        {descriptions && descriptions.map((des)=>
        <div className='flex flex-wrap'>
          {des.type==="point" &&
          <ul className='ml-5'>
          {
            <li className='list-disc'>
             <div className='flex mb-5 items-start'>
           <h1 className='bg-gray-200 mr-3 py-1 px-3 rounded-lg font-semibold text-gray-700 text-xs'>point</h1>
           <p>{des.description}</p>
          </div>
            </li>
          }
        </ul>
          }
          {des.type==="paragraph" &&
          <div className='flex mb-5 items-start'>
           <h1 className='bg-gray-200 mr-3 py-1 px-3 rounded-lg font-semibold text-gray-700 text-xs'>paragraph</h1>
           <p>{des.description}</p>
          </div>           
          }
        </div>
        )}
       </div>
       </div>



       <div className='mt-10 border p-10 w-full flex flex-col'>
       <h1 className='text-lg mb-5 font-medium'>requirements</h1>
       <div className='flex flex-col justify-center items-start'>
        <div className='flex  justify-start items-center'>
        <input required  value={requirement} onChange={(e)=>setRequirement(e.target.value)} className='px-4 py-2  border outline-none  h-12 w-72' type="text" />
          <div onClick={handleAddRequirements} className='flex justify-center ml-3 bg-blue-700 rounded-lg  cursor-pointer text-white items-center text-lg font-semibold py-2 px-4'>
          Add
          </div>
        </div>
        <div className='w-96 flex justify-start items-start  flex-col'>
          {requirements && requirements.map((tg,index)=>
          <div className='flex text-gray-600 bg-gray-100 mr-3 my-2 px-4 py-1 justify-start  items-center'>
            <div onClick={()=>handleRemoveRequirement(tg)} className='mr-3 flex justify-center flex-col items-center text-xs cursor-pointer'>
            <CloseIcon style={{fontSize: '15px'}}/>
            </div>
            <div className='flex flex-col justify-center items-center '>
              {tg}
            </div>
            
            </div>
          )}
        </div>
       </div>
       </div>  





            <div className='mt-10 border p-10 w-full flex flex-col'>
       <h1 className='text-lg mb-5 font-medium'>tags</h1>
       <div className='flex flex-col justify-center items-start'>
        <div className='flex  justify-start items-center'>
        <input required  value={tag} onChange={(e)=>setTag(e.target.value)} className='px-4 py-2  border outline-none  h-12 w-72' type="text" />
          <div onClick={handleAddTags} className='flex justify-center ml-3 bg-blue-700 rounded-lg  cursor-pointer text-white items-center text-lg font-semibold py-2 px-4'>
          Add
          </div>
        </div>
        <div className='w-96 flex justify-start items-start flex-wrap'>
          {tags && tags.map((tg,index)=>
          <div className='flex text-gray-600 bg-gray-100 mr-3 my-2 px-4 py-1 justify-start items-center'>
            <div onClick={()=>handleRemoveTag(tg)} className='mr-3 flex justify-center items-center text-xs cursor-pointer'>
            <CloseIcon style={{fontSize: '15px'}}/>
            </div>
            <div className='flex justify-center items-center '>
              {tg}
            </div>
            
            </div>
          )}
        </div>
       </div>
       </div>
            <select required  className='px-4 py-2 mr-10  border outline-none mt-5 h-12 w-72' value={level} onChange={(e)=>setLevel(e.target.value)}>
                      <option value={""}>--Select level--</option>
                      <option value={"begginer"}>begginer</option>
                      <option value={"intermediate"}>intermediate</option>
                      <option value={"advanced"}>advanced</option>
                      </select> 
            </div>
            <div>
              {addSubTopics ? 
            <div>
             
              {topic ?
                    <div className='flex items-center justify-around w-screen'>
                     <div className='flex items-center justify-center flex-col'>
                     <h1 className='mb-5 text-3xl ' >Add subtopics to <span className='font-bold underline underline-offset-4'>{topic}</span></h1> 
                     <div className='px-5 bg-yellow-100 py-1' >Do not refresh or close the window while adding ⚠ </div> 
                     <div className='flex flex-col'>
                      <input value={subTopic} onChange={(e)=>{setSubTopic(e.target.value)}} className='border mt-7  h-14 w-64 p-3 outline-none' placeholder='subtopic' type="text" />
                      <div className='flex'>
                <label className="custom-file-upload mb-5 cursor-pointer flex items-center justify-center h-32 w-32 bg-gray-100 border rounded-lg">
                <input required  className='h-32 w-32 bg-gray-100 mb-5' onChange={(e)=>setCurrentVideo(e.target.files[0])} type="file" />
                <CloudUploadIcon className='m-1'/>
               {currentVideo && 
               <h1 className='text-xs'>{currentVideo.name}</h1> || "Attach"}
                </label>
               </div> 
               {progress && progress}
            <div onClick={uploadVideo} className='bg-gray-200 cursor-pointer rounded-lg flex justify-center py-2 px-5'>Upload</div>
            <div onClick={()=>deleteVideo(videoUrl.videoName)} className='py-2 px-4 rounded-lg bg-red-500 flex justify-center mt-5 cursor-pointer text-white'>delete</div>
                      <input value={subTopicDuration} onChange={(e)=>{setSubTopicDuration(e.target.value)}} className='border mt-7 p-3 h-14 w-64 outline-none' placeholder='duration' type="text" />
                     
                      <div className='flex items-center justify-center mt-10 '>
                      <button className='flex mr-5 justify-center outline-none items-center rounded-lg bg-blue-500 text-white  h-10 w-16 cursor-pointer' onClick={(e)=>handleAddSubTopics(e)}>Add</button>
                      <button className='flex justify-center outline-none items-center rounded-lg bg-orange-400 text-white  h-10 w-24 cursor-pointer' onClick={(e)=>{handleAddToTopic(e)}}>Complete</button>
                      </div>
                     
                     </div>
                    </div>
                    {
                      blue1 && 
                      <div className='flex justify-center py-10 h-96 px-5 bg-blue-800 w-96 items-center flex-wrap '>

                      {
                        subTopics && subTopics.map((sub)=>
                        <div className='bg-blue-200 px-5 font-semibold py-1 mr-5 mb-5 rounded-full'>
                       {sub.subTopic.order} {sub.subTopic}
                      </div>
                        )
                      }
                    </div>
                    }
                    </div>
                  :
                  <div className='flex items-center justify-center '>
                  <h1>enter any topic</h1>
                  <div className='text-white ml-5 flex items-center justify-center cursor-pointer font-medium h-8 w-14 bg-gray-800' onClick={()=>setAddSubTopics(false)}>
                    back
                  </div>
                  </div>
                  }
            </div>
            :
                <div className='flex  justify-around w-screen items-center'>
                  <div className='flex bg-gray-100 px-20 py-14 justify-center flex-col items-center'>
                  <h1 className='text-3xl'>Add Topics</h1>

                    <input className='border p-3 my-5  h-14 w-64 outline-none' placeholder='Add topic' onChange={(e)=>{setTopic(e.target.value)}} type="text" />
                    <button className='flex mt-5 justify-center outline-none items-center rounded-lg bg-blue-500 text-white  h-10 w-16 cursor-pointer' onClick={(e)=>handleAddTopic(e)}>Add</button>
                  </div>
                  
                  {
                    blue && 
                    <div className='flex justify-center py-10 h-96 px-5 bg-blue-800 w-96 items-center flex-wrap '>
                  {
                    topics && topics.map((topic)=>
                    
                    <div className='bg-blue-200 px-5 font-semibold py-1 mr-5 mb-5 rounded-full'>
                    {topic.topic.topicName}
                    </div>
      
                    )
      
                  }
                 </div>
                  }
                 </div>
                
             }
              
  
            </div>
            
            </div>
            
            </div>
            <button onClick={(e)=>{handleSubmit(e)}} className='border mb-40 outline-none h-12 w-32 bg-blue-500 text-white text-lg font-semibold rounded-md'>Add course</button>
        {/* </form> */}
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

export default AddCourses


  //  reviews //
  //  sudents count (sold)//
  //  number of lessons(arr.length) //
  //  video 
  //  subtitle
  //  level //
  //  access //
  //  category 
  //  tags //
  //  description //
  //  what you will learn in this course //
  //  what is this course's project? //
  //  who is this online course for? //
  //  requirements //
  //  contents 