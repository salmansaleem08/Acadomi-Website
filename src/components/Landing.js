// src/components/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';  // ← ADDED
import './Landing.css';
import backgroundImage from '../assets/background.jpg';

const Landing = () => {
  return (
    <>


      {/* ==== HERO SECTION ==== */}
      <section className="landing-hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="landing-hero__overlay" />
        <div className="landing-hero__content">
          <h1 className="landing-hero__title">
            <span className="landing-hero__title--light">Welcome To</span>
            <span className="landing-hero__title--lime">ACADOMI</span>
          </h1>

          <div className="landing-btn-group">
            <Link to="/login" className="landing-btn">
              Login
            </Link>
            <Link to="/signup" className="landing-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;