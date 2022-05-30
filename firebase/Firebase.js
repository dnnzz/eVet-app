import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import "firebase/firestore";
import { getFirestore , setDoc , doc, getDoc, collection } from 'firebase/firestore';
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
export const createUserProfileDocument = async (user,additionalData) => {
  if(!user) return;
  // get reference ..
  const collectionRef = await collection(firestore,"users");
  const userRef = await doc(collectionRef,`${user.uid}`);
  if(!userRef){
    const {name,surname,email} = user;
    const createdAt = new Date();
    console.log(user,"ananı skim",additionalData);
    try{
      await setDoc(userRef,{
        name : name ? name : "",
        surname : surname ? surname : "",
        email,
        createdAt,
        ...additionalData,
      })
    }catch(error){
      console.error(error); 
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) =>{
  if(!uid) return null;
  try{
    const userRef = doc(firestore,"users",uid);
    return await getDoc(userRef);
  }catch(error){
    console.error(error);
  }
}

export const signOut = () => auth.signOut();
