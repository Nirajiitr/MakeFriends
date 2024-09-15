import React, {  useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import brandLogo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";


import Spinner from "./Spinner";

const AuthPage = ({ showSignupModel, showLoginModel, login }) => {
  const [userData, setUserData] = useState({
  
    fullname : "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
  });
 
  const [Loading, setLoading ] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endPoint = login ? "login" : "register";
    try {
      setLoading(true)
      const res = await axios.post(
        `http://localhost:8888/auth/${endPoint}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      setLoading(false)
      toast.success(res.data.message);
      navigate("/home"); 
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message);
      navigate("/");
    }

    setUserData({
      fullname: "",
      email: "",
      password: "",
      confirmPass: "",
      phone: "",
    });
  };

  if (Loading) {
    return <Spinner />;
  }
  return (
    <div className="fixed inset-0 bg-slate-200 bg-opacity-90 flex justify-center items-center">
      <div className="bg-white text-black w-[600px] h-[600px] rounded-xl">
        <div className="flex justify-between p-3 ">
          <img className="size-10" src={brandLogo} alt="brand logo" />
          {login ? (
            <>
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showLoginModel(false)}
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Sign Up to MakeFriends</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showSignupModel(false)}
              />
            </>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-2 grid-cols-2 gap-5 p-10">
            {!login && (
              <>
                <input
                  className="rounded-3xl inputBorder focus:outline-none p-3"
                  type="text"
                  placeholder="Enter your fullname "
                  name="fullname"
                  required
                  value={userData.firstname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                />
                
              </>
            )}

            <input
              className="rounded-3xl inputBorder focus:outline-none p-3"
              type="email"
              placeholder="Enter your email "
              name="email"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <input
              className="rounded-3xl inputBorder focus:outline-none p-3"
              type="password"
              placeholder="password [min. 6 digits] "
              name="password"
              minLength="6"
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {!login && (
              <>
                <input
                  className="rounded-3xl inputBorder focus:outline-none p-3"
                  type="password"
                  placeholder="confirm password [min. 6 digits] "
                  name="confirmPass"
                  required
                  value={userData.confirmPass}
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPass: e.target.value })
                  }
                />
                <input
                  className="rounded-3xl inputBorder focus:outline-none p-3"
                  type="text"
                  placeholder="your phone number[Indian]"
                  name="phone"
                  required
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />

                
              </>
            )}

            <button
              className=" justify-stretch  text-2xl py-3 rounded-3xl btn hover:text-white col-span-2"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AuthPage;
