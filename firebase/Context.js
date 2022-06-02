import { createContext, useState, useEffect, useContext } from "react";
import { auth, createUserProfileDocument, login } from './Firebase';
import { NavigationContext } from "@react-navigation/native";
export const UserContext = createContext({ email: '', auth: false });

export const UserProvider = ({ children }) => {
  const navigation = useContext(NavigationContext);
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
    login(email, password);
  };
  const createUserProfile = () => {
    createUserProfileDocument(userDataState);
  }
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        if(navigation){
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