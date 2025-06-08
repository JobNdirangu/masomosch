import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchClasses = async () => {
    try {
      toast.info('Loading classes...');
      const res = await axios.get('http://localhost:3000/api/classrooms/', authHeader);
      setClasses(res.data);
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to load classes');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this class?')) {
      try {
        toast.warning('Deleting class...');
        await axios.delete(`http://localhost:3000/api/classrooms/${id}`, authHeader);
        fetchClasses();
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message);
      }
    }
  };

  const handleEdit = (classData) => {
    navigate('/admin-dashboard/classes/edit', { state: { classData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Classes</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
            <i className="bi bi-building me-2"></i>
            Classes List
          </h5>
          <button
            className="btn btn-success"
            onClick={() => navigate('/admin-dashboard/classes/add')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Class
          </button>
        </div>

        <div className="table-responsive">
          {classes.length === 0 ? (
            <div className="alert alert-warning text-center mb-0">
              <i className="bi bi-exclamation-circle me-2"></i>
              No classes found.
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Grade Level</th>
                  <th>Class Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, index) => (
                  <tr key={cls._id}>
                    <td>{index + 1}</td>
                    <td>{cls.name}</td>
                    <td>{cls.gradeLevel}</td>
                    <td>{cls.classYear}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(cls)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(cls._id)}
                      >
                        <i className="bi bi-trash"></i>
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

export default Classes;
