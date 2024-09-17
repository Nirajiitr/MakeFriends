import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useRecommendedFriends from "../hooks/useRecommendedFriends";
import Spinner from "./Spinner";
import UserList from "./UserList";

const FriendsSection = () => {
  const { fetchRecommendedFriends, loading } = useRecommendedFriends();
  const [Friends, setFriends] = useState(null);
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
  const fetchUser = async () => {
    try {
      const friendsRes = await axios.get("https://makefriends-za9e.onrender.com/user/friends", {
        headers :{
              Authorization : `Bearer ${token}`
             },
      });
      if (friendsRes.status === 200) {
        setFriends(friendsRes.data);
      }
    } catch (error) {
      toast.error("Failed to load friends");
    }
  };

  const handleUnfriend = async (id) => {
    try {
      const res = await axios.put(
        `https://makefriends-za9e.onrender.com/user/${id}/unfriend`,
        {},
        { headers :{
              Authorization : `Bearer ${token}`
             } }
      );
      toast.success(res.data);
      fetchUser();
      fetchRecommendedFriends();
    } catch (error) {
      toast.error("An error occurred while unfriending");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="vsm:w-1/2 p-4 border-gray-600 rounded mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Friends List</h2>
      <UserList users={Friends} handleAction={handleUnfriend} actionLabel="Unfriend" />
    </div>
  );
};

export default FriendsSection;
