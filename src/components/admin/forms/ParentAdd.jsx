import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
// remember to install react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParentAdd = () => {
  const { token } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [address, setAddress] = useState('');

  // Authorization header for secure API requests  
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // data json body
    const data = { name, email, phone, nationalId, address };

    try {
      toast.info('Submitting...');
      const res = await axios.post('http://localhost:3000/api/parents/', data, authHeader);

      toast.dismiss();
      toast.success(res.data.message || 'Parent added successfully!');

      // Optionally clear form
      setName('');
      setEmail('');
      setPhone('');
      setNationalId('');
      setAddress('');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error submitting form');
    }
  };

  return (
    <div className="container mt-2">
      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item"><Link to="/admin-dashboard/parents">Parents</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Parent</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-4 text-success">
          <span className="bi bi-people-fill me-2 text-success"></span>
          Add New Parent
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="National ID"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Parent
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentAdd;
