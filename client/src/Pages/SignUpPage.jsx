import React from "react"
import SignupForm from "../components/users/SignupForm";
import { FaCircleArrowRight } from "react-icons/fa6";
import video from '../assets/videos/video1.mp4'


const SignupPage = () => {
  return (
    <div className="flex w-screen p-0 m-0 flex-col md:flex-row overflow-hidden rounded-md">
      <div className="relative w-full h-[200px] md:h-screen overflow-hidden rounded-t-3xl md:rounded-l-3xl">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-2xl lg:text-4xl my-3 mx-12 lg:mx-20 md:text-6xl font-bold animate-colorChange">
            Sign-up! and get the best deals 
            <FaCircleArrowRight className="hidden md:inline-block m-4"/>
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="flex w-full md:w-fit mt-[-10px] md:mt-0 lg:-ml-5 z-10 rounder-t-4xl md:rounded-r-4xl overflow-hidden">
      <SignupForm />
      </div>
    </div>
  )
};

export default SignupPage;
