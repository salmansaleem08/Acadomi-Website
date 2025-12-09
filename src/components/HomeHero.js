// src/components/HomeHero.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import './HomeHero.css';                     // <-- new CSS file
import backgroundImage from '../assets/background.jpg';

// SVG icons (inline – same colour & size as DuoFast)
const IconTime   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const IconShield = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconStar   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2"/></svg>;

const HomeHero = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.displayName) setUserName(user.displayName.split(' ')[0]);          // first name only
    else if (user?.email)   setUserName(user.email.split('@')[0]);
  }, []);

  return (
    <>
      {/* ==== HERO ==== */}
      <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="hero__overlay" />
        <div className="hero__content">
          <h2 className="hero__welcome">
            Welcome, <span className="hero__name">{userName || 'User'}</span>
          </h2>
          <h1 className="hero__title">ACADOMI</h1>
          <p className="hero__subtitle">
            Transforming passive learning into active engagement through AI-powered personalized education.
          </p>
        </div>
      </section>

      {/* ==== FEATURE CARDS ==== */}
      <section className="features">
        <div className="features__card">
          <div className="features__icon"><IconTime /></div>
          <h3 className="features__title">Role Reversal</h3>
          <p className="features__text">
            Enhance your learning by explaining concepts back to the AI for feedback.
          </p>
        </div>

        <div className="features__card">
          <div className="features__icon"><IconShield /></div>
          <h3 className="features__title">Real-Time AI Teaching</h3>
          <p className="features__text">
            Experience interactive learning with instant AI responses tailored to your level.
          </p>
        </div>

        <div className="features__card">
          <div className="features__icon"><IconStar /></div>
          <h3 className="features__title">Podcast Mode</h3>
          <p className="features__text">
            Revise anytime, anywhere through AI-generated podcasts from your study material.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomeHero;