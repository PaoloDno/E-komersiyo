import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const user = useSelector(state => state.auth.user);

  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    phoneNo: '',
    userImg: '',
    userId: user.userID,
    userStores: [],
    userStores: '',
    addressId: '',
    cartId: '',
    historyId: ''
  });

  const [addressData, setAddressData] = useState({
    street: '',
    brgy: '',
    city: '',
    country: '',
    postal: '',
  });

  useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(fetchUser(user.userId));
    }
    if (addressStatus === 'idle') {
      dispatch(fetchAddress(user.userId));
    }
  }, [profileStatus, addressStatus, dispatch, user.userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        middleInitial: user.middleInitial,
        phoneNo: user.phoneNo,
        userImg: user.userImg,
        userStores: user.userStores,
        cartNumber: user.cartNumber,
        userHistory: user.userHistory,
      });
    }
  }, [user]);

  useEffect(() => {
    if (address) {
      setAddressData(address);
    }
  }, [address]);

  const sanitizeInput = (input) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => map[match]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setAddressData((prev) => ({
        ...prev,
        [addressField]: sanitizedValue,
      }));
    } else {
      setFormData({ ...formData, [name]: sanitizedValue });
    }
  };

  const handleSubmit = async (e) => {

  e.preventDefault();
  setMessage('');

  try {
    await dispatch(updateUserProfile({ ...formData, userId: user.userId }));
    await dispatch(setCartNumber(formData.cartNumber));
    await dispatch(setUserStores(formData.userStores));
    await dispatch(setUserHistory(formData.userHistory));
    
    setMessage('Profile is successfully updated');
    setTimeout(() => navigate('/browse'), 1500);
    }
    
    catch (error) {
      if (error && typeof error.message === 'string') {
        setMessage(error.message);
      } else {
        setMessage('An error occurred during profile update');
      }
    }
  }


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="flex flex-col w-full">
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>UserID: { user.userID }</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <form className="flex flex-col w-full max-w-2xl bg-slate-300 p-6 rounded-3xl shadow-lg shadow-slate-600">
        <h1 className="mb-4 text-xl font-bold">Welcome, please fill up the required fields to finish setting up your profile</h1>
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
          <div className="flex flex-col">
            <label htmlFor="address.street" className="block mb-2">House/Unit No. & Street:</label>
            <input
              required
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
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
              value={formData.address.bgry}
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
              value={formData.address.city}
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
              value={formData.address.country}
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
              value={formData.address.postal}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="10"
            />
          </div>
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white my-3 rounded-sm"
        disabled={
          !formData.firstname ||
          !formData.lastname ||
          !formData.phoneNo ||
          !formData.address.street ||
          !formData.address.brgy ||
          !formData.address.city ||
          !formData.address.country ||
          !formData.address.postal
        }
        >Update Profile</button>
        
      </form>
      {message && <p className="mt-3 text-green-500">{message}</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default ProfileForm;
