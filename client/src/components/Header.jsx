import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/authThunks';

function Header() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const handleLogout = () => {
    dispatch(logout());
  }
  

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-lg font-bold">
          <Link to="/">E-komersiyo</Link>
        </div>
        <nav className='flex w-2/3 bg-black'>
          <ul className="flex space-x-6 justify-between w-full items-center py-2">
            
            <li>
              <ul className='flex space-x-3'>
                <li>
                  <Link to="/home" className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-gray-300">Browse</Link>
                </li>
              </ul>
            </li>
            <li>
              { !isAuthenticated ? (
              <ul className='flex space-x-3'>
                <li>
                  <Link to="/login" className="hover:text-gray-300">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-gray-300">SignUp</Link>
                </li>
              </ul> 
              )
              :
              (
              <ul>
                <li>
                  <Link to="/carts" className="hover:text-gray-300">Carts</Link>
                </li>
                <li>
                  <button className='hover:text-gray-300'
                  onClick={handleLogout}
                  >Log out</button>
                </li>
              </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;