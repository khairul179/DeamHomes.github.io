import React from 'react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import Features from '../components/Features';
import Properties from '../components/propertiesshow'; // ✅ Featured Properties section
import Steps from '../components/Steps';
import Testimonials from '../components/testimonial';
import Blog from '../components/Blog';

const Home = () => {
  return (
    <div>
      {/* Hero / Banner */}
      <Hero />

      {/* Trusted Companies */}
      <Companies />

      {/* Key Features */}
      <Features />

      {/* ✅ Featured Properties (shown once only) */}
      <Properties />

      {/* How It Works */}
      <Steps />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Blog / News */}
      <Blog />
    </div>
  );
};

export default Home;
