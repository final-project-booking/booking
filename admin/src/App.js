import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Admin from "./components/dashbord/Admin"
import Dash from './components/dash/Dash';
import Hotel from './components/hotel.js/Hotel';
import Users from './components/users/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dash />} />
          <Route path="user" element={<Users />} />
          <Route path="hotels" element={<Hotel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
