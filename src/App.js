// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import AboutUsPage from './pages/AboutUsPage';   // <-- NEW
import ManageUploadsPage from './pages/ManageUploadsPage'; // <-- NEW
import Services from './pages/Services';
import RoleReversal from './components/RoleReversal';
import Podcast from './components/Podcast';
import RealTimeTeachingPage from './components/RealTimeTeachingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/manage-uploads" element={<ManageUploadsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/role-reversal" element={<RoleReversal />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/real-time-teaching" element={<RealTimeTeachingPage />} />

      </Routes>
    </Router>
  );
}

export default App;