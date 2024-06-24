import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { updateUserProfile } from './path/to/profileActions'; // Define your async action for updating profile
//import { setProfileData } from './path/to/profileSlice'; // Adjust path as needed

import ProfileFormProfile from './ProfileFormUsers';
import ProfileFormAddress from './ProfileFormAddress';

const ProfileForm2 = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Assuming you have auth slice

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    phoneNo: '',
    userImg: '',
  });

  const [addressData, setAddressData] = useState({
    street: '',
    bgry: '',
    city: '',
    country: '',
    postal: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        middleInitial: user.middleInitial,
        phoneNo: user.phoneNo,
        userImg: user.userImg,
      });
      setAddressData({
        street: user.address.street,
        bgry: user.address.bgry,
        city: user.address.city,
        country: user.address.country,
        postal: user.address.postal,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setAddressData(prev => ({ ...prev, [addressField]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile({
        ...formData,
        address: { ...addressData }
      }));
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex flex-col w-full">
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>UserID: {user.userID}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl bg-slate-300 p-6 rounded-3xl shadow-lg shadow-slate-600">
        <ProfileFormProfile formData={formData} handleChange={handleChange} />
        <ProfileFormAddress addressData={addressData} handleChange={handleChange} />
        <button type="submit" className="p-2 bg-blue-500 text-white my-3 rounded-sm"
          disabled={!formData.firstname || !formData.lastname || !formData.phoneNo || !addressData.street || !addressData.bgry || !addressData.city || !addressData.country || !addressData.postal}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm2;
