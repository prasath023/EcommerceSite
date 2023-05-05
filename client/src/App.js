import './App.css';
import Buy from "./Buy.js"
import Sell from "./Sell.js"
import Learn from "./Learn.js"
import Cart from "./Cart.js"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useNavigate } from "react-router-dom";
//rzp_test_SE8HbmC3EWduHu
//c8mek47ejgMVmLCa6BaLzZOC
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './SignUp';
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthErrorCodes } from 'firebase/auth'
import {
    auth,
    db,
    onAuthStateChanged
} from "./components/firebase"
import { setDoc, doc } from 'firebase/firestore';
import Product from './components/Product';
import AddCourses from './components/AddCourses';
import Course from './components/Course';
import SetShopDetails from './SetShopDetails';
import StartShop from './components/StartShop';
import SellerInput from './components/SellerInput';
import MyCourses from './components/MyCourses';
import EnrolledCourse from './components/EnrolledCourse';
import Favorites from './components/Favorites';
import Orders from './components/Orders';
import Billings from './components/Billings';
import Home from './components/Home';
import Shop from './components/Shop';
import Address from './components/Address';
import ChangeAddress from './components/ChangeAddress';
import FavCourses from './components/FavCourses';


function App() {
  const [currentUser,setCurrentUser]=useState("no user")
  const [error,setError]=useState("")
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setCurrentUser(user)
      }
      else{
        setCurrentUser("no user")
        console.log(error.message);
      }
    })
   }, [])

   useEffect(()=>{
   
   },[currentUser])

  const signUp = (email,password,userName)=>{
    setError("")
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const ref= doc(db,"users",user.uid)
      const docRef= await setDoc(ref,{userName})
      .then(()=>{
          user.uid && routeChange()
      })
      .catch((error)=>{
        if(error.code == 'auth/email-already-in-use'){
          setError("email already exists")
        }
        else{
          setError(error.message)
        }
      })
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
   }
  
  return (
    <>
    <div className="z-50 bg-gray-100 ">
     
    </div>
      <Routes>
          <Route exact path="/" element={<Home signUp={signUp} error={error} currentUser={currentUser}/>} />
          <Route path="/buy" element={<Buy signUp={signUp} error={error} currentUser={currentUser}/>} />
          <Route path="/shoplayout" element={<Sell currentUser={currentUser}/>} />
          <Route path="/shop" element={<Shop currentUser={currentUser}/>} />
          <Route path="/placeproduct" element={<SellerInput currentUser={currentUser}/>} />
          <Route path="/address" element={<Address currentUser={currentUser}/>} />
          <Route path="/changeaddress" element={<ChangeAddress currentUser={currentUser}/>} />
          <Route path="/orders" element={<Orders currentUser={currentUser}/>} />
          <Route path="/billings" element={<Billings currentUser={currentUser}/>} />
          <Route path="/startshop" element={<StartShop currentUser={currentUser}/>} />
          <Route path="/shopname" element={<SetShopDetails currentUser={currentUser}/>} />
          <Route path="/learn" element={<Learn currentUser={currentUser}/>} />
          <Route path="/cart" element={<Cart  currentUser={currentUser}/>} />
          <Route path="/favorite-products" element={<Favorites  currentUser={currentUser}/>} />
          <Route path="/favorite-courses" element={<FavCourses  currentUser={currentUser}/>} />
          <Route path="/addcourses" element={<AddCourses  currentUser={currentUser}/>} />
          <Route path="/products/:id" element={<Product currentUser={currentUser}/>} />
          <Route path="/learn/courses/:id" element={<Course currentUser={currentUser}/>} />
          <Route path="/learn/courses/enrolled/:id" element={<EnrolledCourse currentUser={currentUser}/>} />
          <Route path="/learn/courses/mycourses" element={<MyCourses currentUser={currentUser}/>} />
          <Route path="/signin" element={<Login currentUser={currentUser}/>} />
          <Route path="/signup" element={<SignUp signUp={signUp} error={error} currentUser={currentUser}/>} />
      </Routes>
    </>
    
  );
}

export default App;
