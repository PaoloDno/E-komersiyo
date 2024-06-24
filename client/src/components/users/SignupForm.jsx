import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/actions/authThunks';
import { FaUser, FaLock } from "react-icons/fa";
import { IoMail, IoAlertCircleSharp } from "react-icons/io5";

const SignupForm = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    } else if (containsSanitizableCharacters(username) || containsSanitizableCharacters(password) || containsSanitizableCharacters(email) ) {
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
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-medium text-white mb-4">Signup</h1>
      <form className="w-fit max-w-md border border-cyan-200 p-5 px-10 rounded-lg" onSubmit={handleSignup}>
        <label htmlFor="username" className='flex flex-row items-center mb-2 font-semibold text-white'>
          <FaUser className='mx-2'/> Username
        </label>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p className={username && !validName ? "flex flex-row items-center text-red-500" : "hidden"}>
          <IoAlertCircleSharp className='m-2 text-lg'/> 4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="email" className='flex flex-row items-center mb-2 font-semibold text-white'>
          <IoMail className='mx-2'/> Email
        </label>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className={email && !validEmail ? "flex flex-row items-center text-red-500" : "hidden"}>
          <IoAlertCircleSharp className='m-2  text-lg'/> Enter a valid email address.
        </p>
        <label htmlFor="password" className='flex flex-row items-center mb-2 font-semibold text-white'>
          <FaLock className='mx-2'/> Password
        </label>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className={password && !validPass ? "flex flex-row items-center text-red-500" : "hidden"}>
          <IoAlertCircleSharp className='m-2  text-lg'/> 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.
        </p>
        <label htmlFor="repeatPass" className='flex flex-row items-center mb-2 font-semibold text-white'>
          <FaLock className='mx-2'/> Repeat Password
        </label>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="repeatPass"
          placeholder="Repeat Password"
          value={repeatPass}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <p className={repeatPass ? "flex flex-row items-center text-slate-500" : "hidden"}>
          <IoAlertCircleSharp className='m-2  text-lg'/> Must match the password.
        </p>
        <button
          type="submit"
          className={`w-full mt-5 p-3 text-white rounded transition-colors ${isLoading || !validName || !validPass || !validEmail || !repeatPass ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading || !validName || !validPass || !validEmail || !repeatPass}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {message && <p className="mt-3 text-green-500">{message}</p>}
        {error && <p className="mt-3 text-red-500">{error}</p>}
        <p className='flex flex-row text-slate-400 justify-start place-items-start m-2 '>Already have an account? <span className="text-blue-500 cursor-pointer underline mx-2" onClick={()=> navigate('/login')}>Login</span> instead </p>
      </form>
    </div>
  );
};

export default SignupForm;
