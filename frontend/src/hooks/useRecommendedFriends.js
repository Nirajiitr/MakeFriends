import { useState, useEffect } from "react";
import axios from "axios";


const useRecommendedFriends = () => {
  const [recommendedFriends, setRecommendedFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;
  const fetchRecommendedFriends = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/recommended/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRecommendedFriends(res.data);
      } else {
        setRecommendedFriends(null);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedFriends();
  }, []);

  return { recommendedFriends, fetchRecommendedFriends, setRecommendedFriends, loading };
};

export default useRecommendedFriends;
