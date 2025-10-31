// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css';
import backgroundImage from '../assets/background.jpg';

// Inline SVG icons – same as DuoFast
const IconUpload   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconBrain    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2C6.5 2 4 4.5 4 7.5S6.5 13 9.5 13 15 10.5 15 7.5 12.5 2 9.5 2z"/><path d="M14.5 22c3 0 5.5-2.5 5.5-5.5S17.5 11 14.5 11 9 13.5 9 16.5 11.5 22 14.5 22z"/></svg>;
const IconGroup    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconRefresh  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;

const AboutUs = () => {
  return (
    <>
      {/* ==== HERO ==== */}
      <section className="about-hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <h1 className="about-hero__title">About Acadomi</h1>
          <p className="about-hero__subtitle">
            Revolutionizing Education with AI-Powered Personalized Learning
          </p>
        </div>
      </section>

      {/* ==== SECTIONS ==== */}
      <div className="about-content">

        {/* Mission */}
        <section className="about-section">
          <h2 className="about-section__title">Our Mission</h2>
          <p className="about-section__text">
            Acadomi is an innovative AI-powered platform designed to transform passive online learning into an interactive, engaging, and retention-focused experience. Born from the challenges of Education 4.0, we address the limitations of existing e-learning systems like Coursera, Khan Academy, and YouTube, which often leave students disengaged and struggling with retention in theoretical subjects such as Computer Science theory, Business, Social Sciences, and Humanities.
          </p>
          <p className="about-section__text">
            By recreating the dynamics of real tutoring and group study in a digital environment, Acadomi empowers students with real-time AI support, focus monitoring, collaborative tools, and personalized revision aids. Our goal is to make learning active, personalized, and effective for higher education students.
          </p>
        </section>

        {/* Problem */}
        <section className="about-section">
          <h2 className="about-section__title">The Problem We Solve</h2>
          <p className="about-section__text">Current e-learning platforms face several critical issues:</p>
          <ul className="about-list">
            <li><strong>Passive Learning:</strong> Students consume content without interaction, leading to an illusion of understanding and poor application of knowledge.</li>
            <li><strong>Lack of Focus and Motivation:</strong> 64% of students struggle to stay engaged online, resulting in wasted time and shallow learning.</li>
            <li><strong>Weak Retention:</strong> Up to 70% of material is forgotten within 24 hours without reinforcement.</li>
            <li><strong>Isolation:</strong> Online learners miss peer discussions, leading to high dropout rates (below 10% completion in MOOCs).</li>
          </ul>
        </section>

        {/* Features */}
        <section className="about-section">
          <h2 className="about-section__title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon"><IconUpload /></div>
              <h3 className="feature-card__title">Content Input & Processing</h3>
              <p className="feature-card__text">
                Upload handwritten notes, PDFs, or audio clips. Our AI uses OCR, speech-to-text, and NLP to extract key concepts for interactive sessions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon"><IconBrain /></div>
              <h3 className="feature-card__title">Real-Time AI Tutoring & Engagement</h3>
              <p className="feature-card__text">
                Instant answers, adaptive explanations, debate modes, and focus detection via webcam to keep you attentive and engaged.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon"><IconGroup /></div>
              <h3 className="feature-card__title">Collaborative & Critical Learning</h3>
              <p className="feature-card__text">
                Virtual group study sessions with synchronized AI support, role-reversal teaching, and structured debates to foster peer accountability.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon"><IconRefresh /></div>
              <h3 className="feature-card__title">Revision & Retention Tools</h3>
              <p className="feature-card__text">
                Concept bookmarking, smart cheat sheets (summaries, flashcards, mind maps), and podcast mode for on-the-go reviews using active recall and spaced repetition.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="about-section">
          <h2 className="about-section__title">Our Objectives</h2>
          <ul className="about-list">
            <li>Replace passive study with interactive learning.</li>
            <li>Enhance focus and reduce distractions.</li>
            <li>Improve long-term retention through reinforcement.</li>
            <li>Encourage collaborative and social learning.</li>
            <li>Deliver personalized, adaptive experiences aligned with Education 4.0.</li>
          </ul>
        </section>

        {/* Team */}
        <section className="about-section">
          <h2 className="about-section__title">Meet the Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <h3 className="team-card__name">Salman Saleem</h3>
            </div>
            <div className="team-card">
              <h3 className="team-card__name">Abdullah Saghir</h3>
            </div>
            <div className="team-card">
              <h3 className="team-card__name">Muneeb Amir</h3>
            </div>
          </div>
          <p className="about-section__text" style={{ marginTop: '2rem' }}>
            Supervised by <strong>Ms. Rabail Zahid</strong>
          </p>
        </section>

      </div>
    </>
  );
};

export default AboutUs;