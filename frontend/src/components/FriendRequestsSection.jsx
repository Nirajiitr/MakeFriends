import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const FriendRequestsSection = ({ setModel }) => {
  const [requests, setRequests] = useState([]);
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const res = await axios.get(
          "https://makefriends-za9e.onrender.com/user/friend-requests",
          { headers :{
              Authorization : `Bearer ${token}`
             } }
        );
        setRequests(res.data);
      } catch (error) {
        toast.error("Failed to fetch friend requests");
      }
    };

    fetchFriendRequests();
  }, []);

  const handleRequest = async (requestId, action) => {
    try {
      const res = await axios.put(
        `https://makefriends-za9e.onrender.com/user/${requestId}/handle-request`,
        { status: action },
        { headers :{
              Authorization : `Bearer ${token}`
             } }
      );
      toast.success(res.data);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (error) {
      toast.error(error.response?.data || "Failed to handle friend request");
    }
  };

  return (
    <div
      onMouseLeave={() => setModel(false)}
      className="profile-animation w-full md:w-96 vsm:w-screen bg-blue-300 absolute vsm:right-0 lg:right-4 md:right-32 top-10 rounded-lg shadow-lg p-4"
    >
      <IoMdCloseCircle
                size="24px"
                className=" self-start hover:cursor-pointer hover:scale-105"
                onClick={() =>setModel(false)}
              />
      <h2 className="text-2xl font-bold text-center mb-4">Friend Requests</h2>
      {requests.length === 0 ? (
        <p className="text-lg font-bold text-center">No friend requests.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li
              key={request._id}
              className="flex flex-col md:flex-row justify-between items-center border-2 rounded-lg p-4 mb-2"
            >
              <p className="font-bold text-lg text-center md:text-left">
                {request.sender.fullname}
              </p>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleRequest(request._id, "accepted")}
                  className="btn bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(request._id, "rejected")}
                  className="btn bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequestsSection;
