import { createContext, useState, useEffect, useContext } from "react";
import { auth, createUserProfileDocument, login } from './Firebase';
import { NavigationContext } from "@react-navigation/native";
export const UserContext = createContext({ email: '', auth: false });

export const UserProvider = ({ children }) => {
  // global navigation context this coming from react-navigation library 
  const navigation = useContext(NavigationContext);
  // current user global state that we provide data to app 
  const [user, setUser] = useState(undefined);
  // user register state this is global state 
  const [userDataState, setUserDataState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    veterinary: ""
  })
  // global data changed function for PetScreen if we update pets list 
  // this will set data changed true and list updated 
  const [isDataChanged, setIsDataChanged] = useState(false);
  // login coming from firebase.js this context login provides login function all around
  // project
  const contextLogin = async (email, password) => {
    login(email, password);
  };
  // this takes userdataState that we provide project this fields will update
  // from register component and posting to firestore db for keep user information
  const createUserProfile = () => {
    createUserProfileDocument(userDataState);
  }
  // if user logged in successfully auth will changing
  // so we track onAuthStateChanged for logging in logging out 
  // if user auth state changes this will track user info and sets userState
  // userState is assigned in code line : 10 
  // and we provide userState to app
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        if(navigation){
          // if user logged in successfully we navigate to home screen
          navigation.navigate("Home");
        }
      } else {
        setUser(undefined);
      }
    });
    return () =>{
      return unsubscribeFromAuthStatuChanged();
    }
  }, []);
  // below value presents which function and states above will providing to app 
  // ex. contextLogin we provide it and using on Register.JSX component
  return (
    <UserContext.Provider value={{ 
      user
      ,contextLogin
      ,createUserProfile
      ,userDataState 
      ,setUserDataState
      ,isDataChanged
      ,setIsDataChanged }}>
      {children}
    </UserContext.Provider>
  );
}