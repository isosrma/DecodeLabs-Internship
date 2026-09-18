import React, { useEffect, useState } from 'react';
import UserCard from '../Api/UserCard';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const res = await fetch(
       `https://api.github.com/users?per_page=${perPage}`
      );
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }; 

    fetchUsers();
  }, [perPage]);
  if (loading) {
    return <p className="text-blue-500">Loading...</p>;
  }
  console.log(users);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">GitHub Users</h1>

      {/* ✅ Input Field */}
      <input
        type="number"
        value={perPage}
        onChange={(e) => {
          setPerPage(Number(e.target.value));
        }}
        className="border px-3 py-1 rounded mb-4"
        placeholder="Users per page"
      />

      {/* Cards */}
      <div className="space-y-3">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;