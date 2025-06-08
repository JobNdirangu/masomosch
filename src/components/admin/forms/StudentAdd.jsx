import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [classroomId, setClassroomId] = useState('');
  const [parentDetails, setParentDetails] = useState([]);
  const [parentNationalId, setParentNationalId] = useState('');

  const [classrooms, setClassrooms] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/classrooms', authHeader);
        setClassrooms(res.data);
      } catch (err) {
        toast.error('Failed to fetch classrooms');
      }
    };

    fetchClassrooms();
  }, []);

  const verifyParent= async () => {
    try {
        
        toast.info('Finding parent.....');
        const res = await axios.get(`http://localhost:3000/api/parents/${parentNationalId}`,authHeader);
        setParentDetails(res.data);
    } catch (err) {
        setParentDetails(null);
        toast.error(err.res?.data?.message)        
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('gender', gender);
    formData.append('admissionNumber', admissionNumber);
    formData.append('parentNationalId', parentNationalId);
    formData.append('classroomId', classroomId);
    if (photo) formData.append('photo', photo);

    try {
      toast.info('Submitting...');
      const res = await axios.post(
        'http://localhost:3000/api/students',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.dismiss();
      toast.success(res.data.message || 'Student added successfully!');
      navigate('/admin-dashboard/students');
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
          <li className="breadcrumb-item fw-bold"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item fw-bold"><Link to="/admin-dashboard/students">Students</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Student</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-success">
            <i className="bi bi-person-plus-fill me-2"></i>
            Add New Student
          </h5>

          <Link to="/admin-dashboard/students" className="btn btn-success">
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Admission Number"
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
                <div className="position-relative">
                    <input
                    type="text"
                    className="form-control pe-5" // padding-end to prevent text overlap
                    placeholder="Parent National ID"
                    value={parentNationalId}
                    onChange={(e) => setParentNationalId(e.target.value)}
                    required
                    />
                    
                    <i
                    className="bi bi-check-circle-fill"
                    onClick={verifyParent}
                    style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#28a745',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        pointerEvents: 'auto' // makes sure it can be clicked
                    }}
                    title="Verify Parent"
                    ></i>
                </div>
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                required
              >
                <option value="">Select Classroom</option>
                {classrooms.map((cls) => (
                  <option key={cls._id} value={cls._id}>{`${cls.gradeLevel}, ${cls.name}`}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          {parentDetails && <div className='text-success'>{parentDetails.name} </div>}
        {parentDetails && <div className='text-success'>{parentDetails.phone} </div>}

          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2"></i>Save Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentAdd;
