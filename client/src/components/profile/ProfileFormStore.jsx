import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProfileFormStore = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID, username } = user || {};

  const storeID = '';

  const handleCreateStore = () => {
    navigate("/profile/create-store");
  };

  const handleStoreClick = (storeID) => {
    navigate(`/profile/store/${storeID}`);
  };

  return (
    <div className="p-6">
      <div id="StoreHeader" className="mb-4">
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
        </div>
        {/* true ? (
          <div>
            <h2 className="text-xl mt-4">List of User Stores</h2>
            <ul className="list-disc list-inside">
              {stores.map(() => (
                <li 
                  key={index} 
                  className="mt-2 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleStoreClick(storeID)}
                >
                  {}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mt-4">No Stores Available</h2>
          </div>
        )*/}
      </div>
      
      <div id="StoreBody" className="mt-6">
        {/* Additional store-related content goes here, like a store Card component */}
        <div id="CreateStoreCard" className="mt-4">
          <button
            id="createStorePlusIcon"
            onClick={handleCreateStore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Manage Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormStore;
