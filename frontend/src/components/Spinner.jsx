import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
const Spinner = () => {
  return (
    <div className=" scale-110 fixed w-screen h-screen flex items-center justify-center bg-white">
      <MoonLoader color="#000" />
    </div>
  );
};

export default Spinner;
