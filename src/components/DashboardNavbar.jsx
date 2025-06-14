import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DashboardNavbar = () => {
  // get the logged in user and the logout function using useContect hook from AuthContext
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 mb-3 rounded">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold text-success fs-4">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Masomo School
        </span>

        <div className="d-flex align-items-center">
          <span className="me-3 text-muted">
            <i className="bi bi-person-circle me-1"></i>
            <strong>{user?.name}</strong> <small className="text-muted">({user?.role})</small>
          </span>

          <button className="btn btn-sm btn-outline-danger d-flex align-items-center" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
