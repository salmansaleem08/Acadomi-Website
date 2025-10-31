// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../firebase/auth';
import Header from './Header';  // ← ADDED
import './Auth.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 2) e.name = 'Name too short';
    if (!form.username || !/^[a-z0-9_]+$/.test(form.username))
      e.username = 'Only lowercase, numbers, _';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Invalid email';
    if (!form.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password))
      e.password = '8+ chars, upper, lower, num, symbol';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { success, error } = await signUp(form.email, form.password, form.name);
    setLoading(false);
    if (success) {
      navigate('/home');
    } else {
      setErrors({ general: error });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create ACADOMI Account</h2>
          {errors.general && <p className="auth-error-general">{errors.general}</p>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="auth-input" />
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </div>

            <div className="auth-input-group">
              <input name="username" placeholder="Username (lowercase)" value={form.username} onChange={handleChange} className="auth-input" />
              {errors.username && <span className="auth-error">{errors.username}</span>}
            </div>

            <div className="auth-input-group">
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="auth-input" />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            <div className="auth-input-group">
              <div className="auth-pass-wrapper">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="auth-input"
                />
                <span onClick={() => setShowPass(!showPass)} className="auth-eye">
                  {showPass ? 'Hide' : 'Show'}
                </span>
              </div>
              {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;