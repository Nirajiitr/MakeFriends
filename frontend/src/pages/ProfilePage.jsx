import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner.jsx";
import { useUser } from "../context/index.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { setUser } = useUser();
  const [newData, setNewData] = useState({
    fullname: "",
    email: "",
    phone: "",
    hobbies: "", 
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("https://makefriends-pyom.onrender.com/user/profile", {
          headers :{
              Authorization : `Bearer ${token}`
             },
        });
        if (res.status === 200) {
       
          setNewData({
            ...res.data,
            hobbies: res.data.hobbies.join(", "), 
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleHobbiesChange = (e) => {
    setNewData((prevUser) => ({
      ...prevUser,
      hobbies: e.target.value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    
    const formattedHobbies = newData.hobbies.split(",").map(hobby => hobby.trim()).filter(hobby => hobby);

    try {
      const res = await axios.put(
        "https://makefriends-pyom.onrender.com/user/profile", 
        { ...newData, hobbies: formattedHobbies },
        { headers :{
              Authorization : `Bearer ${token}`
             } }
      );
      toast.success("Profile updated successfully");
      setUser(res.data);
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full max-w-lg p-4 border-gray-600 rounded mx-auto">
      <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={newData.fullname}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={newData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
            Hobbies (comma-separated)
          </label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            value={newData.hobbies} 
            onChange={handleHobbiesChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
