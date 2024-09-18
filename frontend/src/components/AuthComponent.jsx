import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import brandLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "./Spinner";
import { useUser } from "../context";

const AuthPage = ({ showSignupModel, showLoginModel, login }) => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const endPoint = login ? "login" : "register";
  const { setUser, setToken, token } = useUser();

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/${endPoint}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      setToken(res.data.Token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("Token", JSON.stringify(res.data.Token));
      navigate("/home");
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      setLoading(false);
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
    <div className="fixed inset-0 bg-slate-200 bg-opacity-90 flex justify-center items-center p-4">
      <div className="bg-white text-black w-full max-w-[600px] h-auto  rounded-xl pb-5 shadow-lg">
        <div className="flex justify-between p-3 items-center">
          <img className="h-10 w-10" src={brandLogo} alt="brand logo" />
          {login ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome back</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showLoginModel(false)}
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold">Sign Up to MakeFriends</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showSignupModel(false)}
              />
            </>
          )}
        </div>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className=" flex flex-wrap gap-5 p-5 flex-grow">
            {!login && (
              <>
                <input
                  className="rounded-3xl w-full inputBorder focus:outline-none p-3"
                  type="text"
                  placeholder="Enter your fullname"
                  name="fullname"
                  required
                  value={userData.fullname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                />
              </>
            )}

            <input
              className="rounded-3xl w-full inputBorder focus:outline-none p-3"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <input
              className="rounded-3xl w-full inputBorder focus:outline-none p-3"
              type="password"
              placeholder="Password (min. 6 digits)"
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
                  className="rounded-3xl w-full inputBorder focus:outline-none p-3"
                  type="password"
                  placeholder="Confirm password (min. 6 digits)"
                  name="confirmPass"
                  required
                  value={userData.confirmPass}
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPass: e.target.value })
                  }
                />

                <input
                  className="rounded-3xl w-full inputBorder focus:outline-none p-3"
                  type="text"
                  placeholder="Phone number [indian]"
                  name="phone"
                  required
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </>
            )}
            </div>
            <button
              className="btn "
              type="submit"
            >
              Submit
            </button>
          
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
