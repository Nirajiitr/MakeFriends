import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context";



const useOtherUsersData = () => {
    const [OtherUser, setOtherUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token } = useUser()
    const fetchOtherUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (res.status === 200) {
         setOtherUser(res.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOtherUser();
    }, []);
   
    return { OtherUser, setOtherUser, fetchOtherUser, loading };
}

export default useOtherUsersData