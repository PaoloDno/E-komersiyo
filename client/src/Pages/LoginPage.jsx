import React from "react";
import LoginForm from '../components/users/LoginForm';
import { FaCircleArrowLeft } from "react-icons/fa6";
import img from "../assets/images/img5.jpg";

const LoginPage = () => {
  return (
    <div className="flex w-screen h-screen p-0 m-0 flex-col-reverse justify-end md:flex-row overflow-hidden rounded-md">
      <div className="flex w-full md:w-fit -mt-10 md:mb-0 lg:-mr-5 z-10 rounded-md rounded-b-3xl md:rounded-l-3xl overflow-hidden">
        <LoginForm />
      </div>        
      <div className="relative w-full md:h-screen h-[200px] overflow-hidden -mb-15 md:-ml-5 rounded-t-3xl md:rounded-tr-3xl"
      style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      > 
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-10 md:mt-40">
          <h1 className="text-2xl my-2 mx-8 lg:mx-20 md:text-6xl font-bold animate-colorChange">
          Welcome to E-komersiyo
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-20 md:mb-30">
          <p className="text-sm lg:text-xl mx-12 lg:mx-20 md:text-2xl font-semibold text-white">
          <FaCircleArrowLeft className="hidden md:inline-block mx-2"/> Login and enjoy our App
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
