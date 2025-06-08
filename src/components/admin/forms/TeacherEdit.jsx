import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const TeacherEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedTeacher = state?.teacher;

  useEffect(() => {
    if (!selectedTeacher) {
      toast.error("No teacher data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/teachers");
      }, 2000);
      return;
    }

    setName(selectedTeacher.name || '');
    setEmail(selectedTeacher.email || '');
    setPhone(selectedTeacher.phone || '');
    setSubject(selectedTeacher.subject || '');
  }, [selectedTeacher, navigate]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone, subject };

    try {
      toast.info('Updating...');
      const res = await axios.put(
        `http://localhost:3000/api/teachers/${selectedTeacher._id}`,
        data,
        authHeader
      );

      toast.dismiss();
      toast.success(res.data.message || 'Teacher updated successfully!');
      navigate('/admin-dashboard/teachers');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error updating teacher');
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={5000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item"><Link to="/admin-dashboard/teachers">Teachers</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Teacher</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-success">
            <i className="bi bi-pencil-square me-2"></i>Edit Teacher
          </h5>

          <Link to="/admin-dashboard/teachers" className="btn btn-success">
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Teacher's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2"></i>Update Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherEdit;
