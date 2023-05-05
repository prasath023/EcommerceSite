import { addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { formatHex, formatHexValues } from 'react-ntc';
import { Link } from 'react-router-dom';
import { useNameThatColor } from "react-ntc";
import { db } from './firebase';
import { GetColorName } from 'hex-color-to-color-name';
import UploadImages from './UploadImages';
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
import Header from './Header';


const SellerInput = ({currentUser}) => {
    const [placeProduct,setPlaceProduct]=useState(false)
    const [ category,setCategory ]=useState("")
    const [ mainCategory,setMainCategory ]=useState([])
    const [ finalCategory,setFinalCategory ]=useState([])
    const [ categoryOthers,setCategoryOthers ]=useState("")
    const [ categoryBool,setCategoryBool ]=useState(false)
    const [ returnBool,setReturnBool ]=useState(false)
    const [ deliveryBool,setDeliveryBool ]=useState(false)
    const [ policyBool,setPolicyBool ]=useState(false)
    const [ productName,setProductName ]=useState("")
    const [ brandName,setBrandName ]=useState("")
    const [ price,setPrice ]=useState("")
    const [ tags,setTags ]=useState([])
    const [ tag,setTag ]=useState([])
    const [ customDes,setCustomDes ]=useState("point")
    // deliveryRangeStartEnd
    const [ deliveryRangeStartEnd,setDeliveryRangeStartEnd]=useState('')

    const [ desPara,setDesPara ]=useState([])
    const [ desPoint,setDesPoint ]=useState([])
    const [ customReturnDays,setCustomReturnDays]=useState('')
    const [ deliveryRange,setDeliveryRange]=useState('')
    const [ customDeliveryRange,setCustomDeliveryRange]=useState('')

    const [ customRangeStart,setCustomRangeStart]=useState('')
    const [ customRangeEnd,setCustomRangeEnd]=useState('')
    const [ personalisation,setPersonalisation ]=useState(false)
    const [ personalisationDescription,setPersonalisationDescription ]=useState(false)
    const [ personalisationOptional,setPersonalisationOptional ]=useState(false)
    const [ quantity,setQuantity ]=useState("")
    const [ materials,setMaterials ]=useState([])
    const [ pinCode,setPinCode ]=useState([])
    const [ deliveryCountry,setDeliveryCountry ]=useState("India")
    const [ materialKey,setMaterialKey ]=useState("")
    const [ materialValue,setMaterialValue ]=useState("")
    const [ openVariants,setOpenVariants ]=useState(false)
    const [ openSize,setOpenSize ]=useState(false)
    const [ size,setSize ]=useState("")
    const [ sections,setSections ]=useState("")
    const [ sizePrice,setSizePrice ]=useState("")
    const [ sizeDetails,setSizeDetails ]=useState([])
    const [ color,setColor ]=useState("")
    const [ openColor,setOpenColor ]=useState(false)
    const [ colorPrice,setColorPrice ]=useState("")
    const [ customDays,setCustomDays ]=useState("")
    const [ returnExchangeDays7,setReturnExchangeDays7 ]=useState(false)
    const [ returnExchangeDays21,setReturnExchangeDays21]=useState(false)
    const [ returnExchangeDetails,setReturnExchangeDetails]=useState('')
    const [ returnExchangeDays30,setReturnExchangeDays30]=useState(false)
    const [ returnExchangeDaysCustom,setReturnExchangeDaysCustom ]=useState("")    
    const [ returns, setReturns]=useState(false)
    const [ exchanges,setExchanges ]=useState(false)
    const [ colorDetails,setColorDetails ]=useState([])
    
    const [ unit,setUnit ]=useState("")
    const [ deliveryDetails,setDeliveryDetails ]=useState("")
    const [ unitNumber,setUnitNumber ]=useState("")
    
    const [ discount,setDiscount ]=useState("")
    const [ description,setDescription ]=useState("")
    const [ descriptions,setDescriptions ]=useState([])
    const [ sellerData,setSellerData ]=useState([])
    const [ data,setData ]=useState([])
    const [ openStore,setOpenStore ]=useState(false)

  const units=["piece","kg","gm","ml","volts","watt","liter","mm","ft","cm","meter","sq.ft.","sq.meter","km","set","hour","day","bunch","bundle","month","year","service","work","packet","box","pound","dozen","gunta","pair","minute","quintal","ton","capsule","tablet","plate","inch"]
  const [currentImage,setCurrentImage]=useState("")
  const [images,setImages]=useState([])
  const [openMenu,setOpenMenu]=useState(false)

  const handleOpenMenu=(pass)=>{
      setOpenMenu(pass)
  }
  const uploadImage=()=>{

      if(currentImage==""){
        console.log("nothing");
          return
      }
      else{
          const imageRef = ref(storage,`products/${currentImage.name + currentUser.uid}`)
        console.log("happening");
         
          uploadBytes(imageRef,currentImage).then(()=>{

              getDownloadURL(imageRef).then((url)=>{
                  setImages([...images,{
                   imageName: currentImage.name + currentUser.uid,
                   imageUrl:url,
                  }])
               })
               .then(()=>{
                   setCurrentImage("")
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
  // useEffect(() => {
  //     if(currentImage){
  //         const imageRef = ref(storage,`products/${currentImage.name + currentUser.uid}`)
          
  //         // setImages([...images,res])
         
         
  //     }
      

  // }, [uploadImage])
  

  const handleClosePlacing=()=>{
        setPlaceProduct(false)
      }
      const fetchData=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setData(querySnapshot.docs.map((doc)=>doc.data().category.subCategory))
    }
    useEffect(() => {
      currentUser && fetchData()
     }, [])
 
    const handleAddCategory=(e)=>{
        setCategory(e.target.value)
        if(e.target.value==="others"){
          setCategoryBool(true)
        }
        else{
          setCategoryBool(false)
        }
        }
    const handleDeliveryRange=(e)=>{
      setDeliveryRange(e.target.value)
      setCustomDeliveryRange("")
      if(e.target.value==="custom"){
        setDeliveryBool(true)
      }
      else{
        setDeliveryBool(false)
      }
    }
    console.log(deliveryRange && deliveryRange);
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
          const handleAddPrice=(e)=>{
            setPrice(e.target.value)
            }
            const handleAddDiscount=(e)=>{
              setDiscount(e.target.value)
              }
            
                const handleAddProductName=(e)=>{
                  setProductName(e.target.value)
                  }
                  const handleSetFinalCat=()=>{
                    setFinalCategory({
                      category: mainCategory,
                      subCategory: category==="others" ? categoryOthers : category,
                    })
                  }
                  useEffect(()=>{
                    handleSetFinalCat()
                  },[category,categoryOthers,mainCategory])
                 
        const handleSubmit=async(e)=>{
          e.preventDefault()
         
          const data={
            images,
            category: finalCategory,
            productName,
            unit,
            unitNumber,
            brandName,
            quantity,
            descriptions,
            price,
            sizeDetails,
            colorDetails,
            personalisationDescription,
            personalisationOptional,
            sections,
            tags,
            materials,
            discount,
            returns,
            exchanges,
            bought:0,
            rating:0,
            owner:currentUser.uid,
            deliveryDetails, 
            returnExchangeDays: returnExchangeDetails,
          }
          
          const docRef1 = doc(db, "sellers", currentUser.uid);
          const colRef = collection(docRef1, "products")
          await addDoc(colRef,data)
          .then((document)=>{
            const docRef2 = doc(db, "products",document.id);
            setDoc(docRef2,data)
          })
          
        }
        const handleAddTags=(e)=>{
          setTags([...tags,tag])
          setTag("")
        }
const handleRemoveTag=(t)=>{
  setTags(tags.filter(tg=>tg!==t))

}

const handleAddMaterials=(e)=>{
  setMaterials([...materials,
  {
    materialKey,
    materialValue
  }
  ])
  setMaterialValue("")
  setMaterialKey("")
}
const handleRemoveMaterials=(t)=>{
setMaterials(materials.filter(tg=>tg.materialKey!==t))

}
const handleRemoveSizeDetails=(t)=>{
  setSizeDetails(sizeDetails.filter(tg=>tg.size!==t))
  
  }
  const handleRemoveColorDetails=(t)=>{
    setColorDetails(colorDetails.filter(tg=>tg.color!==t))
    
    }
const handleAddSizeWithPrice=()=>{
  setSizeDetails([...sizeDetails,{
    size,
    price: sizePrice,
  }])
  setSize("")
  setSizePrice("")
  setOpenSize(false)
}
const handleAddColorWithPrice=()=>{
  setColorDetails([...colorDetails,{
    color,
    price: colorPrice,
  }])
  setColor("")
  setColorPrice("")
  setOpenColor(false)
}

const handleCancelCustomReturns=()=>{
  setExchanges(false)
  setReturns(false)
  setCustomReturnDays("")
  setPolicyBool(false)
}
const handleAddCustomReturns=()=>{
  setReturnBool(true);

}

useEffect(()=>{
  setDeliveryRangeStartEnd({
    start: deliveryRange[0] ? deliveryRange[0] :  7,
    end: deliveryRange[2] ? deliveryRange[2] : 0
  })
},[deliveryRange])

useEffect(()=>{
  customRangeStart &&  customRangeEnd && setCustomDeliveryRange({
    start: customRangeStart,
    end: customRangeEnd,
    days: customDays ? customDays : "days",
  })
},[customRangeEnd,customRangeStart,customDays])

useEffect(()=>{
  setDeliveryDetails({
    deliveryCountry,
    pinCode,
    processingTime: customDeliveryRange ? customDeliveryRange : deliveryRangeStartEnd,
  })
},[pinCode,deliveryCountry,deliveryRangeStartEnd,customDeliveryRange])

console.log(deliveryDetails);

useEffect(() => {
let returnExchangeDays = returnExchangeDays7 ? 7 : returnExchangeDays21 ? 21 : returnExchangeDays30 ? 30 : 7
  setReturnExchangeDetails(returnExchangeDaysCustom ? returnExchangeDaysCustom : returnExchangeDays)
}, [returns,exchanges,returnExchangeDaysCustom])


  return (
    <div className='flex justify-center items-center flex-col'>
    <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>


        <div className='flex mt-16 justify-center items-center'>
            <h1 className='text-4xl font-semibold '>Place your product!</h1>
        </div>
       <form className='flex flex-wrap flex-col justify-center items-start'>
        {/* images */}

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
                <input   className='h-32 w-32 bg-gray-100 mb-5' onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" />
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
        {/* category */}
      <div className='mt-10 flex border p-10 w-full flex-col'>
       <h1 className='text-lg font-medium'>Category</h1>
       <select   className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' value={mainCategory} onChange={(e)=>setMainCategory(e.target.value)}>
       <option value={""}>--Select category--</option>
       <option value={"mobiles"}>Mobiles</option>
       <option value={"electronics"}>Electronics</option>
       <option value={"fashion"}>Fashion</option>
       <option value={"home"}>Home</option>
       <option value={"appliances"}>Appliances</option>
       <option value={"beauty & personal care"}>Beauty & personal care</option>
       <option value={"food & drinks"}>Food & drinks</option>
        <option value={"nutrition & health care"}>Nutrition & health care</option>
       <option value={"baby care"}>Baby care</option>
       <option value={"toys & school supplies"}>Toys & school supplies</option>
       <option value={"sports & fitness"}>Sports & fitness</option>
       <option value={"books"}>Books</option>
       <option value={"music"}>Music</option>
       <option value={"stationery & office supplies"}>Stationery & office supplies</option>
       <option value={"safety & hygiene essentials"}>Safety & hygiene essentials</option>


       </select> 
      {categoryBool &&
             <input   onChange={(e)=>setCategoryOthers(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="text" />
      }
       </div>

        {/* sub category */}
       <div className='mt-10 flex border p-10 w-full flex-col'>
       <h1 className='text-lg font-medium'>Sub category</h1>
       <select   className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' value={category} onChange={(e)=>handleAddCategory(e)}>
       <option value={""}>--Select category--</option>
       
        {data && data.filter((val,id,array) => array.indexOf(val) == id).map(cat=>
           <option value={cat && cat.toLowerCase()}>{cat && cat}</option>
          )}
        <option value={"others"}>--others--</option>

       </select> 
      {categoryBool &&
             <input   onChange={(e)=>setCategoryOthers(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="text" />
      }
       </div>
       {/* name */}
       <div className='mt-10 border p-10 w-full flex flex-col'>
       <h1 className='text-lg font-medium'>product name</h1>
       <input   onChange={(e)=>handleAddProductName(e)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="text" />
       </div>
      {/* unit */}
       <div className='mt-10 border p-10 w-full flex flex-col'>
       <h1 className='text-lg font-medium'>product unit</h1>
       <div className='flex justify-start items-center'>
       <input   onChange={(e)=>setUnitNumber(e.target.value)} className='px-4 py-2 mr-2 border outline-none mt-5 h-12 w-72' type="number" />
       <select  className='border outline-none mt-5 h-12 px-2 py-2' value={unit} onChange={(e)=>{setUnit(e.target.value)}}>
       <option value={""}>--Select unit--</option>
       
       {units.map((unit)=>
        <option value={unit}>{unit}</option>
       )}
       </select>
       </div>
       </div>

 {/* brand name */}

 <div className='mt-10 border p-10 w-full'>
        <h1>Brand name</h1>
       <input   onChange={(e)=>setBrandName(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="text" />
        
      </div>

       {/* price */}

       <div className='mt-10 flex flex-col border p-10 w-full'>
       <h1 className='text-lg font-medium'>price</h1>
       <input   onChange={(e)=>handleAddPrice(e)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="number" />
       </div>
       {/* quantity */}
       <div className='mt-10 flex border p-10 w-full flex-col'>
       <h1 className='text-lg font-medium'>quantity</h1>
       <input   onChange={(e)=>setQuantity(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="number" />
       </div>
       {/* variants */}

        <div className='mt-10 border p-10 w-full'>
          <div  className=''>
           <div className='text-lg mb-5 font-medium'>
           variants
           </div>
           {openVariants ?
           <div className='flex flex-col justify-start items-start'>
            <div className='w-72  bg-gray-100 flex flex-col  justify-start p-4 '>
              <div >
                size
              </div>
              <div className='w-72 flex justify-start items-start flex-wrap'>
          {sizeDetails && sizeDetails.map((tg,index)=>
          <div className='flex text-gray-600 bg-gray-100 mr-3 my-2 px-4 py-1 justify-center items-center'>
            <div onClick={()=>handleRemoveSizeDetails(tg.size)} className='mr-3 flex justify-center items-center text-xs cursor-pointer'>
            <CloseIcon style={{fontSize: '15px'}}/>
            </div>
            <div className='flex h-full justify-center items-center '>
              {tg.size}
            </div>
            
            </div>
          )}
        </div>
              {openSize ?

              <div className=' flex flex-col'>
                <input  className='py-1 px-3 mt-5 mb-3' onChange={(e)=>setSize(e.target.value)} type="text" />
                
                <input  className='py-1 px-3 mb-3' onChange={(e)=>setSizePrice(e.target.value)} type="number" />
                <div onClick={handleAddSizeWithPrice} className='mx-auto mt-3 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer'>Done</div>
              </div>
              :
              <div onClick={()=>setOpenSize(true)} className='mx-auto mt-3 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer '>
                add size
              </div>  
            }
              
            </div>
            <div className='w-72  bg-gray-100 flex flex-col  justify-start p-4 '>
            <div >
               color
              </div>
              <div className='w-72 flex justify-start items-start flex-wrap'>
          {colorDetails && colorDetails.map((tg,index)=>
          <div className='flex text-gray-600 bg-gray-100 mr-3 my-2 px-4 py-1 justify-between items-center'>
            <div onClick={()=>handleRemoveColorDetails(tg.color)} className='mr-3 flex justify-center items-center text-xs cursor-pointer'>
            <CloseIcon style={{fontSize: '15px'}}/>
            </div>
            <div className='flex justify-center items-center '>
              {tg.color}
            </div>
            
            </div>
          )}
        </div>
            {openColor ?
            
            <div>
              <div className='flex my-5 items-center'>
                <input  onChange={(e)=>setColor(GetColorName(e.target.value))} className='cursor-pointer h-10 mr-4 w-10 ' type="color" />
                <div className=''>
                  {color}
                </div>
                </div>
                <input  className='py-1 px-3 mb-3' onChange={(e)=>setColorPrice(e.target.value)} type="number" />
                <div onClick={handleAddColorWithPrice} className='mx-auto mt-3 w-16 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer'>Done</div>
            </div>
            :
              <div onClick={()=>setOpenColor(true)} className='mx-auto mt-3 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer '>
                add color
              </div>  
            }
           </div>
           </div>
           : 
           <div onClick={()=>setOpenVariants(true)} className='bg-blue-700 mt-5 rounded-lg cursor-pointer text-white py-2 px-4 w-32 font-semibold'>
           Add variants
          </div>
           
           }
           
          </div>
        </div>

      {/* personalisation */}
           <div className='my-10 border p-10 w-full'>
            <div>
              <div className='flex justify-between items-center'>
              <h1>
                Personalisation
              </h1>
              <div onClick={()=>setPersonalisation(!personalisation)} className={`cursor-pointer ${personalisation ? 'bg-black' : "bg-gray-300"} h-5 w-10 rounded-full `}>

              </div>
              </div>
              <p>Collect personalised information for this listing.</p>
              {
                personalisation && 
                <div>
                  <div>
                    <h1>Instructions for buyers</h1>
                    <p>Enter the personalisation instructions you want buyers to see.</p>
                    <textarea  onChange={(e)=>setPersonalisationDescription(e.target.value)} className='w-72 p-3 border h-28 ' placeholder='Example: Enter the name you want on the necklace. Max 12 characters, no spaces, no special characters. Thank you!' type="text" />
                  </div>
                  <div className='flex justify-between w-60 items-center'>
                  <div onClick={()=>setPersonalisationOptional(!personalisationOptional)} className={`cursor-pointer ${personalisationOptional ? 'bg-black' : "bg-gray-300"} h-5 w-10 rounded-full `}>


                    </div>
                    <h1>Personalisation is optional</h1>
                  </div>
                </div>
              }
            </div>
           </div>

       {/* sections */}
       <div className='border p-10 w-full'>
        <h1>Sections</h1>
        <select   className='px-4 py-2 mr-10  border outline-none mt-5 h-12 w-72' value={sections} onChange={(e)=>setSections(e.target.value)}>
       <option value={""}>--Select section--</option>
          <option value={"men"}>Men</option>
          <option value={"women"}>Women</option>
          <option value={"kids"}>Kids</option>
          <option value={"unisex"}>Unisex</option>
          <option value={"all"}>All</option>
       </select>
       </div>
      

       {/* tags */}
       <div className='mt-10 border p-10 w-full flex flex-col'>
       <h1 className='text-lg mb-5 font-medium'>tags</h1>
       <div className='flex flex-col justify-center items-start'>
        <div className='flex  justify-start items-center'>
        <input   value={tag} onChange={(e)=>setTag(e.target.value)} className='px-4 py-2  border outline-none  h-12 w-72' type="text" />
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

       {/* material */}

       <div className='mt-10 border p-10  w-full flex flex-col'>
       <h1 className='text-lg mb-5 font-medium'>materials</h1>
       <div className='flex w-full'>
       <div className='flex w-1/2 flex-col justify-center items-start'>
        <div className='flex flex-col  justify-center items-center'>
        <input   value={materialKey} onChange={(e)=>setMaterialKey(e.target.value)} className='px-4 py-2  border outline-none  mb-5 h-12 w-72' type="text" />
        <input   value={materialValue} onChange={(e)=>setMaterialValue(e.target.value)} className='px-4 py-2  border outline-none  mb-5 h-12 w-72' type="text" />
          <div onClick={handleAddMaterials} className='flex justify-center  bg-blue-700 rounded-lg  cursor-pointer text-white items-center text-lg font-semibold h-12 w-72'>
          Add
          </div>
        </div>
               
       </div >
      {materials && <h1 className='text-xl font-semibold mb-3'>Details</h1>}
      
          {materials && materials.map((material,index)=>
          <div className='flex text-black w-1/2 bg-gray-200  my-2 px-5 py-3 justify-start flex-col items-start '>
              <div className='flex justify-start items-center'>
            <div onClick={()=>handleRemoveMaterials(material.materialKey)} className='mr-3 flex justify-center items-center text-xs cursor-pointer'>
            <CloseIcon style={{fontSize: '15px'}}/>
            </div>
            <div className='flex justify-start items-center '>
              
              
              <h1 className='font-semibold mr-1'>{material.materialKey}</h1> : {material.materialValue}
            </div>
            </div>
            </div>
          )}
       </div>
       </div>
      
      
        {/* discount */}
       <div className='mt-10 border p-10 w-full flex flex-col'>
        <h1 className='text-lg font-medium'>discount</h1>
        <input   onChange={(e)=>handleAddDiscount(e)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 w-72' type="number" />
      </div>
       {/* description */}
       <div className='mt-10 border  py-10 w-screen justify-between flex flex-wrap'>
      <div className='w-1/2 pl-10'>
      <h1 className='text-lg font-medium'>Over view</h1>
      <div className='flex flex-col justify-start mt-5 items-start'>
        <div onChange={(e)=>setCustomDes(e.target.value)}>
        <input  className='' type="radio" value="paragraph" name="description" /> Paragraph 
        <input  className='ml-5' type="radio" value="point" name="description" /> Point
        </div>
        <div className='flex justify-center mt-7 items-center'>
       <textarea   value={description} onChange={(e)=>handleAddDescription(e)} className='mr-5 px-4 py-2 border outline-none  h-24 w-72' type="text" />
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
       
       {/* <div className='mt-10 w-screen flex flex-wrap flex-col '>
        {descriptions[0] &&  
        <div className='flex justify-start mb-10  '>
        <h1 className=' text-xl font-semibold'>Preview of your description</h1> 
        </div>
        }
        
        <ul className=' bg-white flex flex-wrap flex-col'>
        {descriptions && 
        descriptions.map((des)=>
        <div>
          <ul>
          {
            
            des.type === "point" &&
            <li>
              {des.description}
            </li>
          }
        </ul>
        <div className=''>
        {
            
            des.type === "paragraph" &&
            <p>
              {des.description}
            </p>
          }
        </div>
        </div>
        
       
        )
        }
        </ul>
      </div> */}
       {/* delivery */}

       <div className='my-20 border p-10 w-full'>
        <h1 className='mb-5'>Delivery</h1>
        <div>
        <div>
          <h1>
            country of origin
          </h1>
          <input   onChange={(e)=>setDeliveryCountry(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 mb-5 w-72' type="text" />
          </div>
          <div>
          <h1>
            origin pin code
          </h1>
          <input   onChange={(e)=>setPinCode(e.target.value)} className='px-4 py-2 mr-10 border outline-none mt-5 h-12 mb-5 w-72' type="number" />
        </div>
        <div>
          <h1>processing time</h1>
          <select   className='px-4 py-2 mr-10  border outline-none mt-5 h-12 w-72' value={deliveryRange} onChange={(e)=>handleDeliveryRange(e)}>
       <option value={""}>--Select range--</option>
          <option value={"1"}>1 business day</option>
          <option value={"1-2"}>1-2 business days</option>
          <option value={"1-3"}>1-3 business days</option>
          <option value={"3-5"}>3-5 business days</option>
          <option value={"5-7"}>5-7 business days</option>
          <option value={"custom"}>custom range</option>
       </select> 
      {deliveryBool &&
      <div>
        <div>
        <input   onChange={(e)=>setCustomRangeStart(e.target.value)} className='px-4 py-2 mr-8 border outline-none mt-5 h-12 w-32' type="number" />
        <input   onChange={(e)=>setCustomRangeEnd(e.target.value)} className='px-4 py-2  border outline-none mt-5 h-12 w-32' type="number" />
        </div>
        <div className='mt-5' onChange={(e)=>setCustomDays(e.target.value)}>

        <input  className='' type="radio" value="business days" name="days" /> business days

        <input  className='ml-5' type="radio" value="weeks" name="days" /> weeks


      </div>

      </div>
             
      }
        </div>
        </div>
       </div>

      {/* return/exchange */}

      <div className='border p-10 w-full'>
        <div>
          <h1>Returns and exchanges</h1>
          <div>
          {returnBool ?
        <div>
          {
            returnExchangeDaysCustom  ?
            <div>
<div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
            <div className='w-3/4'>
              <div className='flex justify-between items-center'>
              <h1>Returns and exchanges in {returnExchangeDaysCustom} days</h1>
              <h1 className='py-2 px-5 bg-yellow-400 rounded-lg font-semibold'>Custom Policy</h1>
              </div>
              <div>
              {returns ?
            <h1>Accepts return</h1>  
            :
            <h1>Don't accept returnr</h1>
            }
              </div>
            <div>
            {exchanges ?
            <h1>Accepts exchange</h1>  
            :
            <h1>Don't accept exchanges</h1>
            }
            </div>
              <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
             
            </div>
            <div onClick={()=>{
              setReturnBool(false);
              setReturnExchangeDays7(false)
              setReturnExchangeDays21(false)
              setReturnExchangeDays30(false)
            }} className='bg-gray-100 px-5 py-3 rounded-lg cursor-pointer'>Change</div>
            </div>
            </div>
            :
            <div>
          {
            returnExchangeDays7 && 
            <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
            <div className='w-3/4'>
              <h1>Returns and exchanges in 7 days</h1>
              <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
            </div>
            <div onClick={()=>{
              setReturnBool(false);
              setReturnExchangeDays7(true)
              setReturnExchangeDays21(false)
              setReturnExchangeDays30(false)
              setReturnExchangeDaysCustom("")
            }} className='bg-gray-100 px-5 py-3 rounded-lg cursor-pointer'>Change</div>
            </div>
          }
           {
            returnExchangeDays21 && 
            <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 21 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
        <div onClick={()=>{
          setReturnBool(false);
          setReturnExchangeDays7(false)
              setReturnExchangeDays21(true)
              setReturnExchangeDays30(false)
              setReturnExchangeDaysCustom("")

        }} className='bg-gray-100  px-5 py-3 rounded-lg cursor-pointer'>Change</div>
        </div>
          }
           {
            returnExchangeDays30 && 
            <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
            <div className='w-3/4'>
              <h1>Returns and exchanges in 30 days</h1>
              <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
            </div>
            <div onClick={()=>{
              setReturnBool(false);
              setReturnExchangeDays7(false)
              setReturnExchangeDays21(false)
              setReturnExchangeDays30(true)
              setReturnExchangeDaysCustom("")

            }} className='bg-gray-100 px-5 py-3 rounded-lg cursor-pointer'>Change</div>
            </div>
          }
        </div> 
          }
        </div>

        :
        <div>
        {policyBool ? 
        <div>
          <div>
            <div>
              <div>
              <h1>Returns</h1>
              <p>I accept returns of this item</p>
              </div>
              <div onClick={()=>setReturns(!returns)} className={`cursor-pointer ${returns ? 'bg-black' : "bg-gray-300"} h-5 w-10 rounded-full `}>

</div>
            </div>
            <div>
             <div>
              <h1>Exchanges</h1>
              <p>I accept exchanges of this item</p>
              </div>
              <div>
              <div onClick={()=>setExchanges(!exchanges)} className={`cursor-pointer ${exchanges ? 'bg-black' : "bg-gray-300"} h-5 w-10 rounded-full `}>

</div>
              </div>
            </div>
            <div>
              <h1>Buyer must contact me and send item back within</h1>
              <select   className='px-4 py-2 mr-10  border outline-none mt-5 h-12 w-72' value={returnExchangeDaysCustom} onChange={(e)=>setReturnExchangeDaysCustom(e.target.value)}>
       <option value={""}>--Select range--</option>
          
          <option value={"7"}>7 days of delivery</option>
          <option value={"14"}>14 days of delivery</option>
          <option value={"21"}>21days of delivery</option>
          <option value={"30"}>30 days of delivery</option>
          <option value={"45"}>45 days of delivery</option>
          <option value={"60"}>60 days of delivery</option>
          <option value={"90"}>90 days of delivery</option>     
          </select> 
            </div>
            <div>
              <h1>Conditions of return</h1>
              <p>Buyer is responsible for return postage costs</p>
              <p>Buyer is responsible for loss in value (as agreed upon with seller) if an item isn’t returned in original condition</p>
            </div>
            <div className='flex justify-between items-center'>
              <div onClick={handleCancelCustomReturns} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>cancel</div>
              <div onClick={handleAddCustomReturns} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>save and continue</div>
            </div>
          </div>
        </div> 
          
        :
        <div>
        
        <div className='flex justify-between items-center text-xl p-5 font-semibold'>
         {
          returnExchangeDays7 && 
          <div onClick={()=>setReturnBool(true)} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>
          back
        </div>
         }
         {
          returnExchangeDays21 && 
          <div onClick={()=>setReturnBool(true)} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>
          back
        </div>
         }
         {
          returnExchangeDays30 && 
          <div onClick={()=>setReturnBool(true)} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>
          back
        </div>
         }
         <div className='w-1'></div>
          <div onClick={()=>{setPolicyBool(true)}} className='bg-gray-100 py-2 px-5 cursor-pointer rounded-lg'>
            + create policy
          </div>
        </div>
        
       {returnExchangeDays7
       ?
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 7 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
        <div className='bg-gray-100 px-5 py-3 rounded-lg'> Applied </div>
        </div>
       
       :
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 7 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
        <div onClick={()=>{
          setReturnBool(true);
          setReturnExchangeDays7(true)
          setReturnExchangeDays21(false)
          setReturns(true)
          setExchanges(true)
          setReturnExchangeDaysCustom("")
          setReturnExchangeDays30(false)
        }} className='bg-gray-100 px-5 py-3 rounded-lg cursor-pointer'>Apply</div>
        </div>
       }
         {returnExchangeDays21
       ?
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
       <div className='w-3/4'>
         <h1>Returns and exchanges in 21 days</h1>
         <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
       </div>
       <div className='bg-gray-100 px-5 py-3 rounded-lg'> Applied </div>
       </div>
       :
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 21 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
        <div onClick={()=>{
          setReturnBool(true);
          setReturnExchangeDays7(false)
              setReturnExchangeDays21(true)
              setReturns(true)
              setExchanges(true)
              setReturnExchangeDaysCustom("")
              setReturnExchangeDays30(false)
        }} className='bg-gray-100  px-5 py-3 rounded-lg cursor-pointer'>Apply</div>
        </div>
       }
         {returnExchangeDays30
       ?
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 30 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
        <div className='bg-gray-100 px-5 py-3 rounded-lg'> Applied </div>
        </div>
       :
       <div className='flex justify-between p-5 mb-5 border rounded-lg items-center'>
        <div className='w-3/4'>
          <h1>Returns and exchanges in 30 days</h1>
          <p>Buyer is responsible for return postage costs and any loss in value if an item isn't returned in original condition.</p>
        </div>
       <div onClick={()=>{
        setReturnBool(true);
        setReturnExchangeDays7(false)
        setReturnExchangeDays21(false)
        setReturns(true)
        setExchanges(true)
        setReturnExchangeDaysCustom("")
        setReturnExchangeDays30(true)
      }} className='bg-gray-100 px-5 py-3 rounded-lg cursor-pointer'>Apply</div>
        </div>

       }
       
        </div>
        }
        </div>
        }
            <div>
              
            </div>
            <div>
              
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>

     


       </form> 
          
 
      <div className="flex w-3/4 mb-20 mt-24 justify-around items-center">
      <button  className='h-12 outline-none rounded-md w-48 text-white text-lg font-semibold bg-red-600'>Cancel</button>
      
      <Link className='outline-none' to="/shoplayout">
      <div onClick={(e)=>{
      handleSubmit(e)
      }} className='h-12 flex items-center justify-center outline-none rounded-md w-48 text-white text-lg font-semibold bg-blue-600'>Place item</div>
      </Link>
      </div>
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

export default SellerInput