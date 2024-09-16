import React from "react";
import { CgProfile } from "react-icons/cg";

const UserList = ({ users, handleAction, actionLabel }) => {
  return (
    <ul className="space-y-4">
      {users?.length > 0 ? (
        users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between liBorder px-2"
          >
            <div className="flex items-center space-x-4">
              <CgProfile className="vsm:size-4 sm:size-8 md:size-10 lg:size-16 xl:size-20" />
              <span className="vsm:text-sm  md:text-md lg:text-lg xl:text-xl" >{user.fullname}</span>
            </div>
            <button
              onClick={() => handleAction(user._id)}
              className=" btn bg-blue-500 hover:bg-blue-600 vsm:text-[10px] vsm:p-2  text-white  "
            >
              {actionLabel}
            </button>
          </li>
        ))
      ) : (
        <p>No users found</p>
      )}
    </ul>
  );
};

export default UserList;
