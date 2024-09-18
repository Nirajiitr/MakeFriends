import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const Token = localStorage.getItem("Token")? JSON.parse(localStorage.getItem("Token")) : null
  const user = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null
  const [User, setUser] = useState(user);
  const [token, setToken] = useState(Token);
   
  useEffect(() => {
    const verifyUser = async () => {
      if (Token) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/verify`,
            {
             headers :{
              Authorization : `Bearer ${token}`
             }
            }
          );

          if (res.status !== 200) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("Token");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Error verifying user");
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("Token");
        }
      }
    };

    verifyUser();
  }, [Token]);
  
  return (
    <UserContext.Provider value={{ User, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
