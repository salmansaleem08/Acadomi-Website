import React from 'react';
import Header from '../components/Header';
import HomeHero from '../components/HomeHero';

const Home = () => (
  <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
    <Header />
    <HomeHero />
  </div>
);

export default Home;