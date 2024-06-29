import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from '../../Redux/actions/authThunks';

import { initializeUser } from '../../Redux/actions/intializeUser';

import { IoMail, IoAlertCircleSharp } from "react-icons/io5";
import { FaUser, FaLock } from "react-icons/fa";

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [repeatPass, setRepeatPassword] = useState('');
  const [validRepeat, setValidRepeat] = useState(false);
  const [message, setMessage] = useState('');

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


  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPass(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (password === repeatPass) {
      setValidRepeat(true);
    } else {
      setValidRepeat(false);
    }
  }, [repeatPass]);

  useEffect(() => {
    setMessage('');
  }, [username, email, password, repeatPass]);


  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    const testv1 = USER_REGEX.test(sanitizedUsername);
    const testv2 = PWD_REGEX.test(sanitizedPassword);
    const testv3 = EMAIL_REGEX.test(sanitizedEmail);

    if (!testv1 || !testv2 || !testv3) {
      setMessage('Invalid Entry');
      return;
    } else if (containsSanitizableCharacters(username) || containsSanitizableCharacters(password) || containsSanitizableCharacters(email)) {
      setMessage('Input contains invalid characters. ("&","<",">","/")');
      return;
    } else if (sanitizedPassword !== repeatPass) {
      setMessage('Passwords did not match');
      return;
    } else {
      setMessage('');
      const resultAction = await dispatch(register({ username: sanitizedUsername, email: sanitizedEmail, password: sanitizedPassword }));

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
    }
  };

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-800 p-6 lg:p-10 rounded-lg shadow-md w-full max-w-md mx-auto">
      {isAuthenticated ? (
        <div className="text-white flex flex-col justify-center">
          <h1 className='text-xl lg:text-2xl font-medium mb-2'>You're already logged in</h1>
          <p><span className="text-blue-500 cursor-pointer underline" onClick={() => navigate('/')}>continue</span></p>
        </div>
      ) : (
      <div className='flex flex-col w-full h-[600px]'> 
      <h1 className="text-xl lg:text-2xl font-medium text-white mb-4">Signup</h1>
      <form className="w-full" onSubmit={handleSignup}>
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
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setMessage('')}
          onBlur={() => setMessage('')}
        />
        {!validName && username && (
          <p id="uidnote" className="text-red-500 text-sm mb-4">
            <IoAlertCircleSharp className="inline mr-1" />
            4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
          </p>
        )}
        <label htmlFor="email" className="flex items-center mb-2 font-semibold text-white">
          <IoMail className="mr-2" /> Email
        </label>
        <input
          className="p-2 lg:p-3 w-full mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setMessage('')}
          onBlur={() => setMessage('')}
        />
        {!validEmail && email && (
          <p id="emailnote" className="text-red-500 text-sm mb-4">
            <IoAlertCircleSharp className="inline mr-1" />
            Must be a valid email address.
          </p>
        )}
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
          aria-invalid={validPass ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setMessage('')}
          onBlur={() => setMessage('')}
        />
        {!validPass && password && (
          <p id="pwdnote" className="text-red-500 text-sm mb-4">
            <IoAlertCircleSharp className="inline mr-1" />
            8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.
            Allowed special characters: ! @ # $ %
          </p>
        )}
        <label htmlFor="repeatPass" className="flex items-center mb-2 font-semibold text-white">
          <FaLock className="mr-2" /> Confirm Password
        </label>
        <input
          className="p-2 lg:p-3 w-full mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="repeatPass"
          placeholder="Confirm Password"
          value={repeatPass}
          onChange={(e) => setRepeatPassword(e.target.value)}
          aria-invalid={validRepeat ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMessage('')}
          onBlur={() => setMessage('')}
        />
        {!validRepeat && repeatPass && (
          <p id="confirmnote" className="text-red-500 text-sm mb-4">
            <IoAlertCircleSharp className="inline mr-1" />
            Must match the first password input field.
          </p>
        )}
        <button
          type="submit"
          className={`w-full p-3 text-white rounded transition-colors ${!validName || !validEmail || !validPass || !validRepeat || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={!validName || !validEmail || !validPass || !validRepeat || isLoading}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
      <p className="text-slate-400 mt-4">Already have an account? <span className="text-blue-500 cursor-pointer underline" onClick={() => navigate('/login')}>Log in</span> instead</p>
      </div> // dont know if i should put a div or fragment will do
    )}
  </div>
  );
};

export default SignupForm;
