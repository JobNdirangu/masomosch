import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassAdd = () => {
  const { token } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [classYear, setClassYear] = useState('');

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, gradeLevel, classYear };

    try {
      toast.info('Submitting...');
      const res = await axios.post('http://localhost:3000/api/classrooms/', data, authHeader);

      toast.dismiss();
      toast.success(res.data.message || 'Class added successfully!');

      // Clear form
      setName('');
      setGradeLevel('');
      setClassYear('');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error submitting form');
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={5000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard/classes">Classes</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Class</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <h5 className="mb-4 text-success">
            <i className="bi bi-building me-2"></i>
            Add New Class
            </h5>

            <Link className="btn btn-success"
                to={'/admin-dashboard/classes'}
            >
                <i className="bi bi-arrow-left-circle-fill me-2"></i>
                Back
            </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name of the class"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Grade Level ie 1,2.. "
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <textarea
                className="form-control"
                placeholder="Year of the class"
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
                rows={3}
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success ">
            <i className="bi bi-save me-2"></i>
            Save Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassAdd;
