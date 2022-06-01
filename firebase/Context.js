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
  const [vetValue, setVetValue] = useState("");
  const contextLogin = async (email, password) => {
    login(auth, email, password);
    console.log(user);
  };
  const createUserProfile = () => {
    setUserDataState({...userDataState,veterinary:vetValue});
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
    <UserContext.Provider value={{ user,contextLogin,vetValue, setVetValue, createUserProfile,userDataState ,setUserDataState }}>
      {children}
    </UserContext.Provider>
  );
}