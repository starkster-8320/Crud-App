// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, [users]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  return (
    <div>
      <br/>
      <h2>User List</h2>
      <UserForm user={editingUser} onSubmit={() => setEditingUser(null)} />
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.age}{" "}
            <br />
            <button onClick={() => editUser(user)}>Edit</button> <br />
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
