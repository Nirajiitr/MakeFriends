import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useRecommendedFriends = () => {
  const [recommendedFriends, setRecommendedFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
  const fetchRecommendedFriends = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://makefriends-za9e.onrender.com/user/recommended/friends",
        {
          headers :{
              Authorization : `Bearer ${token}`
             },
        }
      );
      if (res.status === 200) {
        setRecommendedFriends(res.data);
      } else {
        setRecommendedFriends(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch recommended friends"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedFriends();
  }, []);
 
  return { recommendedFriends, fetchRecommendedFriends, loading };
};

export default useRecommendedFriends;
