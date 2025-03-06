import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from 'antd';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Button type="primary" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
