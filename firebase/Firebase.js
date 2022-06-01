import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import "firebase/firestore";
import { getFirestore , setDoc , doc, getDoc, collection, updateDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyA8hCr73u7RiiVbDDsCjY942ULCjsGMNM4",
  authDomain: "evet-app-29a9b.firebaseapp.com",
  projectId: "evet-app-29a9b",
  storageBucket: "evet-app-29a9b.appspot.com",
  messagingSenderId: "161340777503",
  appId: "1:161340777503:web:bf26179e93ff79c8e7a12a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const login = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}
export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential
    })
    .catch((error) => {
      console.error(error);
    });
}
export const firestore =  getFirestore(app);
export const createUserProfileDocument = async (details) => {
  if(!details) return;
  // get reference ..
  const collectionRef = await collection(firestore,"userTable");
  const userRef = await doc(collectionRef,`${details.email}`);
  if(!userRef.exists){
    const {name,surname,veterinary,email} = details;
    const createdAt = new Date();
    try{
      await setDoc(userRef,{
        email:email,
        name:name,
        surname:surname,
        veterinary:veterinary,
        createdAt
      })
    }catch(error){
      console.error(error); 
    }
  }
  return getUserDocument(details.email);
};

export const getUserDocument = async (email) =>{
  if(!email) return null;
  try{
    const userRef = doc(firestore,"userTable",email);
    return await getDoc(userRef);
  }catch(error){
    console.error(error);
  }
}

export const signOut = () => auth.signOut();
