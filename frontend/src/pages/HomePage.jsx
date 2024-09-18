import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UsersSection from "../components/UsersSection";
import FriendsSection from "../components/FriendsSection";

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen text-black overflow-hidden no-scrollbar">
      <Navbar />
      <div className="flex flex-grow w-full overflow-hidden">
        <UsersSection />
        <FriendsSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
