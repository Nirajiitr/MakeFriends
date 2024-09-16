import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useRecommendedFriends from "../hooks/useRecommendedFriends";
import Spinner from "./Spinner";
import UserList from "./UserList";

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [OtherUser, setOtherUser] = useState([]);
  const { recommendedFriends, fetchRecommendedFriends, loading } = useRecommendedFriends();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://makefriends-za9e.onrender.com/user/", { withCredentials: true });
        if (res.status === 200) {
          setOtherUser(res.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    };
    fetchUser();
  }, []);

  const handleAddFriend = async (id) => {
    try {
      const res = await axios.post(
        `https://makefriends-za9e.onrender.com/user/${id}/add-friend`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data);
      fetchRecommendedFriends();
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  const handleSearch = () => {
    const results = OtherUser.filter((friend) =>
      friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(results);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="vsm:w-1/2 vsm:p-1 border-gray-600 rounded">
      <h2 className="text-lg font-bold mb-4">Search Users</h2>
      <div className="flex vsm:flex-col vsm:items-center gap-2 md:flex-row mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users"
          className="inputBorder p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="btn bg-blue-500 hover:bg-blue-600 text-white ml-2"
        >
          Search
        </button>
      </div>

      <h3 className="text-md font-semibold mb-4">Recommended Friends</h3>
      {loading ? (
        <Spinner />
      ) : (
        <UserList users={recommendedFriends} handleAction={handleAddFriend} actionLabel="Add Friend" />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Search Results</h2>
            <UserList users={filteredFriends} handleAction={handleAddFriend} actionLabel="Add Friend" />
            <button
              onClick={handleCloseModal}
              className="btn bg-red-500 hover:bg-red-600 text-white mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
