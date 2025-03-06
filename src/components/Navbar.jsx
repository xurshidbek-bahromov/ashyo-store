import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { Button, Switch } from 'antd';
import { UserOutlined, BulbOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg text-white flex justify-between items-center py-4 px-6">
      <div>
        <Link to="/" className="mr-4 font-bold text-2xl">
          Ashyo-Store
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
        <Link to="/products" className="hover:text-gray-200 transition-colors">
          Products
        </Link>
        <Link to="/cart" className="hover:text-gray-200 transition-colors flex items-center">
          <ShoppingCartOutlined className="mr-1" />
          Cart ({getTotalItems()})
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-gray-200 transition-colors">
              Profile
            </Link>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200 transition-colors">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200 transition-colors">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
