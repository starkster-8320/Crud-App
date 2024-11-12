
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSubmit }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [age, setAge] = useState(user ? user.age : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await axios.put(`http://localhost:3000/users/${user._id}`, { name, age });
    } else {
      await axios.post("http://localhost:3000/users", { name, age });
    }
    onSubmit();
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br/>
      <button type="submit">{user ? "Update" : "Create"} User</button>
    </form>
  );
};

export default UserForm;
