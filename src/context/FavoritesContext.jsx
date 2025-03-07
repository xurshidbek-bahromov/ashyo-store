// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // LocalStorage'dan mavjud favorites ni o'qish
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Har safar favorites o'zgarganda, uni localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Mahsulot liked bo'lsa olib tashlash, aks holda qo'shish
  const toggleFavorite = (product) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.find((fav) => fav.id === product.id);
      if (exists) {
        return prevFavs.filter((fav) => fav.id !== product.id);
      } else {
        return [...prevFavs, product];
      }
    });
  };

  // Foydalanuvchi tomonidan liked qilingan mahsulotlar sonini qaytarish
  const getFavoritesCount = () => favorites.length;

  // Maksimal integratsiya uchun, agar kerak bo'lsa, isFavorite funksiyasini ham kiritishingiz mumkin
  const isFavorite = (product) => favorites.some((fav) => fav.id === product.id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, getFavoritesCount, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
