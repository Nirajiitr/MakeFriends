import axios from "axios";
import { useEffect, useState } from "react";



const useFriendRequestData = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
    const fetchFriendRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/user/friend-requests`,
            { headers :{
                Authorization : `Bearer ${token}`
               } }
          );
        if (res.status === 200) {
         setRequests(res.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFriendRequests();
    }, []);
   
    return { requests, fetchFriendRequests, loading, setRequests };
}

export default useFriendRequestData