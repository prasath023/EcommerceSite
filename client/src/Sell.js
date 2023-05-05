import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './components/firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import CloseIcon from '@mui/icons-material/Close';  


const Sell = ({currentUser}) => {
  const [placeProduct,setPlaceProduct]=useState(false)
  const [ category,setCategory ]=useState("")
  const [ productName,setProductName ]=useState("")
  const [ price,setPrice ]=useState("")
  const [ imageUrl,setImageUrl ]=useState("")
  const [ discount,setDiscount ]=useState("")
  const [ description,setDescription ]=useState("")
  const [ sellerData,setSellerData ]=useState([])
  const [ openStore,setOpenStore ]=useState(false)

  
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, `sellers/${currentUser.uid}/products`));
     setSellerData(querySnapshot.docs)
    }
    console.log(sellerData);
  const handleOpenPlacing=async()=>{
    setPlaceProduct(true)
    const ref= doc(db,"sellers",currentUser.uid)
  const email=currentUser.email
  const docRef= await setDoc(ref,{
    email:email
  })
  }

const handleRemove=(id)=>{
  const docRef = doc(db, `sellers/${currentUser.uid}/products`, id);
  const docRef1 = doc(db, `products/${id}`);
//   setRemoveItem(true)
//   setTimeout(() => {
//     setRemoveItem(false)
// }, 3000);
  deleteDoc(docRef)
  deleteDoc(docRef1)

  .then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
}

useEffect(() => {
  fetchData()
 }, [currentUser,handleRemove])

 const [openMenu,setOpenMenu]=useState(false)

 const handleOpenMenu=(pass)=>{
     setOpenMenu(pass)
 }


  return (
    <>

    <div className='flex flex-col justify-center items-center mb-20'>
      
      <div className='mt-10'>

        <div className='flex justify-center flex-wrap items-center'>
        {sellerData && sellerData.map(product=>
            <li className='shadow-md my-6 h-64 pb-5 w-44 mr-10 rounded-md flex items-center justify-center' key={product.id}>
            <div>
            <Link className='outline-none'  to={`/products/${product.id}`}>

              <div className='flex justify-center items-center py-2'>
                <img className='h-20 w-20 object-cover' src={product.data().imageUrl} alt="" />
              </div>
              <div className='flex justify-around items-center'>

             <h1>{product.data().title}</h1> 
            
              </div>
              <div className='flex my-3 items-center'>
                    <CurrencyRupeeIcon className='' fontSize='string'/>
                    <h1 className='text-lg font-semibold'>{product.data().price}<span className='text-base font-normal'>.00</span></h1>
                </div>
          </Link>
           
              <div className='flex items-center justify-center'>
              <button className='cursor-pointer text-red-600 font-semibold bg-gray-100 h-7 w-20 rounded-md flex justify-center items-center mt-5' onClick={()=>{handleRemove(product.id)}}>remove</button>
              </div>
            </div>
          </li>
          )}
       {/* <Link className='outline-none'  to="/placeproduct"> 

        <div  className='flex mr-5 justify-center items-center rounded-md bg-gray-200 text-7xl font-light h-64 pb-5 w-44 cursor-pointer'>
          +
        </div>
        </Link>  */}
       
        
      
       

        
        </div>
       
      </div>
      
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
    </>
  )
}

export default Sell