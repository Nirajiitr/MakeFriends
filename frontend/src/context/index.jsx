import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const user = localStorage.getItem("user");

  const [User, setUser] = useState(user ? JSON.parse(user) : null);
   const token = sessionStorage.getItem("token")? JSON.parse(sessionStorage.getItem("token")) : null
  useEffect(() => {
    const verifyUser = async () => {
      if (User) {
        try {
          const res = await axios.get(
            "https://makefriends-pyom.onrender.com/auth/verify",
            {
             headers :{
              Authorization : `Bearer ${token}`
             }
            }
          );

          if (res.status !== 200) {
            setUser(null);
            localStorage.removeItem("user");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Error verifying user");
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    };

    verifyUser();
  }, [User]);
  
  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
