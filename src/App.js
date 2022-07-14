import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';


function App() {
  return (
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/user/:userId/*' element={<UserDetail />} />
        </Routes>
  );
}

export default App;
