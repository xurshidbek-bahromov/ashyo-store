import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
      <p className="text-lg mb-8">Tailblock ilhomidagi dizayn bilan yaratilgan.</p>
      <img
        src="https://via.placeholder.com/600x400"
        alt="Home visual"
        className="rounded shadow-lg"
      />
    </div>
  );
};

export default Home;
