import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
    //from context get the function to change the state of token and user   
  const {setToken,setUser}=useContext(AuthContext)

  const url = "http://localhost:3000/api/login/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading('Logging in...');

    try {
        const data = { email, password };
        const res = await axios.post(url, data);

        const { token, user } = res.data;

        // Store token and user info in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // console.log("Login success:", message);
        setToken(token)
        setUser(user)


        // Role-based redirection
        if (user.role === 'admin') {
        navigate('/admin-dashboard');
        } else if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
        } else if (user.role === 'parent') {
        navigate('/parent-dashboard');
        } else {
        navigate('/'); 
        }

    } catch (error) {
        console.log(error)
      setLoading('');
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <form onSubmit={handleSubmit} className="shadow card p-4 bg-light rounded">
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center mb-4 text-success">Login</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="alert alert-info">{loading}</div> : null}

        <input
          type="email"
          className="form-control mb-3 mt-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">Login</button>
        </div>

        <div className="text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
