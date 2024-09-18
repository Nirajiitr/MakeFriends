import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useRecommendedFriends from "../hooks/useRecommendedFriends";
import Spinner from "./Spinner";
import UserList from "./UserList";
import useOtherUsersData from "../hooks/useOtherUsersData";
import { useUser } from "../context";

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { recommendedFriends, setRecommendedFriends, loading } =
    useRecommendedFriends();
  const { OtherUser, setOtherUser } = useOtherUsersData();

  const {token} = useUser()
  const handleAddFriend = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/${id}/add-friend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data);
      setRecommendedFriends((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );
      setOtherUser((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = OtherUser.filter((friend) =>
      friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(results);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if(loading){
    return <Spinner />
  }
  return (
    <div className="vsm:w-1/2 vsm:p-1 border-gray-600 rounded h-full overflow-hidden flex flex-col">
       <h2 className="text-lg font-bold mb-4">Search Users</h2>
    
      <form onSubmit={handleSearch} >
      <div className="flex vsm:flex-col vsm:items-center gap-2 md:flex-row mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for users"
        className="inputBorder p-2 w-full"
        required
      />
      <button
       
        className="btn bg-blue-500 hover:bg-blue-600 text-white ml-2"
      >
        Search
      </button>
      </div>
      </form>
    
    <h3 className="text-md font-semibold mb-4">Recommended Friends</h3>
    <div className="w-full flex-grow overflow-y-auto border-2 no-scrollbar rounded">
     
      {recommendedFriends?.length!==0 ? (
        <UserList
          users={recommendedFriends}
          handleAction={handleAddFriend}
         
        />
      ) : (
        <p className="text-center">no recommendation at this moment</p>
      )}
    </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 h-screen overflow-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold mb-4">Search Results</h2>
              <button
                onClick={handleCloseModal}
                className="btn bg-red-500 hover:bg-red-600 mb-4 text-white "
              >
                Close
              </button>
            </div>
            <div className=" w-full h-[90%] overflow-y-scroll border-2 rounded no-scrollbar ">
             {filteredFriends? <UserList
                users={filteredFriends}
                handleAction={handleAddFriend}
                
              /> : 
              <p>User not found</p>
             }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
