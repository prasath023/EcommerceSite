import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import HeaderBuy from './HeaderBuy';


const Favorites = ({currentUser}) => {
    const imageRef = useRef(null);
    const [openMenu,setOpenMenu]=useState(false)

    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/signin`; 
      navigate(path);
    } 

    const [favData,setFavData]=useState([])

    const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
        const imageRef = useRef(null);
      
        return (
          <img className=''
            onMouseOver={() => {
              imageRef.current.src = secondaryImg;
            }}
            onMouseOut={() => {
              imageRef.current.src= primaryImg;
            }}
            src={primaryImg} 
            alt=""
            ref={imageRef}
          />
        )
      }

      const handleAddToCart=async(id,product)=>{
        if(currentUser==="no user"){
          routeChange()
        }
        else{
          const docRef = doc(db, "users", currentUser.uid);
        const colRef = collection(docRef, "cart")
        const ref= doc(colRef,id)
       
        await setDoc(ref, {
          productName:product.data().productName,
          quantity:product.data().quantity,
          quantityCart:1,
          images: product.data().images,
          descriptions:product.data().descriptions,
          price:product.data().price,
          owner:product.data().owner,
          deliveryDetails:product.data().deliveryDetails, 
          returnExchangeDays:product.data().returnExchangeDays,
                   });
        }
        }

    async function fetchFav() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/favourite`));
         setFavData(querySnapshot.docs)
        }
        const removeFromFav=(product)=>{
            const docRef = doc(db, `users/${currentUser.uid}/favourite`, product.id);
           
            deleteDoc(docRef)
            .then(() => {
              console.log("Entire Document has been deleted successfully.")
          })
          .catch(error => {
              console.log(error);
          })

          }

useEffect(() => {
  fetchFav()
}, [])

useEffect(() => {
    fetchFav()
  }, [removeFromFav])

       
  return (
    <div>

<HeaderBuy openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>


          <div className='relative flex flex-wrap justify-around  items-center'>      
       {favData.map(product=>
                   <div key={product.id} className='rounded-md lg:mt-10 mt-5 lg:pb-5 lg:mb-14 pb-3 transition-all duration-500 cursor-pointer flex-col  items-center justify-center border-gray-300 shadow-lg lg:shadow-2xl w-44 lg:w-72'>

          <Link className='outline-none'  to={`/products/${product.id}`}>
          <ImageToggleOnMouseOver className="transition-all duration-300"
        primaryImg={product.data().images && product.data().images[0].imageUrl}
        secondaryImg={product.data().images[2] ? product.data().images[2].imageUrl : product.data().images[0].imageUrl}
        alt="" />
          {/* {
            secondImage ? 
          <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={} alt={product.data().productName} />
            :
          <img className={`h-64 w-full hover:${()=>setSecondImage(true)} mx-auto object-cover`} src={product.data().images && product.data().images[1].imageUrl} alt={product.data().productName} />
          } */}
          </Link>
        
          <div className='lg:pt-4 pt-2 px-2 lg:px-4'>

          <Link className='outline-none'  to={`/products/${product.id}`}>

          <h1 className='lg:text-xl sm:font-medium text-sm mb-2  text-black'>{product.data().productName}</h1>

              <div className='flex justify-between items-center'>
                  <div className='flex '>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarIcon style={{fontSize: '15px'}}/>
            <StarHalfIcon style={{fontSize: '15px'}}/>
            <StarOutlineIcon style={{fontSize: '15px'}}/>
           </div>
           <div className='text-white text-sm font-bold bg-gray-300 lg:h-7 lg:w-14 lg:mr-3 h-4.5 mr-1 w-10 flex justify-center items-center '>
                         10%
                     </div>
              </div>     
              </Link>

              <div className='flex items-center justify-between'>
                <div className='flex my-3'>
                <CurrencyRupeeIcon className='' fontSize='string'/>
                <h1 className='lg:text-xl text-base font-semibold'>{product.data().price}<span className='lg:text-base text-xs font-normal'>.00</span></h1>

                </div>
                 <div className='lgmr-3 text-xs lg:text-base bg-gray-200'>
                
                   <h1 className='py-1 px-2' onClick={()=>{
                    removeFromFav(product)}}>Remove</h1>
                 

                 </div>
              </div>
              <button className='outline-none mx-auto  lg:mt-2 flex items-center justify-center text-sm lg:text-base w-40 lg:w-full text-white lg:h-9 h-7 bg-black'onClick={()=>handleAddToCart(product.id,product)} >Add to bag</button>

             
          </div>
          
      </div>
       )}
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

export default Favorites