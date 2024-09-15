import React from 'react';
import { CgProfile } from "react-icons/cg";
import {useUser} from "../context/index.jsx"

const FriendsSection = () => {
  const handleUnfriend = (id) => {
   
    console.log(`Unfriended user with id: ${id}`);
  };
   const {User} =useUser()
  
  return (
    <div className='w-1/2 p-4  border-gray-600 rounded '>
      <h2 className="text-lg font-bold mb-4">Friends List</h2>
      <ul className="space-y-4">
        {User?.friends?.map(friend => (
          <li key={friend._id} className="flex items-center px-2 justify-between liBorder">
            <div className="flex items-center space-x-4">
             <CgProfile size="64px" />
              <span>{friend.fullname}</span>
            </div>
            <button
              onClick={() => handleUnfriend(friend.id)}
              className="btn bg-red-500 hover:bg-red-500 text-white"
            >
              Unfriend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsSection;
