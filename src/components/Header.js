import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="ACADOMI Logo" style={{ height: '38px' }} />

      <nav>
        <ul className="nav-list">
        
            {['Home', 'About Us', 'Manage Uploads', 'Services', 'Saved Material'].map((item) => ( // Add these
            <li key={item}>
                <a href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="nav-link">
                {item}
                </a>
            </li>
            ))}
          <li>
            <button className="settings-btn">Settings</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;