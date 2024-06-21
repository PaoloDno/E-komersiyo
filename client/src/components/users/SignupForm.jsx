import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/actions/authThunks.jsx';

import { FaUser, FaLock} from "react-icons/fa";
import { IoMail, IoAlertCircleSharp } from "react-icons/io5";


function SignupForm() {

  
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
      if(password == repeatPass){
        setValidRepeat(true);
      };
  }, [repeatPass]);

  useEffect(() => {
      setMessage('');
  }, [username, email, password, repeatPass]);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    const testv1 = USER_REGEX.test(username);
    const testv2 = PWD_REGEX.test(password);
    const testv3 = EMAIL_REGEX.test(email);
    if (!testv1 || !testv2 || !testv3) {
        setMessage('Invalid Entry');
        return;
    } else if(password != repeatPass){
        setMessage('Passwords did not match')
        return;
    }else{
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
        <p id="usernote" className={`text-sm justify-start align-top place-items-start p-4 border-white rounded-lg bg-slate-500 text-white  ${ username && !validName ? "block" : "hidden"}`}>
          < IoAlertCircleSharp className='text-red-600'/>
          please enter valid username <br />
          4 to 24 characters. <br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
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
        <p id="emailnote" className={`text-sm justify-start align-top place-items-start p-4 border-white rounded-lg bg-slate-500 text-white  ${ email && !validEmail ? "block" : "hidden"}`}>
        < IoAlertCircleSharp className='text-red-600'/>
          Please enter a valid email address.<br />
          Example: user@example.com
        </p>
        <label htmlFor="password" className='flex flex-row mb-2 font-semibold items-center text-white'>
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
        <p id="passwordnote" className={`text-sm justify-start align-top place-items-start p-4 border-white rounded-lg bg-slate-500 text-white ${ password && !validPass ? "block" : "hidden"}`}>
        < IoAlertCircleSharp className='text-red-600'/>
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number, and a special character.<br />
          Allowed special characters: !@#$%
        </p>
        <label htmlFor="repeat" className='flex flex-row items-center mb-2 font-semibold text-white'>
          <FaLock className='mx-2 text-white' /> Confirm Password 
        </label>
        <input
          className="p-3 w-full mb-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="repeatPass"
          placeholder="reapetPassword"
          value={repeatPass}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <p id="repeatnote" className={`text-sm justify-start align-top place-items-start p-4 border-white rounded-lg bg-slate-500 text-white  ${ repeatPass && !validRepeat ? "block" : "hidden"}`}>
          < IoAlertCircleSharp className='text-red-600'/>
          Must match the first password input field.
        </p>
        <button
          type="submit"
          className={`w-full p-3 text-white rounded transition-colors ${
            isLoading || !validEmail || !validName || !validPass || !validRepeat
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading || !validEmail || !validName || !validPass || !validRepeat}

        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && <p className="mt-3 text-green-500">{message}</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
      <p className='flex flex-row text-slate-400 justify-start place-items-start m-2 '>Already have an account? <span className="text-blue-500 cursor-pointer underline mx-2" onClick={()=> navigate('/login')}> Login</span> instead.</p>
    </div>
  );
}

export default SignupForm;
