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
        street: street,
        brgy: brgy,
        city: city,
        country: country,
        postal: postal,
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

        dispatch(updateAddressProfile({ ...sanitizedData, userID }))
          .unwrap()
          .then((updatedAddress) => {
            setMessage('Address updated successfully');
            setAddressData({
              street: updatedAddress.address.street,
              brgy: updatedAddress.address.brgy,
              city: updatedAddress.address.city,
              country: updatedAddress.address.country,
              postal: updatedAddress.address.postal,
            });
            setEditMode(false);
          })
          .catch((error) => setMessage(`Failed to update address: ${error.message}`));
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
    <div className='flex flex-col w-full p-4 bg-white shadow-md rounded-md'>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Address Information</h1>
      {!editMode ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-2'>
          <p><strong>Street:</strong> {addressData.street}</p>
          <p><strong>Barangay:</strong> {addressData.brgy}</p>
          <p><strong>City:</strong> {addressData.city}</p>
          <p><strong>Country:</strong> {addressData.country}</p>
          <p><strong>Postal Code:</strong> {addressData.postal}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-600">Street:</label>
              <input
                required
                type="text"
                id="street"
                name="street"
                value={addressData.street}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="brgy" className="block mb-2 text-sm font-medium text-gray-600">Barangay:</label>
              <input
                required
                type="text"
                id="brgy"
                name="brgy"
                value={addressData.brgy}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-600">City:</label>
              <input
                required
                type="text"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-600">Country:</label>
              <input
                required
                type="text"
                id="country"
                name="country"
                value={addressData.country}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="postal" className="block mb-2 text-sm font-medium text-gray-600">Postal Code:</label>
              <input
                required
                type="text"
                id="postal"
                name="postal"
                value={addressData.postal}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="10"
              />
            </div>
          </div>
          <p className='text-lg text-red-500'>{message}</p>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300`}
            disabled={!addressData.street || !addressData.brgy || !addressData.city || !addressData.country || !addressData.postal}
          >
            Update Address
          </button>
        </form>
      )}
      <button
        onClick={toggleEditMode}
        className={`w-full p-2 mt-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200`}
      >
        {editMode ? 'Cancel Edit' : 'Edit Address'}
      </button>
      <p className="text-lg text-red-500">{message}</p>
    </div>
  );
};

export default ProfileFormAddress;
