import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { updateUserProfile } from '../../Redux/actions/profileActions'; // Adjust path as needed

const ProfileFormUser = () => {
  const dispatch = useDispatch();
  const { profile, userProfile, phoneNum,} = useSelector(state => state.profile);
  const { firstname, lastname, middleInitial } = userProfile;

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    phoneNum: '',
  });
  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);
  
  useEffect(() => {
    setMessage('');
  }, [formData]);


  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: firstname,
        lastname: lastname,
        middleInitial: middleInitial,
        phoneNum: phoneNum,
      })
    }
    console.log(formData)
  }, []);

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
    if(containsSanitizableCharacters(formData.firstname) 
      || containsSanitizableCharacters(formData.lastname) 
      || containsSanitizableCharacters(formData.middleInitial) 
      || containsSanitizableCharacters(formData.phoneNo)){
      setMessage('Input contains invalid characters. ("&","<",">","/")');
      setFormValidity(false);
      return;
    }else if(!formData.firstname || !formData.lastname || !formData.middleInitial || !formData.phoneNo) {
      setMessage('Fill-up all inputs');
      setFormValidity(false);
      return;
    } else {
      setFormValidity(true);
    }

    //sanitize
    if(formValidity){
    const sanitizeFirstName = sanitizeInput(formData.firstname)
    const sanitizeLastName = sanitizeInput(formData.lastname)
    const sanitizeMiddleInitial = sanitizeInput(formData.middleInitial)
    const sanitizePhoneNUm = sanitizeInput(formData.phoneNum);
      setMessage(" inputs are ok")
      return;
    }else {
      setMessage("in developemnt but inputs are ok")
      return;
    }
   {/*} try {
      await dispatch(updateUserProfile(formData));
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
  */}
   }

  return (
    <div className='flex flex-col w-full'>
      <h1 className="mb-4 text-xl font-bold">Profile Information</h1>
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
            <label htmlFor="phoneNo" className="block mb-2">Phone Number:</label>
            <input
              required
              type="number"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded"
              maxLength="15"
            />
          </div>
          
        </div>
        <p className='text-lg text-red-500'>{message}</p>
        <button type="submit" className={`p-2 ${ !formValidity ? 'bg-slate-800' : 'bg-blue-500' } text-white my-3 rounded-sm`}
        disabled={!formValidity || !formData.firstname || !formData.lastname || !formData.phoneNo}
        >Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileFormUser;
