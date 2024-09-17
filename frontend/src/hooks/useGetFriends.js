import axios from "axios";
import { useEffect, useState } from "react";


const useGetFriends = () => {
    const [Friends, setFriends] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
    const fetchFriendsData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/friends`, {
            headers :{
                  Authorization : `Bearer ${token}`
                 },
          });
        if (res.status === 200) {
         setFriends(res.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFriendsData();
    }, []);
   
    return { Friends, fetchFriendsData, setFriends, loading };
}

export default useGetFriends