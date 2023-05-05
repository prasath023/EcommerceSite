import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './components/firebase';
import "./css/Cart.css"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import CloseIcon from '@mui/icons-material/Close';
import Cartproducts from './components/Cartproducts';
import HeaderBuy from './components/HeaderBuy';


const Cart = ({currentUser}) => {
  const [cartData,setCartData]=useState()
  const [removeItem,setRemoveItem]=useState()
  const [total,setTotal]=useState()
  const [userName,setUserName]=useState()
  const [orderId,setOrderId]=useState()
  const [onlinePayment,setOnlinePayment]=useState(true)
  const [COD,setCOD]=useState(false)
  let totalAmount=0
  let newDate = new Date()
  let day = newDate.getDate();
  let month = newDate.getMonth() 
  // const [removeItem,setRemoveItem]=useState()
  const [openMenu,setOpenMenu]=useState(false)
  const [addressData,setAddressData]=useState('')
  const [fullName,setFullName]=useState("")
  const [pinCode,setPinCode]=useState("")
  const [country,setCountry]=useState("")
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/orders`; 
    navigate(path);
  }
  const handleOpenMenu=(pass)=>{
      setOpenMenu(pass)
  }
  
  async function fetchAddressData() {
    const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/address`));
    setAddressData(querySnapshot.docs)
    }

    useEffect(() => {
      fetchAddressData()
    }, [currentUser])

    const handleStates=()=>{
      addressData && 
      addressData.map((data)=>{
      setCountry(data.data().country)
      setPinCode(data.data().pinCode)
      setFullName(data.data().fullName)
      
      })
  }

  useEffect(() => {
      handleStates()
    }, [addressData])

  let totalArr=[]
  async function fetchData() {
  const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/cart`));
   setCartData(querySnapshot.docs)
  }
  
  const handleRemove=(id)=>{
    const docRef = doc(db, `users/${currentUser.uid}/cart`, id);
    setRemoveItem(true)
    setTimeout(() => {
      setRemoveItem(false)
  }, 3000);
    deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.")
  })
  .catch(error => {
      console.log(error);
  })
  }


  const fetchUserName=async()=>{
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap.data().userName)
  }


  useEffect(() => {
   fetchData()
  }, [currentUser,handleRemove])

  useEffect(() => {
    
fetchUserName()

   }, [])
   useEffect(() => {
    handleTotal()


   }, [])
  

  const handleTotal=()=>{
    if(cartData){
      cartData.map((product)=>{
        totalArr.push(product.data().price * product.data().quantityCart)
      })
      if(totalArr.length>0){
        for(let i=0;i<totalArr.length;i++){
          let num=parseInt(totalArr[i])
         totalAmount+= num
        }
       setTotal(totalAmount)
      }
    }
  }
 


 

 const handleAfterPay=async(response,idd,data)=>{
     
  if(response){

      console.log(response);
      
      const docRef = doc(db, "users", currentUser.uid);
      const colRef = collection(docRef, "orders")
      
      
      data.map(async(d,index)=>{
        console.log(d.data());
        const docRef2 = doc(db, "sellers", d.data().owner);
        const colRef2 = collection(docRef2, "orders")
       const ref= doc(colRef2,d.id+response.razorpay_order_id)

       await setDoc(ref, {
        date:{
          day,
          month,
        },
        id:d.id,
        userName,
        response:response,
        buyer:currentUser.uid,
        productName: d.data().productName,
        images: d.data().images && d.data().images,
        descriptions: d.data().descriptions,
        price: d.data().price,
        quantity:d.data().quantity,
        quantityCart:d.data().quantityCart,
        owner:d.data().owner,
        quantity: d.data().quantity,
        deliveryDetails: d.data().deliveryDetails, 
        returnExchangeDays: d.data().returnExchangeDays,
        status:"paid",
         })})

     data.map(async(d,index)=>{
      console.log(d.data());
     const ref= doc(colRef,d.id+response.razorpay_order_id)
     await setDoc(ref, {
      date:{
        day,
        month,
      },
      id:d.id,
      response:response,
      buyer:currentUser.uid,
      quantity:d.data().quantity,
      quantityCart:d.data().quantityCart,
      productName: d.data().productName,
      images: d.data().images && d.data().images,
      descriptions: d.data().descriptions,
      price: d.data().price,
      owner:d.data().owner,
      quantity: d.data().quantity,
      deliveryDetails: d.data().deliveryDetails, 
      returnExchangeDays: d.data().returnExchangeDays,
      status:"paid",
       }).then(()=>{
       
          handleRemove(d.id)
          routeChange()
       })
      })



      

      
          // const docRef1 = doc(db, `learning/${id}`);
          // const data1 = {
          //   sold:data.data().sold+1,

          //   };
          // updateDoc(docRef1, data1)
          // console.log("updating")


  }

}

const handleAfterCOD=async(data)=>{
     
  if(COD){

      
      const docRef = doc(db, "users", currentUser.uid);
      const colRef = collection(docRef, "orders")
      
      
      data.map(async(d,index)=>{
        console.log(d.data());
        const docRef2 = doc(db, "sellers", d.data().owner);
        const colRef2 = collection(docRef2, "orders")
       const ref= doc(colRef2,d.id  + Math.random() * (10000 - 1))

       await setDoc(ref, {
        date:{
          day,
          month,
        },
        id:d.id,
        userName,
        
        buyer:currentUser.uid,
        productName: d.data().productName,
        images: d.data().images && d.data().images,
        descriptions: d.data().descriptions,
        price: d.data().price,
        quantity:d.data().quantity,
        quantityCart:d.data().quantityCart,
        owner:d.data().owner,
        quantity: d.data().quantity,
        deliveryDetails: d.data().deliveryDetails, 
        returnExchangeDays: d.data().returnExchangeDays,
        status:"cash on delivery",
         })})

     data.map(async(d,index)=>{
      console.log(d.data());
     const ref= doc(colRef,d.id + Math.random() * (10000 - 1))
     await setDoc(ref, {
      date:{
        day,
        month,
      },
      id:d.id,
      buyer:currentUser.uid,
      quantity:d.data().quantity,
      quantityCart:d.data().quantityCart,
      productName: d.data().productName,
      images: d.data().images && d.data().images,
      descriptions: d.data().descriptions,
      price: d.data().price,
      owner:d.data().owner,
      quantity: d.data().quantity,
      deliveryDetails: d.data().deliveryDetails, 
      returnExchangeDays: d.data().returnExchangeDays,
      status:"cash on delivery",
       }).then(()=>{
       
          handleRemove(d.id)
          setCOD(false)
          routeChange()
       })
      })



      

      
          // const docRef1 = doc(db, `learning/${id}`);
          // const data1 = {
          //   sold:data.data().sold+1,

          //   };
          // updateDoc(docRef1, data1)
          // console.log("updating")


  }

}


 const handleOrder=async(price,data)=>{
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
       
             handleAfterPay(response,order_id,data)

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

 useEffect(() => {
  handleTotal()
 }, [cartData,handleRemove,currentUser,handleOrder])

  return (
    <div>
     <HeaderBuy openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

      <div className='flex w-screen '>
      <div className='w-3/4'>
      <ul className='flex justify-center pl-10 pr-5 flex-col flex-wrap items-start mt-16 '>

        {cartData && cartData.map(product=>
         <Cartproducts currentUser={currentUser} product={product} />
         )}
      </ul>
      </div>




      <div className='w-1/4 sticky top-0 right-0 mr-10 h-screen'>
      {cartData && cartData.length >= 1 && 
      <div className='flex flex-col mt-20 shadow-2xl rounded-lg p-7 py-10 justify-center items-start'>
        <div>
          <div onClick={()=>{
            setCOD(true)
            setOnlinePayment(false)
          }} className='flex items-center  mb-5'>
            <div  className={`h-5 w-5 mr-3 flex justify-center items-center cursor-pointer ${COD ? 'bg-orange-500 border-2 border-orange-500' : 'bg-white border-2 border-orange-500'}  rounded-full `}>
              <div className='h-2 w-2 bg-gray-100 rounded-full'></div>
            </div>
            <h1 className='cursor-pointer'>Cash on delivery</h1>
          </div>
          <div onClick={()=>{
            setCOD(false)
            setOnlinePayment(true)
          }} className='flex items-center  mb-10'>
            <div  className={`h-5 w-5 mr-3 flex justify-center items-center cursor-pointer ${onlinePayment ? 'bg-orange-500 border-2 border-orange-500' : 'bg-white border-2 border-orange-500'}  rounded-full `}>
            <div className='h-2 w-2 bg-gray-100 rounded-full'></div>
            </div>
            <h1 className='cursor-pointer'>Online payment</h1>
          </div>
        </div>
        <div className='flex mb-10 items-center'>
          <h1>Address:</h1>
          {
            addressData ? 
            <div className='flex items-baseline'>
          <div className='text-sm  ml-2'>
          To {country && country}, {pinCode && pinCode}
          </div>
          <Link className='outline-none' to="/changeaddress"><div className='text-sm text-blue-600 underline-offset-2 font-medium underline ml-2'>
          Change
          </div></Link>
          </div>
          :
          <div>
            <Link className='outline-none' to="/address">
              <div className='text-sm text-blue-600 underline-offset-2 font-medium underline ml-3'>Add address</div>
            </Link>
          </div>
          }
        </div>
        <div className={`flex  items-center`}>
        <div className={`flex   rounded-md  items-center  justify-start `}>
        <h1 className='mr-3'>Total {cartData && cartData.length} item(s): </h1>
        <CurrencyRupeeIcon className='' fontSize='small'/>
        <h1 className='text-2xl font-medium'>{total}</h1>
        </div>

        </div>
    
      <div className='flex mt-7 justify-center  items-center'>
        {
          onlinePayment && !COD &&
       <div onClick={()=>handleOrder(total,cartData)} className=' font-semibold rounded-sm cursor-pointer flex justify-center items-center bg-black text-white py-2 px-5'>Proceed to checkout</div>

        }
        {
          !onlinePayment && COD &&
       <div onClick={()=>handleAfterCOD(cartData)} className=' font-semibold rounded-sm cursor-pointer flex justify-center items-center bg-black text-white py-2 px-5'>Proceed to checkout</div>

        }

      </div>
      </div>
      
      
     }
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
     
    </div>
  )
}

export default Cart