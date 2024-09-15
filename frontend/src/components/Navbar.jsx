import React, { useState } from "react";
import logo from "../assets/logo.png";

import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import { useUser } from "../context";
import { IoMdNotificationsOutline } from "react-icons/io";
const Navbar = ({ location, signupModel, showLoginModel }) => {
  const navigate = useNavigate();
  const [Menu, setMenu] = useState(false);
  const { User, setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    navigate("/");
  };
  return (
    <nav className=" w-full bg-white px-3 ">
      <div className="flex justify-between items-center p-0">
        <img className="size-20 object-cover" src={logo} alt="brand logo" />
        <div className="flex items-center gap-7 relative ">
          {location === "AuthPage" ? (
            <>
              <button
                onClick={() => signupModel(true)}
                className="flex items-center px-5 py-2 rounded-xl btn  "
              >
                <GoSignIn size="20px" />
                signup
              </button>
              <button
                onClick={() => showLoginModel(true)}
                className="flex items-center  px-5 py-2 rounded-xl btn "
              >
                login <CiLogin size="20px" />
              </button>
            </>
          ) : (
            <> 
             <IoMdNotificationsOutline  className="cursor-pointer size-12"
                />
              <CgProfile
                onClick={() => setMenu(!Menu)}
                className="profile-style cursor-pointer"
                size="64px"
              />
            </>
          )}
          {Menu && (
            <div
              onMouseLeave={() => setMenu(!Menu)}
              className=" overflow-x-hidden profile-animation absolute text-lg flex items-center flex-col gap-3 p-3 bg-blue-200 rounded-md text-black w-80 right-0 top-0 "
            >
              <CgProfile size="120px" />

              <Link to="/profile" className=" textStyle ">
                My account
              </Link>

              <button
                onClick={handleLogout}
                className="flex gap-1 text-lg btn items-center rounded-lg btn px-2"
              >
                Logout
                <AiOutlineLogout />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
