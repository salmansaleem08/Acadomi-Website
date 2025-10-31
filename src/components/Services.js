// src/components/Services.js
import React from 'react';
import './Services.css';
import Headers from './Header';
import backgroundImage from '../assets/background.jpg';  // Reuse your hero bg
import { Link } from 'react-router-dom';

// Placeholder icons (emojis) – replace <img src={yourImage} alt="Mode Icon" className="service-icon__img" /> 
const IconRole = () => <span className="service-icon">🎓</span>;
const IconRealTime = () => <span className="service-icon">⚡</span>;
const IconPodcast = () => <span className="service-icon">🎧</span>;
const IconGroup = () => <span className="service-icon">👥</span>;

// Step icons (SVG or emoji – from DuoFast style)
const IconStep1 = () => <span className="step-icon">📤</span>;  // Upload
const IconStep2 = () => <span className="step-icon">🤖</span>;  // AI Process
const IconStep3 = () => <span className="step-icon">📱</span>;  // Engage

const Services = () => {
  return (
    <>
    <Headers />
      {/* ==== HERO ==== */}
      <section className="services-hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="services-hero__overlay" />
        <div className="services-hero__content">
          <h1 className="services-hero__title">Our Learning Modes</h1>
          <p className="services-hero__subtitle">
            Discover innovative AI-powered modes designed to transform your learning experience
          </p>
        </div>
      </section>

      {/* ==== SERVICE CARDS ==== */}
      <section className="services-section">
        <div className="services-grid">
          
          {/* Role Reversal */}
          <div className="service-card">
            <div className="service-icon"><IconRole /></div>
            <h3 className="service-card__title">Role Reversal</h3>
            <p className="service-card__desc">
              We redefine learning by allowing students to teach the AI, reinforcing understanding through explanation and feedback. This active learning approach deepens concept clarity, boosts confidence, and enhances long-term retention.
            </p>
            <div className="service-benefits">
              <h4>Key Benefits</h4>
              <ul>
                <li>Strengthen understanding through teaching</li>
                <li>AI-generated feedback on student explanations</li>
                <li>Promotes active recall and critical thinking</li>
                <li>Builds confidence and communication skills</li>
              </ul>
            </div>
            <Link to="/role-reversal" className="service-cta">ENQUIRE NOW</Link>
          </div>

          {/* Real-Time AI Teaching */}
          <div className="service-card">
            <div className="service-icon"><IconRealTime /></div>
            <h3 className="service-card__title">Real-Time AI Teaching</h3>
            <p className="service-card__desc">
              Experience intelligent tutoring that adapts instantly to your learning pace. Our AI provides real-time explanations, clarification, and support — just like having a personal tutor available 24/7.
            </p>
            <div className="service-benefits">
              <h4>Key Benefits</h4>
              <ul>
                <li>Instant, adaptive responses to queries</li>
                <li>Interactive and engaging learning sessions</li>
                <li>Personalized explanations tailored to comprehension level</li>
                <li>Continuous availability for seamless study</li>
              </ul>
            </div>
            <button className="service-cta">ENQUIRE NOW</button>
          </div>

          {/* Podcast Mode */}
          <div className="service-card">
            <div className="service-icon"><IconPodcast /></div>
            <h3 className="service-card__title">Podcast Mode</h3>
            <p className="service-card__desc">
              Turn your study material into audio podcasts and learn anywhere, anytime. Stay productive even on the go with concise, AI-generated summaries and conversational learning.
            </p>
            <div className="service-benefits">
              <h4>Key Benefits</h4>
              <ul>
                <li>Convert notes into audio lessons</li>
                <li>Learn hands-free and on the move</li>
                <li>Enhances retention through auditory learning</li>
                <li>Personalized and accessible revision experience</li>
              </ul>
            </div>
            <button className="service-cta">ENQUIRE NOW</button>
          </div>

          {/* Group Learning Mode */}
          <div className="service-card">
            <div className="service-icon"><IconGroup /></div>
            <h3 className="service-card__title">Group Learning Mode</h3>
            <p className="service-card__desc">
              Collaborate with peers in an interactive virtual study room. Engage in group sessions powered by synchronized AI tutoring, fostering teamwork, discussion, and shared understanding.
            </p>
            <div className="service-benefits">
              <h4>Key Benefits</h4>
              <ul>
                <li>Real-time collaborative study sessions</li>
                <li>AI support for group queries and discussions</li>
                <li>Encourages peer learning and interaction</li>
                <li>Promotes accountability and shared progress</li>
              </ul>
            </div>
            <button className="service-cta">ENQUIRE NOW</button>
          </div>

        </div>
      </section>

      {/* ==== 3-STEP PROCESS ==== */}
      <section className="steps-section">
        <div className="steps-container">
          <h2 className="steps-title">3-STEP PROCESS</h2>
          <p className="steps-subtitle">Get started with Acadomi in just three simple steps</p>
          
          <div className="steps-grid">
            
            <div className="step-card">
              <div className="step-icon"><IconStep1 /></div>
              <h3 className="step-card__title">Upload Material</h3>
              <p className="step-card__desc">
                Share your notes, PDFs, or audio – our AI handles the rest with seamless processing.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon"><IconStep2 /></div>
              <h3 className="step-card__title">AI Processing</h3>
              <p className="step-card__desc">
                Watch as intelligent algorithms extract key concepts and prepare interactive sessions.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon"><IconStep3 /></div>
              <h3 className="step-card__title">Engage & Learn</h3>
              <p className="step-card__desc">
                Dive into personalized modes – learn, collaborate, and retain with AI-powered tools.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Services;