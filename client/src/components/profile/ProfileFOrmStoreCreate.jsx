import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "../../Redux/actions/storeThunks";
import { useNavigate } from "react-router-dom";


const ProfileFormStoreCreate = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userID, username } = user || {};
  const {error} = useSelector((state) => state.stores)
 
  const [storeFormData, setStoreFormData] = useState({
    storeName: '',
    storeOwner: {
      storeOwnerID: '',
      storeOwnerName: '',
    },
    storeDescription: '',
  });

  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);
  const [storeCreated, setStoreCreated] = useState(false);

  useEffect(() => {
    setMessage('');
  }, [storeFormData]);

  useEffect(() => {
    if(error){
    setMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if(user){
      setStoreFormData({
      storeName: '',
      storeOwner: {
        storeOwnerID: userID || '',
        storeOwnerName: username || '',
      },
      storeDescription: '',
      })
    }
    console.log(storeFormData);
  }, [user])

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
    setStoreFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(
    containsSanitizableCharacters(storeFormData.storeName) || 
    containsSanitizableCharacters(storeFormData.storeOwner.storeOwnerID) || 
    containsSanitizableCharacters(storeFormData.storeOwner.storeOwnerName) || 
    containsSanitizableCharacters(storeFormData.storeDescription) 
    ){
      setMessage('Input contains invalid characters. ("&", "<", ">", "/")');
      setFormValidity(false);
      return;
    } else if(!storeFormData.storeName ||
      !storeFormData.storeOwner.storeOwnerID ||
      !storeFormData.storeOwner.storeOwnerName ||
      !storeFormData.storeDescription
    ){
      setMessage('Please fill out all fields.');
      setFormValidity(false);
      return;
    } else {
      setFormValidity(true);
    }

    if (formValidity && isAuthenticated) {
      const sanitizedData = {
        storeName: sanitizeInput(storeFormData.storeName),
        storeDescription: sanitizeInput(storeFormData.storeDescription),
        storeOwner: { 
          storeOwnerID: sanitizeInput(storeFormData.storeOwner.storeOwnerID),
          storeOwnerName: sanitizeInput(storeFormData.storeOwner.storeOwnerName)
        },
      }
      try {
        console.log(storeFormData);
        const resultAction = await dispatch(createStore({...sanitizedData}));
        console.log(resultAction);
        if(createStore.fulfilled.match(resultAction)) {
          setMessage("Store Created Successfully");
          setStoreCreated(true);
          console.log("store created successfully");
          setFormValidity(false);
          }
        
          
      } catch (error) {
        setMessage('Failed to create Shop: ' `${error.message}`);
      }
    }
  }
  return (
    <div className='flex flex-col w-full'>
      <h1 className="mb-4 text-xl font-bold">Create Store</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="storeName" className="block mb-2">Store Name:</label>
              <input
                required
                type="text"
                id="storeName"
                name="storeName"
                value={storeFormData.storeName == '' ? 'Store...' : storeFormData.storeName}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded"
                maxLength="100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="storeDescription" className="block mb-2">Store Description:</label>
              <input
                required
                type="storeDescription"
                id="storeDescription"
                name="storeDescription"
                value={storeFormData.storeDescription == '' ? 'We sell...' : storeFormData.storeDescription}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded"
                maxLength="100"
              />
            </div>
        </div>
        <p className='text-lg text-red-500'>{message}</p>
        {storeCreated ? (
          <button
            type="button"
            className="p-2 bg-green-500 text-white my-3 rounded-sm"
            onClick={() => navigate('/profile/store')}
          >
            Go to Store
          </button>
        ) : (
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white my-3 rounded-sm"
            disabled={!storeFormData.storeName || !storeFormData.storeDescription}
          >
            Create Store
          </button>
        )}
      </form>
    </div>
  )
};

export default ProfileFormStoreCreate;
