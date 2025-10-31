import React from 'react';
import backgroundImage from '../assets/background.jpg';

const HomeHero = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '0 50px 120px 50px',
        color: '#FFFFFF',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Stronger Black Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px' }}>
        <h1
          style={{
            fontSize: '4.2rem',
            fontWeight: '900',
            margin: 0,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #FFFFFF 60%, #B4121B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ACADOMI
        </h1>
        <p
          style={{
            fontSize: '1.3rem',
            margin: '12px 0 0 0',
            fontWeight: '500',
            lineHeight: '1.5',
            color: '#FFFFFF',
            maxWidth: '100%',
          }}
        >
          AI Powered Personalized Learning Platform
        </p>
      </div>
    </div>
  );
};

export default HomeHero;