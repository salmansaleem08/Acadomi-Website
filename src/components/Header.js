// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo1.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;

    const onScroll = () => {
      const currentY = window.scrollY;

      // Scrolled down more than 1 pixel → show background
      if (currentY > 1) {
        setScrolled(true);
      }
      // Back at the very top → hide background
      else {
        setScrolled(false);
      }

      lastY = currentY;
    };

    // useCapture = true → runs **before** any other scroll handlers
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  const navItems = ['Home', 'About Us', 'Manage Uploads', 'Services'];

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="logo-container">
        <img src={logo} alt="Acadomi Logo" className="logo-image" />
        <span className="logo-text">Acadomi</span>
      </div>

      <nav className="nav-center">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="nav-link"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="cta-btn">Saved Material</button>
    </header>
  );
};

export default Header;