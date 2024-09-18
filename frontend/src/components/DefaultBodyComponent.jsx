import React, { useState } from "react";

const DefaultBodyComponent = () => {
 

  return (
    <div className="h-full ">
    <header className="flex flex-col items-center text-center mt-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect and Make Friends</h1>
      <p className="text-gray-500 max-w-2xl">
        makesFriends helps you connect with people all around the world! Add friends, explore recommendations, and grow your network effortlessly.
      </p>
    </header>

    <section className="mt-12">
      <div className="flex justify-center space-x-6 items-center">
        <div className="flex flex-col items-center">
          <div className="bg-purple-300 rounded-full h-24 w-24 flex items-center justify-center">
            <span className="text-white text-3xl">🔍</span>
          </div>
          <p className="mt-4 text-gray-600">Search Users</p>
        </div>  
        <div className="flex flex-col items-center">
          <div className="bg-purple-300 rounded-full h-24 w-24 flex items-center justify-center">
            <span className="text-white text-3xl">📱</span>
          </div>
          <p className="mt-4 text-gray-600">Mobile Experience</p>
        </div>
      </div>
    </section>
  </div>
  );
};

export default DefaultBodyComponent;
