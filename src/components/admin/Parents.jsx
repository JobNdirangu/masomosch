import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// remeber to install react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Parents = () => {
  const [parents, setParents] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Authorization header for secure API requests
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchParents = async () => {
    try {
      toast.info('Loading parents...')
      const res = await axios.get('http://localhost:3000/api/parents/', authHeader);

      setParents(res.data);
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);
    
  const handleDelete = async (id) => {
    if (window.confirm('Delete this parent?')) {
      try {
        toast.warning('deleting parent...')
        await axios.delete(`http://localhost:3000/api/parents/${id}`, authHeader);
        
        fetchParents();
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || 'Error deleting parent')
      }
    }
  };

  const handleEdit = (parent) => {
    navigate('/admin-dashboard/parent/edit', { state: { parent } });
  };

  return (
    <div className="container mt-2">
      {/* Toasts */}
        <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Parents</li>
        </ol>
      </nav>
      
      {/* card for parents */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
            <i className="bi bi-people-fill me-2"></i>
            Parents List
          </h5>
          <button
              className="btn btn-success"
              onClick={() => navigate('/admin-dashboard/parents/add')}
            >
            <i className="bi bi-plus-circle me-2"></i>
            Add Parent
          </button>
        </div>

        {/* table */}
        <div className="table-responsive"> 
          {/* checking there is a parent */}
          {parents.length === 0 ? (
            <div className="alert alert-warning text-center mb-0">
              <i className="bi bi-exclamation-circle me-2"></i>
              No parents found.
            </div>
            ) : (
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-success">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {/* mapping */}
                  {parents.map((p, index) => (
                    <tr key={p._id}>
                      <td>{index + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.phone}</td>
                      <td>{p.email}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(p)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p._id)}
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

export default Parents;
