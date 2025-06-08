import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherAdd = () => {
  const { token } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone, subject };

    try {
      toast.info('Submitting...');
      const res = await axios.post('http://localhost:3000/api/teachers/', data, authHeader);

      toast.dismiss();
      toast.success(res.data.message || 'Teacher added successfully!');

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
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
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard/teachers">Teachers</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Teacher</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-success">
            <i className="bi bi-person-badge-fill me-2"></i>
            Add New Teacher
          </h5>

          <Link to="/admin-dashboard/teachers" className="btn btn-success">
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
            <i className="bi bi-save me-2"></i>
            Save Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherAdd;
