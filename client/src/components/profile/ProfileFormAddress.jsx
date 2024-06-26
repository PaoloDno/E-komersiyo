import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { updateUserAddress } from '../../Redux/actions/addressActions'; // Adjust path as needed

const ProfileFormAddress = () => {
  const dispatch = useDispatch();
  const {profile, address } = useSelector(state => state.auth.profile);
  const { street, brgy, city, country, postal } = address;
  const [addressData, setAddressData] = useState({
    street: '',
    bgry: '',
    city: '',
    country: '',
    postal: '',
  });

  useEffect(() => {
    if (profile) {
      setAddressData({
        street: street,
        bgry: brgy,
        city: city,
        country: country,
        postal: postal,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col'>
      <h1 className="mb-4 text-xl font-bold">Address Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="street" className="block mb-2">Street:</label>
            <input
              required
              type="text"
              id="street"
              name="street"
              value={addressData.street}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bgry" className="block mb-2">Barangay:</label>
            <input
              required
              type="text"
              id="bgry"
              name="bgry"
              value={addressData.bgry}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="block mb-2">City:</label>
            <input
              required
              type="text"
              id="city"
              name="city"
              value={addressData.city}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="block mb-2">Country:</label>
            <input
              required
              type="text"
              id="country"
              name="country"
              value={addressData.country}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postal" className="block mb-2">Postal Code:</label>
            <input
              required
              type="text"
              id="postal"
              name="postal"
              value={addressData.postal}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="10"
            />
          </div>
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white my-3 rounded-sm">Update Address</button>
      </form>
    </div>
  );
};

export default ProfileFormAddress;
