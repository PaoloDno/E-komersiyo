import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../Redux/actions/profileThunk';

import ProfileFormUser from './ProfileFormUsers';
import ProfileFormAddress from './ProfileFormAddress';


const ProfileForm2 = () => {

  const user = useSelector(state => state.auth.user);
  
  const userID = user ? user.userID : null;

  const dispatch = useDispatch();

  useEffect(() => {
    if(userID){
    dispatch(fetchUserProfile(userID));
    }
  }, [dispatch, userID]);

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
          <Route path="/" element={<Navigate to="profile" />} />
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
