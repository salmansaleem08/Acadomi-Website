// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../firebase/auth';

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
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={cardTitle}>Create ACADOMI Account</h2>
        {errors.general && <p style={errGeneral}>{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={inputStyle} />
            {errors.name && <span style={errText}>{errors.name}</span>}
          </div>

          <div style={inputGroup}>
            <input name="username" placeholder="Username (lowercase)" value={form.username} onChange={handleChange} style={inputStyle} />
            {errors.username && <span style={errText}>{errors.username}</span>}
          </div>

          <div style={inputGroup}>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
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
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p style={footerText}>
          Already have an account? <Link to="/login" style={linkStyle}>Log In</Link>
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

export default Signup;