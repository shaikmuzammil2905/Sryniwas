import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="container about-container">
        <div className="about-content">
          <h1 className="about-title">ABOUT THE VASTU GURU</h1>
          <p className="about-desc">
            The Vastu Guru provides personalized consultation services in Vastu, Numerology, Mobile Numerology, Name Correction and Aura Analysis.
          </p>
          <p className="about-desc">
            Our approach focuses on providing clear, easy-to-understand guidance according to each client's requirements.
          </p>
          <div className="focus-section">
            <h2>Our Focus</h2>
            <div className="focus-grid">
              <div className="focus-item">Energy</div>
              <div className="focus-item">Balance</div>
              <div className="focus-item">Prosperity</div>
              <div className="focus-item">Success</div>
            </div>
          </div>
        </div>
        <div className="about-image-wrapper">
          <img src="/image copy 2.png" alt="The Vastu Guru" className="about-image" />
        </div>
      </div>
    </div>
  );
};
export default About;