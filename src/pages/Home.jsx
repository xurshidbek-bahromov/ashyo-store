import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Avatar } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { UserOutlined } from '@ant-design/icons';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      {/* Banner orqa rasmi */}
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/1600x900/?store"
          alt="Banner"
          className="object-cover w-full h-full opacity-30 transition duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to Ashyo-Store
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Your modern online store experience
        </p>
      </div>
      {/* Profil bo‘limi */}
      <div className="mt-8 w-full max-w-md relative z-10">
        {user ? (
          <Card
            hoverable
            className="cursor-pointer transition transform hover:scale-105 rounded-lg shadow-custom"
            onClick={handleProfileClick}
          >
            <div className="flex items-center">
              <Avatar 
                size={60} 
                icon={<UserOutlined />} 
                src={user.avatar || 'https://via.placeholder.com/100'} 
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </Card>
        ) : (
          <Link to="/login">
            <Button type="primary" block>
              Login to view your profile
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
