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
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
