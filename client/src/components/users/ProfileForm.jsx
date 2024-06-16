import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../Redux/reducers/profileSlice';
import { useParams } from 'react-router-dom';

const ProfileForm = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  const [formData, setFormData] = useState({
    userProfile: {
      firstname: '',
      lastname: '',
      middleInitial: ''
    },
    phoneNumber: '',
    userImage: '',
    address: '',
    cartNumber: ''
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProfile(userId));
    }
  }, [status, dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        userProfile: profile.userProfile || { firstname: '', lastname: '', middleInitial: '' },
        phoneNumber: profile.phoneNumber || '',
        userImage: profile.userImage || '',
        address: profile.address || '',
        cartNumber: profile.cartNumber || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.userProfile) {
      setFormData({
        ...formData,
        userProfile: { ...formData.userProfile, [name]: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ userId, ...formData }));
  };

  return (
    <div>
      <h2>Fill Up Profile</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" name="firstname" value={formData.userProfile.firstname} onChange={handleChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastname" value={formData.userProfile.lastname} onChange={handleChange} />
          </div>
          <div>
            <label>Middle Initial</label>
            <input type="text" name="middleInitial" value={formData.userProfile.middleInitial} onChange={handleChange} />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <label>User Image</label>
            <input type="text" name="userImage" value={formData.userImage} onChange={handleChange} />
          </div>
          <div>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <label>Cart Number</label>
            <input type="text" name="cartNumber" value={formData.cartNumber} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
