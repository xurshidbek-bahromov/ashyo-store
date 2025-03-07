import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === null) return false;
    try {
        const parsedTheme = JSON.parse(storedTheme);
        // Check if it's a valid boolean
        if (typeof parsedTheme === 'boolean') {
            return parsedTheme;
        } else {
             // localStorage value is not valid data
            console.error('Invalid theme data in localStorage:', storedTheme);
            return false; // Default to light mode
        }
    } catch (error) {
      // JSON.parse failed - probably not valid JSON
      console.error('Error parsing theme from localStorage:', error);
      return false; // Default to light mode
    }
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};