import React, { useEffect, useState } from 'react'
import {storage} from "./firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import "../css/Image.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import scale1 from "../assets/scale1.png"
import scale2 from "../assets/scale2.png"
import scale3 from "../assets/scale3.png"
import scale4 from "../assets/scale4.png"
import scale5 from "../assets/scale5.png"
import scale6 from "../assets/scale6.png"
import scale7 from "../assets/scale7.png"

const UploadImages = ({currentUser}) => {
    const [currentImage,setCurrentImage]=useState(null)
    const [images,setImages]=useState([])
    
    const uploadImage=()=>{

        if(currentImage==null){
            return
        }
        else{
            const imageRef = ref(storage,`products/${currentImage.name + currentUser.uid}`)
            uploadBytes(imageRef,currentImage).then(()=>{
                getDownloadURL(imageRef).then((url)=>{
                    setImages([...images,{
                     imageName: currentImage.name + currentUser.uid,
                     imageUrl:url,
                    }])
                 })
                 .then(()=>{
                     setCurrentImage(null)
                 })
            })
        }  
    }
    const deleteImage=(name)=>{
        const desertRef = ref(storage, `products/${name}`);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  setImages(images.filter((img)=>img.imageName!==name))
  
}).catch((error) => {
  // Uh-oh, an error occurred!
});
    }
    useEffect(() => {
        if(currentImage){
            const imageRef = ref(storage,`products/${currentImage.name + currentUser.uid}`)
            
            // setImages([...images,res])
           
           
        }
        

    }, [uploadImage])
    

  return (
    <div className='flex w-screen flex-wrap justify-center items-start my-20'>
        {
            images && images.map((image,index)=>
                <div key={index} className=' mr-5 object-contain'>
                    <img className='h-32 w-32' src={image.imageUrl} alt={image.imageName} />
                    <div onClick={()=>deleteImage(image.imageName)} className='py-2 px-4 rounded-lg bg-red-500 flex justify-center mt-5 cursor-pointer text-white'>delete</div>
                </div>
                )
        }


        {
            images.length <= 7 && 
            <div className='flex flex-col'>
                <label className="custom-file-upload mb-5 cursor-pointer flex items-center justify-center h-32 w-32 bg-gray-100 border rounded-lg">
                <input  className='h-32 w-32 bg-gray-100 mb-5' onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" />
                <CloudUploadIcon className='m-1'/>
               {currentImage && 
               <h1 className='text-xs'>{currentImage.name}</h1> || "Attach"}
                </label>
            <div onClick={uploadImage} className='bg-gray-200 cursor-pointer rounded-lg flex justify-center py-2 px-5'>Upload</div>
            </div>
        }

        
        {
            images.length == 0 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale1} alt={"scale"} />
            </div> 
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale2} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale3} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale4} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale5} alt={"scale"} />
            </div>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
         {
            images.length == 1 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
            
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale2} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale3} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale4} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale5} alt={"scale"} />
            </div>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
         {
            images.length == 2 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
           
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale3} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale4} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale5} alt={"scale"} />
            </div>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
         {
            images.length == 3 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
             
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale4} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale5} alt={"scale"} />
            </div>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
         {
            images.length == 4 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
             
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale5} alt={"scale"} />
            </div>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
         {
            images.length == 5 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale6} alt={"scale"} />
            </div>  
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
        {
            images.length == 6 && 
            <div className='flex justify-center items-center flex-wrap ml-5'>
            <div className='h-32 w-32 bg-gray-100 mr-5'>
                <img className='h-32 w-32' src={scale7} alt={"scale"} />
            </div>  
           
            </div> 
        }
       
    </div>
  )
}

export default UploadImages