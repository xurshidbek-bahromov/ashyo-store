import React, { createContext, useState, useEffect } from 'react';
import axios from '../axios-instance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Brauzerda saqlangan foydalanuvchi maʼlumotlarini yuklab olish
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://api.ashyo.fullstackdev.uz/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.error("Login error: ", error);
      // Agar kerak bo'lsa, error.response?.data ni qaytaring
      throw error;
    }
  };

  const register = async (fullname, email, password) => {
    try {
      const res = await axios.post('https://api.ashyo.fullstackdev.uz/auth/register', { fullname, email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.error("Register error: ", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
