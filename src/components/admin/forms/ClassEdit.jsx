import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const ClassEdit = () => {
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [classYear, setClassYear] = useState('');

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedClass = state?.classData;

  useEffect(() => {
    if (!selectedClass) {
      toast.error("No class data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/classes");
        }, 2000); 
      return;
    }

    setName(selectedClass.name || '');
    setGradeLevel(selectedClass.gradeLevel || '');
    setClassYear(selectedClass.classYear || '');
  }, [selectedClass, navigate]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, gradeLevel, classYear };

    try {
      toast.info('Updating...');
      const res = await axios.put(`http://localhost:3000/api/classrooms/${selectedClass._id}`,data,authHeader);

      toast.dismiss();
      toast.success(res.data.message || 'Class updated successfully!');
      navigate('/admin-dashboard/classes');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error updating class');
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={5000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard/classes">Classes</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Class</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <h5 className="mb-4 text-success">
                <span className="bi bi-pencil-square me-2 text-success"></span>Edit Class
            </h5>

            <Link className="btn btn-success" to={'/admin-dashboard/classes'} >
                <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
            </Link>
        </div>
        

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Class Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Grade Level"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <input
                type='text'
                className="form-control"
                placeholder="Year"
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-outline-success">
            <i className="bi bi-save me-2"></i>
            Update Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassEdit;
