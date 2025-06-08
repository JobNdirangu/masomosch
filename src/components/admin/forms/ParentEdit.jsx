import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const ParentEdit = () => {    
    // Declare state variables for the parent's details
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');


    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    //To receive data passed from the previous route  
    const { state } = useLocation();
    const parent = state?.parent;
    
    // Load initial data when the component mounts
    useEffect(() => {
        if (!parent) {
        toast.error("No parent data provided");

        // For programmatically navigating the user
        navigate("/admin-dashboard/parents");
        return
        }
    
    // Set the form fields with the existing parent data
    setName(parent.name || '');
    setEmail(parent.email || '');
    setPhone(parent.phone || '');
    setNationalId(parent.nationalId || '');
    setAddress(parent.address || '');
  }, [parent, navigate]);

  // Authorization header for secure API requests
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // on submit this function triggers   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone, nationalId, address };

    try {
      toast.info('Updating...');
      // Send PUT request to update parent data
      const res = await axios.put(`http://localhost:3000/api/parents/${parent._id}`,data,authHeader);
      toast.dismiss();
      toast.success(res.data.message || 'Parent updated successfully!');
      navigate('/admin-dashboard/parents');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={5000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item"><Link to="/admin-dashboard/parents">Parents</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Parent</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-4 text-success">
          <span className="bi bi-pencil-square me-2 text-success"></span>
          Edit Parent
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
              <textarea
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-save me-1"></i> Save Changes
                </button>
                
                <Link to="/admin-dashboard/parents" className="btn btn-secondary">
                    <i className="bi bi-x-circle me-1"></i> Cancel
                </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentEdit;
