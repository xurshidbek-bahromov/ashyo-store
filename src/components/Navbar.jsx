// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Button, Input, Badge } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  HeartOutlined,
  MenuOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';

const NavbarTop = () => (
  <div className="flex justify-between items-center bg-gray-800 dark:bg-gray-900 text-white px-20 py-2">
    <div className="flex items-center">
      <EnvironmentOutlined className="mr-2" />
      <span>Tashkent</span>
    </div>
    <div className="flex items-center gap-6">
      <Link to="/about" className="p-2 hover:transition-colors hover:bg-slate-900 rounded-md hover:shadow-white">
        About Us
      </Link>
      <Link to="/products" className="p-2 hover:transition-colors hover:bg-slate-900 rounded-md hover:shadow-white">
        Products
      </Link>
      <Link to="/contacts" className="p-2 hover:transition-colors hover:bg-slate-900 rounded-md hover:shadow-white">
        Contacts
      </Link>
    </div>
    <div className="flex items-center">
      <PhoneOutlined className="mr-2" />
      <span>+998 (71) 123-45-67</span>
    </div>
    <div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">Uz</Menu.Item>
            <Menu.Item key="2">En</Menu.Item>
            <Menu.Item key="3">Ru</Menu.Item>
          </Menu>
        }
      >
        <Button>
          Uz <UserOutlined />
        </Button>
      </Dropdown>
    </div>
  </div>
);

const NavbarMain = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { getTotalItems } = useContext(CartContext);
  const { getFavoritesCount } = useContext(FavoritesContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const categoriesMenu = (
    <Menu>
      <Menu.Item key="1">Category 1</Menu.Item>
      <Menu.Item key="2">Category 2</Menu.Item>
      <Menu.Item key="3">Category 3</Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md px-20 py-4">
      {/* Logotip */}
      <Link to="/" className="text-3xl font-bold flex">
        <img src="https://i.pinimg.com/originals/e1/49/9d/e1499dcf8c44c275f213eca5e9202bf4.jpg" alt="Ashyo" className="h-10" /><span>Ashyo</span>
      </Link>

      {/* Kategoriyalar dropdown */}
      <Dropdown overlay={categoriesMenu}>
        <Button>
          Kategoriyalar <MenuOutlined />
        </Button>
      </Dropdown>

      {/* Qidiruv paneli */}
      <div className="flex items-center">
        <Input placeholder="What are you looking for?" className="mr-2" />
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </div>

      {/* Dark/Light toggle, auth havolalari, favorites, profile and cart */}
      <div className="flex items-center gap-1">
        <Button onClick={toggleTheme} className="mr-2 hover:border-blue-500 shadow transition" icon={<BulbOutlined />}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Link to="/notifications" className="mr-2 p-1 border rounded-md hover:border-blue-500 shadow transition">
          <Badge count={2} color="red">
            <BellOutlined className="text-xl" />
          </Badge>
        </Link>
        <Link to="/favorites" className="mr-2 p-1 border rounded-md hover:border-blue-500 shadow transition">
          <Badge count={getFavoritesCount()} color="red">
            <HeartOutlined className="text-xl" />
          </Badge>
        </Link>
        <Link to="/cart" className="mr-2 p-1 border rounded-md hover:border-blue-500 shadow transition">
          <Badge count={getTotalItems()} color="red">
            <ShoppingCartOutlined className="text-xl" />
          </Badge>
        </Link>

        {user ? (
          <>
            {/* Profile link appears before logout */}
            <Link to="/profile" className="mr-2 p-1 border rounded-md hover:border-blue-500 shadow transition">
              <span className="flex items-center">
                <UserOutlined className="text-xl mr-1" />
              </span>
            </Link>
            <Button onClick={handleLogout} type="primary" icon={<LogoutOutlined />}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-2">
              <Button type="primary" icon={<LoginOutlined />}>
                Login
              </Button>
            </Link>
            <Link to="/register" className="mr-2">
              <Button type="default" icon={<UserOutlined />}>
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const NavbarCategories = () => (
  <div className="flex justify-center gap-2 bg-gray-200 dark:bg-gray-700 py-2">
    <Link to="/deals" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Aksiyalar</Link>
    <Link to="/smartphones" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Smartfonlar</Link>
    <Link to="/laptops" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Noutbooklar</Link>
    <Link to="/air-conditioners" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Konditsionerlar</Link>
    <Link to="/televisions" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Telivizorlar</Link>
    <Link to="/refrigerators" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Muzlatgichlar</Link>
    <Link to="/washing-machines" className="mx-2 hover:text-gray-600 dark:hover:text-gray-300">Kir yuvish mashinalari</Link>
  </div>
);

const Navbar = () => (
  <header>
    <NavbarTop />
    <NavbarMain />
    <NavbarCategories />
  </header>
);

export default Navbar;
