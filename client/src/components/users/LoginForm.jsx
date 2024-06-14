import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/actions/authThunks.jsx'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      setMessage('Login successful!');
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-medium text-white mb-4">Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <p className="mt-3 text-green-500">{message}</p>}
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
