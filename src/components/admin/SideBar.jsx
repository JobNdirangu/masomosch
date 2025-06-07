import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="bg-dark text-white d-flex flex-column p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="text-center mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Admin Panel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-grid me-2"></i> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/students"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-lines-fill me-2"></i> Students
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/parents"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-people-fill me-2"></i> Parents
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/teachers"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-badge me-2"></i> Teachers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/classes"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-journal-bookmark me-2"></i> Classes
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-danger text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </NavLink>
        </li>
      </ul>

      <hr />
      <div className="text-center small">
        <span className="text-light">© 2025 Masomo</span>
      </div>
    </div>
  );
};

export default SideBar;
