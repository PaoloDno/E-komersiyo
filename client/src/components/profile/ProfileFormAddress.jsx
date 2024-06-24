import React from 'react';

const ProfileFormAddress = ({ addressData, handleChange }) => {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Address Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="address.street" className="block mb-2">House/Unit No. & Street:</label>
          <input
            required
            type="text"
            id="address.street"
            name="address.street"
            value={addressData.street}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address.bgry" className="block mb-2">Brgy/Town/Village:</label>
          <input
            required
            type="text"
            id="address.bgry"
            name="address.bgry"
            value={addressData.bgry}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address.city" className="block mb-2">City:</label>
          <input
            required
            type="text"
            id="address.city"
            name="address.city"
            value={addressData.city}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address.country" className="block mb-2">Country:</label>
          <input
            required
            type="text"
            id="address.country"
            name="address.country"
            value={addressData.country}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="20"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address.postal" className="block mb-2">Postal Code:</label>
          <input
            required
            type="text"
            id="address.postal"
            name="address.postal"
            value={addressData.postal}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            maxLength="10"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFormAddress;
