import React from 'react';

const ProfileFormUser = ({ formData, handleChange }) => {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Profile Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="block mb-2">First Name:</label>
          <input
            required
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname" className="block mb-2">Last Name:</label>
          <input
            required
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleInitial" className="block mb-2">Middle Initial:</label>
          <input
            type="text"
            id="middleInitial"
            name="middleInitial"
            value={formData.middleInitial}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="block mb-2">Phone Number:</label>
          <input
            required
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="15"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="userImg" className="block mb-2">User Image URL:</label>
          <input
            required
            type="text"
            id="userImg"
            name="userImg"
            value={formData.userImg}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFormUser;
