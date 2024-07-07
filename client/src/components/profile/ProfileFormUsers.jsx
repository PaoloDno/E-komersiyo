import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../Redux/actions/profileThunk'; // Adjust path as needed

const ProfileFormUser = () => {
  const dispatch = useDispatch();
  const { isAuthenticated , user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  const { profile } = useSelector(state => state.profile);
  const { userProfile, phoneNumber } = profile || {};
  const { firstname, lastname, middleInitial } = userProfile || {};

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    phoneNumber: '',
  });


  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);
  const [editMode, setEditMode] = useState(false); 
  

  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: firstname,
        lastname: lastname,
        middleInitial: middleInitial,
        phoneNumber: phoneNumber
      });
    }
  }, []);

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
    } else {
      setFormValidity(true);
    }

    // Sanitize data before dispatching
    if (formValidity && isAuthenticated) {
      const sanitizedData = {
        firstname: sanitizeInput(formData.firstname),
        lastname: sanitizeInput(formData.lastname),
        middleInitial: sanitizeInput(formData.middleInitial),
        phoneNumber: sanitizeInput(formData.phoneNumber),
      };

      try {
        console.log({...sanitizedData, userID});

        const resultAction = await dispatch(updateUserProfile({ ...sanitizedData, userID}));
        if (updateUserProfile.fulfilled.match(resultAction)) {
        setMessage('Profile updated successfully');
        setEditMode(false);
        }
      } catch (error) {
        setMessage('Failed to update profile:', error);
      }
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); 
    setMessage(''); 
  };

  return (
    <div className='flex flex-col w-full'>
      <h1 className="mb-4 text-xl font-bold">Profile Information</h1>
      {!editMode ? (
        <div className='grid grid-cols-2 my-2'>
          <p>First Name: {firstname}</p>
          <p>Last Name: {lastname}</p>
          <p>MI: {middleInitial}</p>
          <p>Phone Number: {phoneNumber}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
              <input
                required
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded"
                maxLength="15"
              />
            </div>
          </div>
          <p className='text-lg text-red-500'>{message}</p>
          <button
            type="submit"
            className={`p-2 bg-blue-500 text-white my-3 rounded-sm`}
            disabled={!formData.firstname || !formData.lastname || !formData.phoneNumber }
          >
            Update Profile
          </button>
        </form>
      )}
      <button
        onClick={toggleEditMode}
        className={`p-2 bg-gray-300 text-black my-3 rounded-sm`}
      >
        {editMode ? 'Cancel Edit' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default ProfileFormUser;
