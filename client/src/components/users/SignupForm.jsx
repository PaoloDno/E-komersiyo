import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm({ setMessage }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password
      });
      setMessage(response.data.message);
      useNavigate('/home');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-medium text-white mb-4">Signup</h1>
      <input
        className="p-3 w-full max-w-xs mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="p-3 w-full max-w-xs mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-3 w-full max-w-xs mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full max-w-xs p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
}

export default SignupForm;
