import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white shadow-md rounded-2xl hover:shadow-lg hover:scale-105 transition">
      
      {/* Avatar */}
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />

      {/* User Info */}
      <h2 className="text-lg font-semibold">{user.login}</h2>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm hover:underline mt-1"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;