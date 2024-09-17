import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import UserList from "./UserList";
import useGetFriends from "../hooks/useGetFriends";
import { useState } from "react";


const FriendsSection = () => {
  const [loading, setLoading]= useState(false)
  
   const {Friends, setFriends} = useGetFriends()
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null

  const handleUnfriend = async (id) => {
    setLoading(true)
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/${id}/unfriend`,{},
        { headers :{
              Authorization : `Bearer ${token}`
            }
            
        }
      );
      toast.success(res.data);
      setFriends((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );
      setLoading(false)
    } catch (error) {
      toast.error("An error occurred while unfriending");
      setLoading(false)
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="vsm:w-1/2 p-4 border-gray-600 rounded mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Friends List</h2>
      {
       Friends && Friends.length!==0 ? <UserList users={Friends} handleAction={handleUnfriend} actionLabel="Unfriend" /> : 
        <p className="text-lg font-semibold mb-4 text-center">You not made friends yet</p>
      }
      
    </div>
  );
};

export default FriendsSection;
