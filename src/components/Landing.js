// src/components/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Landing = () => {
  return (
    <div style={containerStyle}>
      {/* Dark overlay */}
      <div style={overlayStyle} />

      {/* Content */}
      <div style={contentStyle}>
        <h1 style={titleStyle}>
          <span style={{ color: '#FFFFFF' }}>Welcome To </span>
          <span style={{ color: '#B4121B' }}>ACADOMI</span>
        </h1>

        <div style={buttonGroupStyle}>
          <Link to="/login" style={btnStyle} className="landing-btn">
            Login
          </Link>
          <Link to="/signup" style={btnStyle} className="landing-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ==================== STYLES ==================== */
const containerStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
  zIndex: 1,
};

const contentStyle = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: '#FFFFFF',
  fontFamily: "'Montserrat', sans-serif",
};

const titleStyle = {
  fontSize: '4.5rem',
  fontWeight: '900',
  margin: 0,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  lineHeight: '1.2',
};

const buttonGroupStyle = {
  marginTop: '2.5rem',
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const btnStyle = {
  padding: '14px 32px',
  fontSize: '1.1rem',
  fontWeight: '700',
  textDecoration: 'none',
  color: '#FFFFFF',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '2px solid #B4121B',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(4px)',
};

/* Hover effect via CSS class (we’ll add in index.html or a global CSS) */
export default Landing;