// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../firebase/auth';
import { Link } from 'react-router-dom';

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
      navigate('/home');   // ← go to protected home
    } else {
      setErrors({ general: error });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={cardTitle}>Login to ACADOMI</h2>
        {errors.general && <p style={errGeneral}>{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.email && <span style={errText}>{errors.email}</span>}
          </div>

          <div style={inputGroup}>
            <div style={passWrapper}>
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
              />
              <span onClick={() => setShowPass(!showPass)} style={eyeIcon}>
                {showPass ? 'Hide' : 'Show'}
              </span>
            </div>
            {errors.password && <span style={errText}>{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={footerText}>
          Don't have an account?{' '}
          <Link to="/signup" style={linkStyle}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

/* ==================== STYLES ==================== */
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  fontFamily: "'Roboto', sans-serif",
};

const cardStyle = {
  background: 'rgba(26,26,26,0.95)',
  padding: '40px 35px',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(180,18,27,0.3)',
};

const cardTitle = { color: '#FFFFFF', textAlign: 'center', margin: '0 0 24px', fontSize: '1.8rem', fontWeight: '700' };
const inputGroup = { marginBottom: '18px' };
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: '#111111',
  border: '1px solid #444',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.3s',
};
const passWrapper = { position: 'relative' };
const eyeIcon = {
  position: 'absolute',
  right: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#B4121B',
  cursor: 'pointer',
  fontSize: '0.9rem',
};
const errText = { color: '#B4121B', fontSize: '0.85rem', display: 'block', marginTop: '6px' };
const errGeneral = { color: '#B4121B', textAlign: 'center', marginBottom: '12px' };
const submitBtn = {
  width: '100%',
  padding: '14px',
  background: '#B4121B',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background 0.3s',
};
const footerText = { textAlign: 'center', color: '#AAAAAA', marginTop: '20px', fontSize: '0.95rem' };
const linkStyle = { color: '#B4121B', textDecoration: 'underline', fontWeight: '600' };

export default Login;