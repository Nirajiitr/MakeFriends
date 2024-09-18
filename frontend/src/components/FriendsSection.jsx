import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import useGetFriends from "../hooks/useGetFriends";
import { useState } from "react";
import { useUser } from "../context";
import { CgProfile } from "react-icons/cg";


const FriendsSection = () => {
  const [loading, setLoading]= useState(false)
  
   const {Friends, setFriends} = useGetFriends()
   const {token} = useUser()

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
    <div className="vsm:w-1/2 p-4 pb-0 border-gray-600 rounded h-full overflow-hidden flex flex-col mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Friends List</h2>
      <div className="w-full flex-grow overflow-y-auto border-2  no-scrollbar rounded">
      <ul className="space-y-4">
      {
        Friends&& Friends.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between liBorder px-2"
          >
            <div className="flex items-center space-x-4">
              <CgProfile className="vsm:size-4 sm:size-8 md:size-10 lg:size-16 xl:size-20" />
              <span className="vsm:text-sm  md:text-md lg:text-lg xl:text-xl" >{user.fullname}</span>
            </div>
            <button 
              onClick={() => handleUnfriend(user._id)}
              className=" btn bg-blue-500 hover:bg-blue-600 vsm:text-[10px] vsm:p-2  text-white  "
            >
             unFriend
            </button>
          </li>
        ))
      
      }
    </ul>
      {Friends?.length ===0 && <p className="text-center">you not made friends yet</p>}
      </div>
    </div>
  );
};

export default FriendsSection;
