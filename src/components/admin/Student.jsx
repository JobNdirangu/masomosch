import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchStudents = async () => {
    try {
      toast.info('Loading students...')
      const res = await axios.get('http://localhost:3000/api/students', authHeader);
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      try {
        toast.warning('Deleting student...');
        await axios.delete(`http://localhost:3000/api/students/${id}`, authHeader);
        fetchStudents();
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || 'Error deleting teacher');
      }
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={5000} />
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold "><Link to="/admin-dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Students</li>
        </ol>
      </nav>

      <div className="card shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-success"><i className="bi bi-people-fill me-2"></i>Student List</h4>
          <Link className="btn btn-success" to="/admin-dashboard/students/add">
            <i className="bi bi-plus-circle-fill me-2"></i>Add Student
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>ADM No.</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Classroom</th>
                <th>Parent</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.admissionNumber}</td>
                  <td>{student.gender}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{`${student.classroom?.gradeLevel},${student.classroom?.name} ` || 'N/A'}</td>
                  <td>{`${student.parent.name},  ${student.parent.phone}` || 'N/A'}</td>
                  <td>
                    {student.photo ? (
                      <img
                        src={`http://localhost:3000/uploads/${student.photo}`}
                        alt="student"
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      'No Photo'
                    )}
                  </td>
                  <td>
                    <Link
                      to={"/admin-dashboard/students/edit/"}
                      state={{ studentData: student }}
                      className="btn btn-sm btn-warning me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>

                    <button className='btn btn-sm btn-danger me-2' onClick={()=>handleDelete(student._id)}><i className='bi bi-trash3-fill'></i></button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;
