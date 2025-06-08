import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTeachers = async () => {
    try {
      toast.info('Loading teachers...');
      const res = await axios.get('http://localhost:3000/api/teachers/', authHeader);
      setTeachers(res.data);
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to load teachers');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teacher?')) {
      try {
        toast.warning('Deleting teacher...');
        await axios.delete(`http://localhost:3000/api/teachers/${id}`, authHeader);
        fetchTeachers();
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || 'Error deleting teacher');
      }
    }
  };

  const handleEdit = (teacherData) => {
    navigate('/admin-dashboard/teachers/edit', { state: { teacher: teacherData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Teachers</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
            <i className="bi bi-person-badge-fill me-2"></i>
            Teachers List
          </h5>
          <button
            className="btn btn-success"
            onClick={() => navigate('/admin-dashboard/teachers/add')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Teacher
          </button>
        </div>

        <div className="table-responsive">
          {teachers.length === 0 ? (
            <div className="alert alert-warning text-center mb-0">
              <i className="bi bi-exclamation-circle me-2"></i>
              No teachers found.
            </div>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher,index) => (
                  <tr key={teacher._id}>
                    <td>{index + 1}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.subject}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(teacher)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(teacher._id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
