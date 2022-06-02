import { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument, login } from './Firebase';

export const UserContext = createContext({ email: '', auth: false });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [userDataState, setUserDataState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    veterinary: ""
  })
  const [isDataChanged, setIsDataChanged] = useState(false);
  const contextLogin = async (email, password) => {
    login(auth, email, password);
  };
  const createUserProfile = () => {
    createUserProfileDocument(userDataState);
  }
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(undefined);
      }
    });
    return () =>{
      return unsubscribeFromAuthStatuChanged();
    }
  }, []);
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