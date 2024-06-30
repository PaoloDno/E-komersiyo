import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../Redux/actions/authThunks';

import { initializeUser } from '../../Redux/actions/intializeUser';
import { clearError } from '../../Redux/reducers/authSlice';

import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

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

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    setMessage('');
  }, [username, password]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

 
  const handleLogin = async (e) => {
    e.preventDefault();
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    const resultAction = await dispatch(login({ username: sanitizedUsername, password: sanitizedPassword }));
    if (login.fulfilled.match(resultAction)) {
      setMessage('Login successful!');
      setTimeout(() => navigate('/home'), 1500);
    } else {
      setMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-800 p-6 lg:p-10 rounded-lg shadow-md w-full max-w-md mx-auto">
      {isAuthenticated ? (
        <div className="text-white flex flex-col justify-center">
          <h1 className='text-xl lg:text-2xl font-medium mb-2'>You're already logged in</h1>
          <p><span className="text-blue-500 cursor-pointer underline" onClick={() => navigate('/')}>continue</span></p>
        </div>
      ) : (
        <div className="flex flex-col w-full h-[600px]">
          <h1 className="text-xl lg:text-2xl font-medium text-white mb-4">Login</h1>
          <form onSubmit={handleLogin} className="w-full">
            <label htmlFor="username" className="flex items-center mb-2 font-semibold text-white">
              <FaUser className="mr-2" /> Username
            </label>
            <input
              className="p-2 lg:p-3 w-full mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              placeholder="Juan Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" className="flex items-center mb-2 font-semibold text-white">
              <FaLock className="mr-2" /> Password
            </label>
            <input
              className="p-2 lg:p-3 w-full mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={`w-full p-3 text-white rounded transition-colors ${isLoading || !username || !password ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isLoading || !username || !password}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {message && <p className="mt-3 text-green-500">{message}</p>}
          {error && <p className="mt-3 text-red-500">{error}</p>}
          <p className="text-slate-400 mt-4">Don't have an account? <span className="text-blue-500 cursor-pointer underline" onClick={() => navigate('/signup')}>Sign-up</span> instead</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
