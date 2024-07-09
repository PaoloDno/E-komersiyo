import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddressProfile } from '../../Redux/actions/profileThunk'; // Adjust path as needed

const ProfileFormAddress = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  const { profile } = useSelector((state) => state.profile);
  const { address } = profile || {};
  const { street, brgy, city, country, postal } = address || {};

  const [addressData, setAddressData] = useState({
    street: '',
    brgy: '',
    city: '',
    country: '',
    postal: '',
  });

  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (profile) {
      setAddressData({
        street: street || '',
        brgy: brgy || '',
        city: city || '',
        country: country || '',
        postal: postal || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    setMessage('');
  }, [addressData]);

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

  const containsSanitizableCharacters = (input) => /[&<>"'/]/.test(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      containsSanitizableCharacters(addressData.street) ||
      containsSanitizableCharacters(addressData.brgy) ||
      containsSanitizableCharacters(addressData.city) ||
      containsSanitizableCharacters(addressData.country) ||
      containsSanitizableCharacters(addressData.postal)
    ) {
      setMessage('Input contains invalid characters. ("&", "<", ">", "/")');
      setFormValidity(false);
      return;
    } else if (!addressData.street || !addressData.brgy || !addressData.city || !addressData.country || !addressData.postal) {
      setMessage('Please fill out all fields.');
      setFormValidity(false);
      return;
    } else {
      setFormValidity(true);
    }

    if (formValidity && isAuthenticated) {
      const sanitizedData = {
        street: sanitizeInput(addressData.street),
        brgy: sanitizeInput(addressData.brgy),
        city: sanitizeInput(addressData.city),
        country: sanitizeInput(addressData.country),
        postal: sanitizeInput(addressData.postal),
      };

      try {
        console.log({ ...sanitizedData, userID });

        const resultAction = await dispatch(updateAddressProfile({ ...sanitizedData, userID }));
        if (updateAddressProfile.fulfilled.match(resultAction)) {
          setMessage('Address updated successfully');
          setEditMode(false);
        }
      } catch (error) {
        setMessage(`Failed to update address: ${error.message}`);
      }
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMessage('');
  };

  return (
    <div className='flex flex-col w-full'>
      <h1 className="mb-4 text-xl font-bold">Address Information</h1>
      {!editMode ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-2'>
          <p>Street: {street}</p>
          <p>Barangay: {brgy}</p>
          <p>City: {city}</p>
          <p>Country: {country}</p>
          <p>Postal Code: {postal}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="street" className="block mb-2">Street:</label>
              <input
                required
                type="text"
                id="street"
                name="street"
                value={addressData.street == '' ? 'processing..' : addressData.street}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="brgy" className="block mb-2">Barangay:</label>
              <input
                required
                type="text"
                id="brgy"
                name="brgy"
                value={addressData.brgy == '' ? 'processing..' : addressData.brgy}
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
                value={addressData.city == '' ? 'processing..' : addressData.city}
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
                value={addressData.country == '' ? 'processing..' : addressData.country}
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
                value={addressData.postal == '' ? 'processing..' : addressData.postal}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded"
                maxLength="10"
              />
            </div>
          </div>
          <p className='text-lg text-red-500'>{message}</p>
          <button
            type="submit"
            className={`p-2 bg-blue-500 text-white my-3 rounded-sm`}
            disabled={!addressData.street || !addressData.brgy || !addressData.city || !addressData.country || !addressData.postal}
          >
            Update Address
          </button>
        </form>
      )}
      <button
        onClick={toggleEditMode}
        className={`p-2 bg-gray-300 text-black my-3 rounded-sm`}
      >
        {editMode ? 'Cancel Edit' : 'Edit Address'}
      </button>
    </div>
  );
};

export default ProfileFormAddress;
