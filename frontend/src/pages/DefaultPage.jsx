import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useState } from "react";
import AuthComponent from "../components/AuthComponent";
import DefaultBodyComponent from "../components/DefaultBodyComponent";


const DefaultPage = () => {

  const [signupModel, setSignupModel] = useState(false);
  const [loginModel, setLoginModel] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white relative overflow-y-auto no-scrollbar">
      <Navbar
        location="AuthPage"
        signupModel={setSignupModel}
        showLoginModel={setLoginModel}
      />
      <div className=" flex flex-grow ">
      
        {signupModel && <AuthComponent showSignupModel={setSignupModel} />}
        {loginModel && <AuthComponent showLoginModel={setLoginModel} login="true" />}
      </div>
       <DefaultBodyComponent />
      <Footer />
    </div>
  );
};

export default DefaultPage;
