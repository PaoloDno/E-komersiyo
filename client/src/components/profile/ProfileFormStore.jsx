import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./profileHeader";

const ProfileFormStore = () => {
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.profile);
  const { userStores } = profile || {};

  const { user } = useSelector((state) => state.auth);
  const { username } = user || {};

  const handleCreateStore = () => {
    navigate(`/profile/create-store`);
  };

  const handleStoreClick = (storeID) => {
    console.log(storeID);
    navigate(`/profile/store/${storeID}`);
  };

  const StoreList = ({ userStores, handleStoreClick }) => {
    return (
      <ul className="list-disc list-inside">
        {userStores && userStores.length > 0 ? (
          userStores.map((store, index) => (
            <li
              key={index}
              className="mt-2 cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleStoreClick(store.storeID)}
            >
              {store.storeName}
            </li>
          ))
        ) : (
          <p>No stores available.</p>
        )}
      </ul>
    );
  };

  return (
    <div className="p-6">
      <div id="StoreHeader" className="mb-4">
        <ProfileHeader />
        <h1 className="text-2xl font-bold">{username}</h1>

        {userStores && userStores.length > 0 ? (
          <div>
            <h2 className="text-xl mt-4">List of User Stores</h2>
            <StoreList userStores={userStores} handleStoreClick={handleStoreClick} />
          </div>
        ) : (
          <div>
            <h2 className="text-xl mt-4">No Stores Available</h2>
          </div>
        )}

        <div id="CreateStoreCard" className="mt-4">
          <button
            id="createStorePlusIcon"
            onClick={handleCreateStore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormStore;
