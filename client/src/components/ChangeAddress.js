import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Header from './Header';
import { Link } from 'react-router-dom';
import { async } from '@firebase/util';
import { db } from './firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';


const ChangeAddress = ({currentUser}) => {
    const [openMenu,setOpenMenu]=useState(false)
    const [country,setCountry]=useState("")
    const [phone,setPhone]=useState("")
    const [state,setState]=useState("")
    const [landMark,setLandMark]=useState("")
    const [fullName,setFullName]=useState("")
    const [pinCode,setPinCode]=useState("")
    const [flat,setFlat]=useState("")
    const [area,setArea]=useState("")
    const [city,setCity]=useState("")
    const [addressData,setAddressData]=useState('')
    let countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    let stateList = [ "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]
   
    const handleOpenMenu=(pass)=>{
        setOpenMenu(pass)
    }
    
    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/address`));
        setAddressData(querySnapshot.docs)
        }

        useEffect(() => {
          fetchData()
        }, [currentUser])
console.log(addressData && addressData);
        const handleStates=()=>{
            addressData && 
            addressData.map((data)=>{
                setCountry(data.data().country)
            setPhone(data.data().phone)
            setPinCode(data.data().pinCode)
            setFullName(data.data().fullName)
            setState(data.data().state)
            setCity(data.data().city)
            setArea(data.data().area)
            setFlat(data.data().flat)
            setLandMark(data.data().landMark)
            })
        }

        useEffect(() => {
            handleStates()
          }, [addressData])
        

    const handleAddAddress=async(e)=>{
        e.preventDefault();
        if(currentUser==="no user"){
            return
          }
          else{
            const docRef = doc(db, "users", currentUser.uid);
          const colRef = collection(docRef, "address")
          const ref= doc(colRef,currentUser.uid)
         
          await setDoc(ref, {
            country,
            phone,
            landMark,
            state,
            fullName,
            city,
            area,
            flat,
            pinCode,
                     }).then(()=>{
                        setArea("")
                        setCity("")
                        setCountry("")
                        setFlat("")
                        setState("")
                        setFullName("")
                        setLandMark("")
                        setPinCode("")
                        setPhone("")
                     })
          }
    }
    
  return (
    <div className='w-screen'>
     <Header openMenu1={openMenu} handleOpenMenu={handleOpenMenu}  currentUser={currentUser}/>

        <form onSubmit={(e)=>handleAddAddress(e)} className='flex mb-20 justify-center items-start w-3/5  mt-10 mx-auto flex-col'>
            <h1 className='text-3xl font-semibold mb-10'>Edit Address</h1>
            <h1>Country/Region</h1>
            <select   className='px-5 py-2 mr-10 border outline-none mt-3 mb-6 w-full' value={country} onChange={(e)=>setCountry(e.target.value)}>
       <option value={""}>--Select country--</option>
       
        {countryList.map(cat=>
           <option value={cat && cat.toLowerCase()}>{cat}</option>
          )}

       </select> 
            <h1>Full name (First and last name)</h1>
            <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="text" />
            <h1>Mobile number</h1>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="number" />
            <h1>Pincode</h1>
            <input value={pinCode} onChange={(e)=>setPinCode(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="number" />
            <h1>Flat, House no., Building, Company, Apartment</h1>
            <input value={flat} onChange={(e)=>setFlat(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="text" />
            <h1>Area, Street, Sector, Village</h1>
            <input value={area} onChange={(e)=>setArea(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="text" />
            <h1>Landmark</h1>
            <input value={landMark} onChange={(e)=>setLandMark(e.target.value)} className='mt-3 mb-6 w-full py-2 px-5 outline-none border border-black rounded-sm' type="text" />
            <div className='flex w-full'>
            <div className='mr-1'>
            <h1>Town/City</h1>
            <input value={city} onChange={(e)=>setCity(e.target.value)} className='mt-3  mb-6 w-full py-2 px-5 border outline-none border-black rounded-sm' type="text" />
            </div>
            <div className='ml-1'>
            <h1>State</h1>
            <select   className='px-5 py-2 mr-10 border outline-none mt-3 mb-6 w-full' value={state} onChange={(e)=>setState(e.target.value)}>
       <option value={""}>--Select state--</option>
       
        {stateList.map(cat=>
           <option value={cat && cat.toLowerCase()}>{cat}</option>
          )}

       </select> 
            </div>
            </div>
            <button onSubmit={(e)=>handleAddAddress(e)} className='px-5 py-2 bg-black rounded-sm text-white font-medium mt-5'>
                Use this address
            </button>
        </form>
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

export default ChangeAddress