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
      const res = await axios.post('/login', { email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/register', { name, email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
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
