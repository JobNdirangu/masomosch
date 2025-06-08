import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState('');
  const [editId, setEditId] = useState(null);
  
  const { token } = useContext(AuthContext);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading("Loading ....")
      const res = await axios.get('http://localhost:3000/api/teachers', authHeader);
      setLoading("")
      setTeachers(res.data);
    } catch (err) {
      setLoading("")
      alert('Error loading teachers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherData = { name, email, subject, phone };

    try {
      if (editId) {
        setLoading("Updating please wait...")
        await axios.put(`http://localhost:3000/api/teachers/${editId}`, teacherData, authHeader);
        setLoading("")
      } else {
        setLoading("Please wait as we upload ....")
        await axios.post('http://localhost:3000/api/teachers/', teacherData, authHeader);
        setLoading("")
      }
      clearForm();
      loadTeachers();
    } catch (err) {
      setLoading("")
      alert('Error saving teacher');
    }
  };

  const handleEdit = (teacher) => {
    setName(teacher.name);
    setEmail(teacher.email);
    setSubject(teacher.subject || '');
    setPhone(teacher.phone || '');
    setEditId(teacher._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teacher?')) {
      try {
        setLoading("Deleting in progress ....")
        await axios.delete(`http://localhost:3000/api/teachers/${id}`, authHeader);
        setLoading("")
        loadTeachers();
      } catch (err) {
        setLoading("")
        alert('Error deleting teacher');
      }
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setPhone('');
    setEditId(null);
  };

  return (
    <div className="container mt-2">
      <h2>Teachers</h2>
      <span className='text-info'>{loading}</span>
      <div className="card p-3 mb-3">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="tel"
                placeholder="Phone"
                className="form-control mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Subject (optional)"
                className="form-control mb-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {editId ? 'Update' : 'Add'} Teacher
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary me-2" onClick={clearForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Teachers Table */}
      {teachers.length === 0 ? (
        <div className="alert alert-warning text-center">No teachers found.</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.phone || '-'}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject || '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(teacher)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teachers;
