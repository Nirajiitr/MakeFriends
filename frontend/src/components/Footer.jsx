import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="w-full max-h-80 bg-[#F0F0FF]  py-2 ">
      <div className="flex items-start justify-around gap-5">
        <div className=" flex flex-col gap-2">
          <h1>CopyRight &copy; {new Date().getFullYear()}</h1>
          <img className="size-20" src={logo} alt="brand logo" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="">Contact Us :</h1>
          <a
            href="https://www.linkedin.com/in/nirajkriitr"
            target="_blank"
            rel="Linkdin Profile"
            className="flex focus:outline-none items-center ml-20 gap-2 "
          >
            <FaLinkedin className="size-10" /> Linkdin
          </a>
          <a
            href="https://github.com/Nirajiitr"
            target="_blank"
            rel="GitHub Profile"
            className="flex focus:outline-none items-center ml-20 gap-2 "
          >
            <FaGithub className="size-10" /> GitHub
          </a>
          <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
