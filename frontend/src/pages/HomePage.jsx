import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UsersSection from "../components/UsersSection";
import FriendsSection from "../components/FriendsSection";

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen text-black overflow-y-scroll no-scrollbar ">
      <Navbar />
        <div className="flex flex-row w-screen flex-grow ">
          <UsersSection />
          <FriendsSection /> 
         </div> 
      <Footer />
    </div>
  );
};

export default HomePage;
