import React from 'react';
import { useSelector } from 'react-redux';
import ProfileFormPicture from '../utils/ProfileComponent'
const DisplayProfileState = () => {
  const profileState = useSelector(state => state.profile);

  const address = profileState.profile.address;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-5 md:p-10 rounded-lg shadow-md w-full">
      <div className="flex flex-col w-full h-fit p-5 text-white">
        <h1 className="text-xl lg:text-2xl font-medium mb-4">Profile State</h1>
        <ProfileFormPicture />

        <div className="mb-4">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <p>First Name: {profileState.profile.userProfile.firstname}</p>
          <p>Last Name: {profileState.profile.userProfile.lastname}</p>
          <p>Middle Initial: {profileState.profile.userProfile.middleInitial}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Phone Number</h2>
          <p>{profileState.profile.userProfile.phoneNumber}</p>
        </div>

        {address && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Address</h2>
            <p>Street: {address.street || ''}</p>
            <p>Barangay: {address.brgy || ''}</p>
            <p>City: {address.city || ''}</p>
            <p>Country: {address.country || ''}</p>
            <p>Postal Code: {address.postal || ''}</p>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-lg font-semibold">User Stores</h2>
          <ul>
            {profileState.profile.userStores.map((store, index) => (
              <li key={index}>{store.storeName}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Identifiers</h2>
          <p>Address ID: {profileState.profile.addressID}</p>
          <p>Cart ID: {profileState.profile.cartID}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">User History</h2>
          <p>{profileState.profile.userHistory}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Loading Status</h2>
          <p>{profileState.isLoading ? 'Loading...' : 'Not Loading'}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>{profileState.error ? profileState.error : 'No Error'}</p>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Profile State</h2>
        <pre className="bg-gray-700 p-4 rounded">
          {JSON.stringify(profileState, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DisplayProfileState;
