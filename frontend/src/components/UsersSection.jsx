import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";


const recommendedFriends = [
  { id: 1, name: 'Alice Williams' },
  { id: 2, name: 'Bob Brown' },
  { id: 3, name: 'Charlie Davis' },
  { id: 4, name: 'David Johnson' },
  { id: 5, name: 'Eve Thompson' },
];

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [OtherUser, setOtherUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8888/user/", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setOtherUser(res.data);
        
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser(); 
  }, []); 


 
  const handleSearch = () => {
    const results = OtherUser.filter(friend =>
     
      friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    
    );
    setFilteredFriends(results);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/2 p-4  border-gray-600 rounded">
      <h2 className="text-lg font-bold mb-4">Search Users</h2>
      
      <div className="flex mb-6">
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
      <ul className="space-y-4">
        {recommendedFriends.map(friend => (
          <li key={friend.id} className="flex items-center justify-between liBorder px-2">
            <div className="flex items-center space-x-4">
              <CgProfile size="64px" />
              <span>{friend.name}</span>
            </div>
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
              Add Friend
            </button>
          </li>
        ))}
      </ul>

  
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Search Results</h2>
            <ul className="space-y-4">
              {filteredFriends.length > 0 ? (
                filteredFriends.map(friend => (
                  <li key={friend._id} className="flex items-center justify-between liBorder px-2">
                    <div className="flex items-center space-x-4">
                      <CgProfile size="64px" />
                      <span>{friend.fullname}</span>
                    </div>
                    <button className="btn bg-green-500 hover:bg-green-600 text-white">
                      Add Friend
                    </button>
                  </li>
                ))
              ) : (
                <p>No users found</p>
              )}
            </ul>
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
