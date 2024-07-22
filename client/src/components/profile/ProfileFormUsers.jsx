import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../Redux/actions/profileThunk'; // Adjust path as needed

const ProfileFormUser = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  const { profile } = useSelector(state => state.profile);
  const { userProfile } = profile || {};
  const { firstname, lastname, middleInitial, phoneNumber } = userProfile || {};

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    phoneNumber: '',
  });
  console.log("a", userProfile);

  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstname,
        lastname,
        middleInitial,
        phoneNumber
      });
    }
  }, [userProfile]);

  useEffect(() => {
    setMessage('');
  }, [formData]);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      containsSanitizableCharacters(formData.firstname) ||
      containsSanitizableCharacters(formData.lastname) ||
      containsSanitizableCharacters(formData.middleInitial) ||
      containsSanitizableCharacters(formData.phoneNumber)
    ) {
      setMessage('Input contains invalid characters. ("&", "<", ">", "/")');
      setFormValidity(false);
      return;
    } else if (!formData.firstname || !formData.lastname || !formData.middleInitial || !formData.phoneNumber) {
      setMessage('Please fill out all fields.');
      setFormValidity(false);
      return;
    } else if (updated) {
      setMessage('You just updated your data.');
      return;
    } else {
      setFormValidity(true);
    }

    if (formValidity && isAuthenticated) {
      const sanitizedData = {
        firstname: sanitizeInput(formData.firstname),
        lastname: sanitizeInput(formData.lastname),
        middleInitial: sanitizeInput(formData.middleInitial),
        phoneNumber: sanitizeInput(formData.phoneNumber),
      };

      try {
        dispatch(updateUserProfile({ ...sanitizedData, userID }))
          .unwrap()
          .then((updatedProfile) => {
            setMessage('Profile updated successfully.');
            setFormData(updatedProfile);
            setUpdated(true);
            setEditMode(false); // Exit edit mode after successful update
          })
          .catch((error) => {
            setMessage(`Failed to update profile: ${error.message}`);
          });
      } catch (error) {
        setMessage(`Failed to update profile: ${error}`);
      }
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full p-4 bg-white shadow-md rounded-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Profile Information</h1>
      {!editMode ? (
        <div className="grid grid-cols-2 gap-4 my-2">
          <p><strong>First Name:</strong> {formData.firstname}</p>
          <p><strong>Last Name:</strong> {formData.lastname}</p>
          <p><strong>MI:</strong> {formData.middleInitial}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-600">First Name:</label>
              <input
                required
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="20"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-600">Last Name:</label>
              <input
                required
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="20"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="middleInitial" className="block mb-2 text-sm font-medium text-gray-600">Middle Initial:</label>
              <input
                type="text"
                id="middleInitial"
                name="middleInitial"
                value={formData.middleInitial}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="3"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-600">Phone Number:</label>
              <input
                required
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                maxLength="15"
              />
            </div>
          </div>
          <p className="text-lg text-red-500">{message}</p>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={!formData.firstname || !formData.lastname || !formData.phoneNumber}
          >
            Update Profile
          </button>
        </form>
      )}
      <button
        onClick={toggleEditMode}
        className={`w-full p-2 mt-3 ${editMode ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded-md hover:${editMode ? 'bg-gray-400' : 'bg-blue-600'} focus:outline-none focus:ring focus:ring-${editMode ? 'gray-200' : 'blue-300'}`}
      >
        {editMode ? 'Cancel Edit' : 'Edit Profile'}
      </button>
      <p className="text-lg text-red-500">{message}</p>
    </div>
  );
};

export default ProfileFormUser;
