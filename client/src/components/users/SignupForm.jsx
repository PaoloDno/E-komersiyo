import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/actions/authThunks.jsx';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    const resultAction = await dispatch(register({ username, email, password }));
    if (register.fulfilled.match(resultAction)) {
      setMessage('User successfully registered');
      setTimeout(() => navigate('/profile'), 1500);
    } else {
      if (error && typeof error.message === 'string') {
        setMessage(error.message);
      } else {
        setMessage('An error occurred during registration');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-medium text-white mb-4">Signup</h1>
      <form className="w-full max-w-xs" onSubmit={handleSignup}>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && <p className="mt-3 text-green-500">{message}</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
}

export default SignupForm;
