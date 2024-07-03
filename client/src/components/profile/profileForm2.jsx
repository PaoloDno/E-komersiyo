import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, fetchAddressProfile } from '../../Redux/actions/profileThunk';
import ProfileFormUser from './ProfileFormUsers';
import ProfileFormAddress from './ProfileFormAddress';
import ProfileFormDisplay from './profileFormDisplay';
import { useNavigate } from 'react-router-dom';

const ProfileForm2 = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const error = useSelector((state) => state.profile.error);
  const isLoading = useSelector((state) => state.profile.isLoading);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!isFetched && userID) {
          await dispatch(fetchUserProfile(userID)).unwrap();
          await dispatch(fetchAddressProfile(userID)).unwrap();
          setIsFetched(true);
          console.log(profile);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfileData();
  }, [dispatch, userID, isFetched]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-row">
      <div className="bg-gray-800 text-white p-4 w-1/4">
        <h2 className="text-xl mb-4">Sidebar Navigation</h2>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="address">Address</Link></li>
          {/*
          <li><Link to="history">History</Link></li>
          <li><Link to="shop">Shop</Link></li>
          <li><Link to="cart">Cart</Link></li>
          */}
        </ul>
      </div>
      <div className="flex flex-col w-3/4 max-w-2xl bg-slate-300 p-6 rounded-3xl shadow-lg shadow-slate-600 mt-4">
        <Routes>
          <Route path="*" element={<ProfileFormDisplay />} />
          <Route path="profile" element={<ProfileFormUser />} />
          <Route path="address" element={<ProfileFormAddress />} />
          {/*
          <Route path="history" element={<div>History</div>} />
          <Route path="shop" element={<div>Shop</div>} />
          <Route path="cart" element={<div>Cart</div>} />
          */}
        </Routes>
      </div>
    </div>
  );
};

export default ProfileForm2;
