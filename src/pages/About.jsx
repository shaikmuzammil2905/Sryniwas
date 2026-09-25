import React from 'react';
import { Shield, BookOpen, Compass, Target, Award, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="page-wrapper about-page">
      {/* SECTION 1: About The Vastu Guru */}
      <section className="about-hero animate-fade-in">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">About The Vastu Guru</h1>
            <p className="about-subtitle">Transforming Spaces, Elevating Lives</p>
            <p className="about-desc">
              The Vastu Guru provides personalized consultation services in Vastu, Numerology, Mobile Numerology, Name Correction and Aura Analysis. We blend traditional wisdom with modern practical application to harmonize your living and working environments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Our Vastu Philosophy */}
      <section className="about-philosophy bg-secondary">
        <div className="container about-grid">
          <div className="about-text-content animate-fade-up">
            <h2 className="section-heading">Our Vastu Philosophy</h2>
            <p>
              Vastu Shastra is the ancient Indian science of architecture and design. At its core, it is about aligning the five elements of nature—Earth, Water, Fire, Air, and Space—with the eight directions to create a harmonious environment.
            </p>
            <p>
              We believe that every space has its own unique energy signature. By understanding this energy and making subtle, practical adjustments, we can unlock the potential for prosperity, health, and happiness without requiring major structural demolitions.
            </p>
          </div>
          <div className="about-image-wrapper animate-fade-in">
            <img src="/images/about_philosophy.jpg" alt="Vastu Philosophy" className="about-feature-img" />
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Approach */}
      <section className="about-approach">
        <div className="container text-center">
          <h2 className="section-heading">Our Approach</h2>
          <p className="section-subtext">A systematic process for bringing balance to your space.</p>
          <div className="process-timeline">
            <div className="process-step animate-fade-up" style={{animationDelay: '0.1s'}}>
              <div className="step-number">01</div>
              <h4>Understand</h4>
              <p>Gathering detailed requirements and floor plans.</p>
            </div>
            <div className="process-step animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="step-number">02</div>
              <h4>Analyze</h4>
              <p>Deep analysis of directional energies and placements.</p>
            </div>
            <div className="process-step animate-fade-up" style={{animationDelay: '0.3s'}}>
              <div className="step-number">03</div>
              <h4>Identify</h4>
              <p>Pinpointing energy imbalances and Vastu doshas.</p>
            </div>
            <div className="process-step animate-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="step-number">04</div>
              <h4>Recommend</h4>
              <p>Providing practical, non-destructive remedies.</p>
            </div>
            <div className="process-step animate-fade-up" style={{animationDelay: '0.5s'}}>
              <div className="step-number">05</div>
              <h4>Implement</h4>
              <p>Guiding you through the application of remedies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: What We Focus On */}
      <section className="about-focus bg-secondary">
        <div className="container">
          <h2 className="section-heading text-center">What We Focus On</h2>
          <div className="focus-cards">
            <div className="focus-card animate-fade-up" style={{animationDelay: '0.1s'}}>
              <Compass className="focus-icon" />
              <h3>Residential Vastu</h3>
              <p>Harmonizing homes, apartments, and villas for peace and prosperity.</p>
            </div>
            <div className="focus-card animate-fade-up" style={{animationDelay: '0.2s'}}>
              <Target className="focus-icon" />
              <h3>Commercial Vastu</h3>
              <p>Optimizing offices and shops for business growth and financial stability.</p>
            </div>
            <div className="focus-card animate-fade-up" style={{animationDelay: '0.3s'}}>
              <BookOpen className="focus-icon" />
              <h3>Space Energy Analysis</h3>
              <p>Detailed checking of the elemental balance in your environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Our Approach Is Different */}
      <section className="about-difference">
        <div className="container about-grid reverse">
          <div className="about-image-wrapper animate-fade-in">
            <img src="/images/about_intro.jpg" alt="Vastu Consultation" className="about-feature-img" />
          </div>
          <div className="about-text-content animate-fade-up">
            <h2 className="section-heading">Why Our Approach Is Different</h2>
            <p>
              Unlike traditional approaches that often demand drastic structural changes, we specialize in micro-Vastu remedies. We use color therapy, metal strips, elemental balancing, and crystal placements to correct defects.
            </p>
            <ul className="difference-list">
              <li><Shield className="list-icon" /> <strong>Non-Destructive:</strong> We focus on remedies that don't require breaking walls.</li>
              <li><Award className="list-icon" /> <strong>Personalized:</strong> Solutions tailored to your specific astrology and numerology.</li>
              <li><Heart className="list-icon" /> <strong>Practical:</strong> Easy to implement in modern contemporary homes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: Our Commitment */}
      <section className="about-commitment text-center bg-primary text-light animate-fade-up">
        <div className="container">
          <h2 className="section-heading text-light">Our Commitment</h2>
          <p className="commitment-text">
            We are dedicated to bringing clarity, positive energy, and holistic balance to your life through the profound sciences of Vastu and Numerology.
          </p>
          <a href="/contact" className="btn btn-gold mt-4">Book Your Consultation</a>
        </div>
      </section>
    </div>
  );
};
export default About;