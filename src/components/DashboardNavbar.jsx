import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light justify-content-between px-4">
      <h5 className="navbar-brand mb-0">Masomo School</h5>

      <div>
        <span className="me-3 text-muted">
          Logged in as: <strong>{user?.name}</strong> ({user?.role})
        </span>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
