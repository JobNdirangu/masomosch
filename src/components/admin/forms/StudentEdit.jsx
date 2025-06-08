import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const StudentEdit = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedStudent = state?.studentData;

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [classroomId, setClassroomId] = useState('');
  const [parentNationalId, setParentNationalId] = useState('');

  const [classrooms, setClassrooms] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (!selectedStudent) {
      toast.error("No student data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/students");
      }, 2000);
      return;
    }

    setName(selectedStudent.name || '');
    setDateOfBirth(selectedStudent.dateOfBirth ? selectedStudent.dateOfBirth.substring(0, 10) : '');
    setGender(selectedStudent.gender || '');
    setAdmissionNumber(selectedStudent.admissionNumber || '');
    setClassroomId(selectedStudent.classroom?._id || '');
    setParentNationalId(selectedStudent.parent?.nationalId || '');
  }, [selectedStudent, navigate]);

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
      toast.info('Updating...');
      const res = await axios.put(
        `http://localhost:3000/api/students/${selectedStudent._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.dismiss();
      toast.success(res.data.message || 'Student updated successfully!');
      navigate('/admin-dashboard/students');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error updating student');
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={5000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold"><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item fw-bold"><Link to="/admin-dashboard/students">Students</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Student</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-success">
            <i className="bi bi-pencil-fill me-2"></i>Edit Student
          </h5>

          <Link to="/admin-dashboard/students" className="btn btn-success">
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
                className="form-select"
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
              <input
                type="text"
                className="form-control"
                placeholder="Parent National ID"
                value={parentNationalId}
                onChange={(e) => setParentNationalId(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                required
              >
                <option value="">Select Classroom</option>
                {classrooms.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} - Grade {cls.gradeLevel}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-check-circle-fill me-2"></i>Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentEdit;
