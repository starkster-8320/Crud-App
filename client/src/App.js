import React from 'react';
import UserList from './components/UserList';
import './App.css' 

const App = () => {
  return (
    <div className='app-container'>
      <h1>CRUD APP</h1>
      <UserList />
    </div>
  );
};

export default App;
