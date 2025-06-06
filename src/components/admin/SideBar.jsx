import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4>Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">Settings</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
