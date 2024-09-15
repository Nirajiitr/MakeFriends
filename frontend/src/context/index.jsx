import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
 
  const getUser = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      toast.error("invalid data")
      return null;
    }
  };

  const [User, setUser] = useState(getUser);

  useEffect(() => {
    const verifyUser = async () => {
      if (User) {
        try {
          const res = await axios.get("http://localhost:8888/auth/verify", {
            withCredentials: true,
          });

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
