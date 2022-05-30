import { createContext , useState  ,useEffect} from "react";
import {auth,createUserProfileDocument,login} from './Firebase';

export const UserContext = createContext({ email: '', auth: false });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const contextLogin = async (email,password) => {
      login(auth,email,password);
  };
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);
    return (
      <UserContext.Provider value={{ user, contextLogin  }}>
        {children}
      </UserContext.Provider>
    );
  }