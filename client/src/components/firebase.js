// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyBC13btGV3n-jtKrIxhfBNDAmjPXVGF2w4",

    authDomain: "projectecomsite.firebaseapp.com",

    projectId: "projectecomsite",

    storageBucket: "projectecomsite.appspot.com",

    messagingSenderId: "743813460481",

    appId: "1:743813460481:web:0f0fbdce51319c4384c600",

    measurementId: "G-V6MCL5N54T"

};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
export {
    onAuthStateChanged,
    auth,
    db,
    storage,
}

//npm install -g firebase-tools