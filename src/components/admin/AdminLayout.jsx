import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../DashboardNavbar';
import SideBar from './SideBar';

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <SideBar />

      <div className="flex-grow-1">
        <DashboardNavbar /> 

        {/* Main area where the routed page content will be displayed */}
        <main className="p-4 vh-100" >
          {/* Outlet renders the matched child route’s element */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
