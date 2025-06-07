import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalParents: 0,
    totalClassrooms: 0,
    activeUsers: 0,
    recentTeachers: [],
    recentStudents: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/api/dashboardAdmin/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center text-success mb-4">Admin Dashboard Overview</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Teachers */}
        <div className="col">
          <div className="card shadow-lg border-primary rounded-3">
            <div className="card-body text-center">
              <i className="bi bi-person-lines-fill fs-1 text-primary"></i>
              <h5 className="card-title mt-3 text-primary">Teachers</h5>
              <h2 className="display-4 text-primary">{stats.totalTeachers}</h2>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col">
          <div className="card shadow-lg border-info rounded-3">
            <div className="card-body text-center">
              <i className="bi bi-mortarboard fs-1 text-info"></i>
              <h5 className="card-title mt-3 text-info">Students</h5>
              <h2 className="display-4 text-info">{stats.totalStudents}</h2>
            </div>
          </div>
        </div>

        
        {/* Classrooms */}
        <div className="col">
          <div className="card shadow-lg border-warning rounded-3">
            <div className="card-body text-center">
              <i className="bi bi-journal-bookmark fs-1 text-warning"></i>
              <h5 className="card-title mt-3 text-warning">Classes</h5>
              <h2 className="display-4 text-warning">{stats.totalClassrooms}</h2>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="col">
          <div className="card shadow-lg border-success rounded-3">
            <div className="card-body text-center">
              <i className="bi bi-person-check-fill fs-1 text-success"></i>
              <h5 className="card-title mt-3 text-success">Active Users</h5>
              <h2 className="display-4 text-success">{stats.activeUsers}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Teachers */}
      <div className="mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h5><i className="bi bi-person-lines-fill me-2"></i> Recent Teachers</h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length === 0 ? (
              <p className="text-muted">No recent teachers.</p>
            ) : (
              <ul className="list-group">
                {stats.recentTeachers.map((teacher, index) => (
                  <li key={index} className="list-group-item">
                    {teacher.name} – {teacher.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="mt-4 mb-5">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white">
            <h5><i className="bi bi-mortarboard me-2"></i> Recent Students</h5>
          </div>
          <div className="card-body">
            {stats.recentStudents.length === 0 ? (
              <p className="text-muted">No recent students.</p>
            ) : (
              <ul className="list-group">
                {stats.recentStudents.map((student, index) => (
                  <li key={index} className="list-group-item">
                    {student.name} – {student.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
