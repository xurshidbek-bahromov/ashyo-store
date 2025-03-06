import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-4">Profil</h2>
      <div className="space-y-2">
        <p><strong>Ism:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Qo'shimcha ma'lumotlar qo'shilishi mumkin */}
      </div>
    </div>
  );
};

export default Profile;
