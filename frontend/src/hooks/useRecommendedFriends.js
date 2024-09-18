import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context";


const useRecommendedFriends = () => {
  const [recommendedFriends, setRecommendedFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useUser()
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
