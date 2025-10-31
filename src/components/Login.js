// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../firebase/auth';
import { Link } from 'react-router-dom';
import Header from './Header';  // ← ADDED
import './Auth.css';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6)
      e.password = 'Password must be 6+ characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { success, error } = await logIn(form.email, form.password);
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
          <h2 className="auth-title">Login to ACADOMI</h2>
          {errors.general && <p className="auth-error-general">{errors.general}</p>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
              />
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;