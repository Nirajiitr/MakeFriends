import React, { useState } from "react";
import logo from "../assets/logo.png";
import { GrDocumentDownload } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";

import { AiOutlineLogout } from "react-icons/ai";
import Spinner from "./Spinner";

const Navbar = ({ location, signupModel, showLoginModel }) => {
  const navigate = useNavigate()
  const [Menu, setMenu] = useState(false)
 
  const data = true
  const handleLogout = async()=>{
    
    navigate("/")
   }
  return (
    <nav className=" fixed w-full bg-white ">
      <div className="flex justify-between items-center p-0">
        <img className="size-20 object-cover" src={logo} alt="brand logo" />
        <div className="flex items-center gap-7 relative ">
          {location === "AuthPage" ? (
            <>
              <button
                onClick={() => signupModel(true)}
                className="flex items-center px-5 py-2 rounded-xl btn  "
              >
                {" "}
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
              {data?.photoURL? (
                <img
                  src={data?.photoURL}
                  className="size-16 profile-style rounded-full"
                   onClick={()=>setMenu(!Menu)}
                />
              ) : (
                <CgProfile onClick={()=>setMenu(!Menu)} className="profile-style" size="64px" />
              )}
            </>
          )}
          {
            Menu &&  <div onMouseLeave={()=>setMenu(!Menu)} className=" overflow-x-hidden profile-animation absolute text-lg flex items-center flex-col gap-3 p-3 bg-blue-200 rounded-md text-black w-60 right-0 top-0 ">
            {
             data ? <CgProfile  size="80px" /> :
             <img
             src={data?.photoURL}
             className="size-20  rounded-full"
           />
            }
            <Link to="/profile" className=" hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">My account</Link>
            <Link to="/add/tamplete" className="hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">Add new tamplete </Link>
            <Link to="/new/resume" className="hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">create new </Link>
            <button onClick={handleLogout} className="flex gap-1 text-lg btn items-center rounded-lg btn px-2">Logout<AiOutlineLogout /></button>
         </div>
          }
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
