import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';


const BuyLinks = ({currentUser,handleCatKey,setSearchData}) => {
    // '>Mobiles <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    // '>Electronics <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    // '>Fashion <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    // '>Sports <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    // '>Appliances <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    // '>Beauty & personal care <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-1'/></li>
    // <li className='cursor-pointer flex items-center  text-xs'>More <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-2'/></li>
    const [mobileCat,setMobileCat]=useState('')
    const [mobileSubCat,setMobileSubCat]=useState('')
    const [electronicsCat,setElectronicsCat]=useState('')
    const [electronicsSubCat,setElectronicsSubCat]=useState('')
    const [fashionSubCat,setFashionSubCat]=useState('')
    const [sportsSubCat,setSportsSubCat]=useState('')
    const [appliancesSubCat,setAppliancesSubCat]=useState('')
    const [beautySubCat,setBeautySubCat]=useState('')
    const [fashionCat,setFashionCat]=useState('')
    const [sportsCat,setSportsCat]=useState('')
    const [appliancesCat,setAppliancesCat]=useState('')
    const [beautyCat,setBeautyCat]=useState('')
    // const [mobileCat,setMobileCat]=useState('')
    const links=[
        {name:"Jewellery & Accessories",
         subMenu:true,
         subLinks:
            mobileSubCat && mobileSubCat.map((link)=>
            ({
                name: link,
                path:`/${link}`
            })
            )
         
        },
        {name: "Clothing & Shoes",
         subMenu:true,
         subLinks:
            electronicsSubCat && electronicsSubCat.map((link)=>
            ({
                name: link,
                path:`/${link}`
            })
            )
         
        },
        // {name: "Home & Living",
        //  subMenu:true,
        //  subLinks:
        //     fashionSubCat && fashionSubCat.map((link)=>
        //     ({
        //         name: link,
        //         path:`/${link}`
        //     })
        //     )
         
        // },
        {name: "Craft Supplies",
         subMenu:true,
         subLinks:
            sportsSubCat && sportsSubCat.map((link)=>
            ({
                name: link,
                path:`/${link}`
            })
            )
         
        },
        {name: "Art & Collectibles",
         subMenu:true,
         subLinks:
            appliancesSubCat && appliancesSubCat.map((link)=>
            ({
                name: link,
                path:`/${link}`
            })
            )
         
        },
        {name: "Beauty & personal care",
         subMenu:true,
         subLinks:
            beautySubCat && beautySubCat.map((link)=>
            ({
                name: link,
                path:`/${link}`
            })
            )
         
        },
        
    ]

    const fetchElectronicsCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setElectronicsCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="toys & school supplies" 
    ))          
   
    // setElectronicsSubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    const fetchFashionCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setFashionCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="fashion"
    ))
    // setFashionSubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    const fetchSportsCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setSportsCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="toys & school supplies"
    ))
    // setSportsSubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    const fetchAppliancesCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setAppliancesCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="toys & school supplies"
    ))
    // setAppliancesSubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    const fetchBeautyCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setBeautyCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="toys & school supplies"
    ))
    // setBeautySubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    const fetchMobileCat=async()=>{
        const q = query(collection(db,"products"));
        const querySnapshot=await getDocs(q)
        setMobileCat(querySnapshot.docs.filter((doc)=>
            doc.data().category.category==="toys & school supplies"
    ))
    // setMobileSubCat( querySnapshot.docs.map(sub=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))
    }
    useEffect(() => {
        mobileCat && setMobileSubCat(mobileCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[mobileCat])
    useEffect(() => {
        electronicsCat && setElectronicsSubCat(electronicsCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[electronicsCat])
    useEffect(() => {
        sportsCat && setSportsSubCat(sportsCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[sportsCat])
    useEffect(() => {
        beautyCat && setBeautySubCat(beautyCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[beautyCat])
    useEffect(() => {
        fashionCat && setFashionSubCat(fashionCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[fashionCat])
    useEffect(() => {
        appliancesCat && setAppliancesSubCat(appliancesCat.map((sub)=>sub.data().category.subCategory).filter((val,id,array) => array.indexOf(val) == id))

    },[appliancesCat])
    useEffect(() => {
        fetchMobileCat()
        fetchSportsCat()
        fetchAppliancesCat()
        fetchBeautyCat()
        fetchFashionCat()
        fetchElectronicsCat()
     }, [])

  return (
    <div className='mr-7 hidden lg:flex'>
    <div className='flex justify-center items-center'>
    {links.map((link)=>
    <div className='flex flex-col group h-12 justify-center'>
    <div className='cursor-pointer flex items-center mr-5 text-xs '>
        {link.name}
        <KeyboardArrowDownIcon style={{fontSize: '15px'}} className='ml-1'/>
    </div>
    {link.subMenu && 
    <div >
    <div className='absolute z-50 top-32 hidden group-hover:block hover:block'>
        <div className='py-3'>
            <div className='w-3 h-3 rotate-45 left-2 mt-2 bg-white absolute'>

            </div>
        </div>
    <div className='bg-white shadow-xl p-4'>
        {
            link.subLinks && link.subLinks.map((sub,index)=>
            // <Link to={`${sub.path}`} className="outline-none hover:text-blue-600 hover:underline underline-offset-2">
                <div key={index} className="outline-none hover:text-blue-600 hover:underline underline-offset-2 cursor-pointer text-xs" onClick={()=>{handleCatKey(sub.name)
                    setSearchData("")
                }}>
                 {sub.name}
                </div>
            // </Link>
            )
        }
    </div>
    </div>
    </div>
    
    }
    </div>
    
    )}
    </div>
    </div>
  )
}

export default BuyLinks