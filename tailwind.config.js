/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // dark mode uchun .dark klassi kerak bo‘ladi.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",      // Indigo-600
        secondary: "#3b82f6",    // Blue-500
        background: "#f9fafb",   // Light gray, default body background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Zamonaviy shrift, Google Fonts orqali qo‘shasiz
      },
      boxShadow: {
        custom: '0 2px 12px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        'all': 'all',
      },
    },
  },
  plugins: [],
};
