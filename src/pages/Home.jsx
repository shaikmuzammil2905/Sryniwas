import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, Home as HomeIcon, LineChart, Sun } from 'lucide-react';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

const Home = () => {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content animate-fade-up">
            <h2 className="hero-subtitle">VASTU EXPERT</h2>
            <h1 className="hero-title">THE VASTU GURU</h1>
            <p className="hero-tagline">Bringing Energy, Balance and Success Together</p>
            <p className="hero-desc">
              Professional guidance in Vastu Consultation, Numerology, Mobile Numerology, Name Correction, and Aura Analysis.
            </p>
            <div className="hero-actions">
              <Link to="/book-consultation" className="btn btn-gold">Book Consultation</Link>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp Now</a>
              <a href="tel:9912531255" className="btn btn-outline" style={{borderColor: 'white', color: 'white'}}>Call Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="feature-strip">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-item">
              <HomeIcon size={24} />
              <span>Balanced Spaces</span>
            </div>
            <div className="feature-item">
              <Sun size={24} />
              <span>Positive Energy</span>
            </div>
            <div className="feature-item">
              <HeartHandshake size={24} />
              <span>Harmonious Living</span>
            </div>
            <div className="feature-item">
              <Sparkles size={24} />
              <span>Better Decisions</span>
            </div>
            <div className="feature-item">
              <LineChart size={24} />
              <span>Growth & Success</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">OUR SERVICES</h2>
            <p className="section-subtitle">Comprehensive Vastu Solutions</p>
            <p className="section-desc">Bringing harmony to your home, work and life</p>
          </div>
          <div className="services-grid">
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us-section" id="why-us">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">WHY CHOOSE THE VASTU GURU?</h2>
          </div>
          <div className="why-us-grid">
            {['Personalized Consultation', 'Professional Guidance', 'Easy-to-Understand Analysis', 'Vastu & Numerology Services', 'Online Consultation', 'Individual Attention', 'Client Privacy', 'Practical Recommendations'].map((item, i) => (
              <div key={i} className="why-us-item">
                <div className="why-us-icon">
                  <Sparkles size={20} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;