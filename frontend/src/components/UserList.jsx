import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

const UserList = ({ users, handleAction }) => {
  const [requestStatus, setRequestStatus] = useState({});

  const handleButtonClick = (userId) => {
    handleAction(userId);
    setRequestStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: "Request Sent",
    }));
  };

  return (
    <ul className="space-y-4">
      {users?.map((user) => (
        <li
          key={user._id}
          className="flex items-center justify-between liBorder px-2"
        >
          <div className="flex items-center space-x-4">
            <CgProfile className="vsm:size-4 sm:size-8 md:size-10 lg:size-16 xl:size-20" />
            <span className="vsm:text-sm md:text-md lg:text-lg xl:text-xl">
              {user.fullname}
            </span>
          </div>
          <button
            onClick={() => handleButtonClick(user._id)}
            className={`btn ${
              requestStatus[user._id] === "Request Sent"
                ? "bg-slate-500"
                : "bg-blue-500 hover:bg-blue-600"
            } vsm:text-[10px] vsm:p-2 text-white`}
            disabled={requestStatus[user._id] === "Request Sent"}
          >
            {requestStatus[user._id] || "Add Friend"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
