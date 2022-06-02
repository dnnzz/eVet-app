import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import "firebase/firestore";
import { getFirestore , setDoc , 
  doc,
  query,
  getDoc, 
  collection, 
  getDocs, 
  collectionGroup } from 'firebase/firestore';
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
export const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}
export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      console.error(error.code)
      console.error(error);
    });
}
export const firestore =  getFirestore(app);
// creates user profile in firestore collection
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
// gets user profile from firestore collection
export const getUserDocument = async (email) =>{
  if(!email) return null;
  try{
    const userRef = doc(firestore,"userTable",email);
    return await getDoc(userRef);
  }catch(error){
    console.error(error);
  }
}
// adds pet to firestore collection
export const addPetToDB = async (email,pet) => {
  if(!email) return;
  const {name,info} = pet;
  const userRef = await doc(firestore,"userTable",email);
  const petTableRef = await collection(userRef,"petTable");
  const petRef = await doc(petTableRef,name);
  try{
    await setDoc(petRef,{
      name:name,
      info:info
    });
  }catch(error){
    console.error(error);
  }
}
export const getPetsFromDB = async (email,setLoading) => {
  if(!email) return;
  let petsArr = [];
  const userRef = await doc(firestore,"userTable",email);
  const petTableRef = await collection(userRef,"petTable");
  const pets = await getDocs(petTableRef);
  pets.forEach((pet) => {
    petsArr.push(pet.data());
  })
  setLoading(false);
  return petsArr;
}
export const getPetAppointmentFromDB = async (email,petName) => {
  if(!email) return;
  let appointmentsArr = [];
  const userRef = await doc(firestore,"userTable",email);
  const petTableRef = await collection(userRef,"petTable");
  const petRef = await doc(petTableRef,petName);
  const appointments = await collection(petRef,"appointmentTable");
  const appointmentsData = await getDocs(appointments);
  appointmentsData.forEach((appointment) => {
    appointmentsArr.push(appointment.data());
  })
  return appointmentsArr;
}
export const getAppointmentsFromDB = async (email,setLoading) => {
  if(!email) return;
  let appointmentsArr = [];
  const appointments = query(collectionGroup(firestore,"appointmentTable"));
  const appointmentsData = await getDocs(appointments);
  appointmentsData.forEach((appointment) => {
    let data = appointment.data();
    if(data.owner === email){
      appointmentsArr.push(data);
    }
  })
  setLoading(false);
  return appointmentsArr;
}

export const postAppointmentToDB = async (email,appointment) => {
  if(!email) return;
  const {id,pet,owner,type,hour,date,additionalMsg} = appointment;
  const userRef = await doc(firestore,"userTable",email);
  const petCollection = await collection(userRef,"petTable");
  const petRef = await doc(petCollection,pet);
  const appointmentCollection = await collection(petRef,"appointmentTable");
  const appointmentRef = await doc(appointmentCollection,id);
  try{
    await setDoc(appointmentRef,{
      id:id,
      pet:pet,
      owner:owner,
      date:date,
      hour:hour,
      type:type,
      additionalMsg:additionalMsg
    });
  }catch(error){
    console.error(error);
  }
}

export const signOut = () => auth.signOut();
