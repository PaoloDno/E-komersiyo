import React from "react";
import Carousel from "../components/hero/Carousel";
import SideCategory from "../components/hero/SideCategory";
const Homepage = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col m-4 w-full lg:w-1/6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">Flash Sale</li>
          <li className="hover:text-blue-600 cursor-pointer">Popular Items</li>
          <li>
            <SideCategory />
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-4">Settings</h2>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">Profile</li>
          <li className="hover:text-blue-600 cursor-pointer">Store</li>
          <li className="hover:text-blue-600 cursor-pointer">Carts</li>
        </ul>
      </div>
      <div className="flex flex-col w-full lg:w-5/6 p-6 mx-2 my-3 bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Carousel</h2>
          <div className="bg-gray-300 rounded-lg flex items-center w-full lg:w-full justify-center relative h-64">
              <Carousel autoSlide={true} autoSlideInterval={4500} />
            
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Category 1</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Category 2</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Category 3</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Category 4</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Product 1</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Product 2</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Product 3</span>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center">
              <span className="text-gray-700">Product 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
