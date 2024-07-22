import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, fetchAddressProfile } from '../../Redux/actions/profileThunk';
import ProfileFormUser from './ProfileFormUsers';
import ProfileFormAddress from './ProfileFormAddress';
import ProfileFormDisplay from './profileFormDisplay';
import ProfileFormStore from './ProfileFormStore';
import ProfileFormStoreCreate from './ProfileFormStoreCreate';
import ProfileFormProduct from './ProfileFormProduct';
import ProfileFormStoreDashboard from './ProfileFormStoreDashboard';
import { useNavigate } from 'react-router-dom';

import { FaUser } from 'react-icons/fa'; 


const ProfileForm2 = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID, username } = user || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.profile.error);
  const isLoading = useSelector((state) => state.profile.isLoading);
  const [isFetched, setIsFetched] = useState(false);

  const fetchProfileData = async () => {
    try {
      if (!isFetched && userID) {
        await dispatch(fetchUserProfile(userID)).unwrap();
        await dispatch(fetchAddressProfile(userID)).unwrap();
        
        setIsFetched(true);
      }
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
    
  };

  useEffect(() => {
    fetchProfileData();
  }, [dispatch]);

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
    <div className="flex flex-row w-screen min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 w-1/4 lg:w-1/5 shadow-lg z-20">
        <h2 className="text-xl mb-4">Sidebar Navigation</h2>
        <ul>
          <li className="mb-2"><Link to="*"><FaUser className="inline mr-2" />{username}</Link></li>
          <li className="mb-2"><Link to="profile"><FaUser className="inline mr-2" />Profile</Link></li>
          <li className="mb-2"><Link to="address"><FaUser className="inline mr-2" />Address</Link></li>
          <li className="mb-2"><Link to="store"><FaUser className="inline mr-2" />Store</Link></li>
          <li className="mb-2"><Link to="cart"><FaUser className="inline mr-2" />Cart</Link></li>
          <li className="mb-2"><Link to="products"><FaUser className="inline mr-2" />Cart</Link></li>
          
          <li>logout</li>
          
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col w-full lg:w-3/4 max-w-2xl bg-slate-300 p-6 rounded-3xl shadow-lg shadow-slate-600 mt-4 z-10">
        <Routes>
          <Route path="*" element={<ProfileFormDisplay />} />
          <Route path="profile" element={<ProfileFormUser />} />
          <Route path="address" element={<ProfileFormAddress />} />
          <Route path="store" element={<ProfileFormStore />} />
          <Route path="products" element={<ProfileFormStore />} />
          <Route path="store/:storeID" element={<ProfileFormStoreDashboard />} />
          <Route path="create-store" element={<ProfileFormStoreCreate />} />
          <Route path="create-product" element={<ProfileFormStoreCreate />} />


          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default ProfileForm2;
