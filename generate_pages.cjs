const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

const files = {
  'components/MobileActionBar.jsx': `
import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MobileActionBar.css';

const MobileActionBar = () => {
  return (
    <div className="mobile-action-bar">
      <a href="tel:9912531255" className="action-btn call-btn">
        <Phone size={20} />
        <span>Call</span>
      </a>
      <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="action-btn whatsapp-btn">
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      <Link to="/book-consultation" className="action-btn book-btn">
        <Calendar size={20} />
        <span>Book Now</span>
      </Link>
    </div>
  );
};
export default MobileActionBar;
`,
  'components/MobileActionBar.css': `
.mobile-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: var(--color-bg-main);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}
.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 4px;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary);
  border-right: 1px solid var(--color-border);
}
.action-btn:last-child {
  border-right: none;
}
.whatsapp-btn {
  color: var(--color-whatsapp);
}
.book-btn {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}
@media (min-width: 768px) {
  .mobile-action-bar {
    display: none;
  }
}
`,
  'components/Modal.jsx': `
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
`,
  'components/Modal.css': `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal-content {
  background-color: var(--color-bg-main);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  margin: 0;
  font-size: 20px;
}
.modal-close {
  color: var(--color-text-muted);
}
.modal-close:hover {
  color: var(--color-text-dark);
}
.modal-body {
  padding: 24px;
  overflow-y: auto;
}
`,
  'components/ServiceCard.jsx': `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Hash, Smartphone, Type, Sun, ShieldCheck, Gem } from 'lucide-react';
import Modal from './Modal';
import './ServiceCard.css';

const iconMap = { Home, Hash, Smartphone, Type, Sun, ShieldCheck, Gem };

const ServiceCard = ({ service }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const Icon = iconMap[service.icon] || Home;

  return (
    <>
      <div className="service-card">
        <div className="service-card-icon">
          <Icon size={32} />
        </div>
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-desc">{service.shortDescription}</p>
        
        <div className="service-card-actions">
          <button className="btn-quick-view" onClick={() => setQuickViewOpen(true)}>
            Quick View
          </button>
          <Link to={\`/services/\${service.id}\`} className="btn-read-more">
            Read More <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <Modal isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} title={service.title}>
        <div className="quick-view-content">
          <div className="quick-view-icon-wrap">
            <Icon size={48} className="quick-view-icon" />
          </div>
          <p className="quick-view-desc">{service.fullDescription}</p>
          
          <div className="quick-view-section">
            <h4>What's Included:</h4>
            <ul>
              {service.includes.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          
          <div className="quick-view-buttons">
            <Link to="/book-consultation" className="btn btn-primary">Book Consultation</Link>
            <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp Now</a>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ServiceCard;
`,
  'components/ServiceCard.css': `
.service-card {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-secondary);
}
.service-card-icon {
  width: 64px;
  height: 64px;
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: all var(--transition-normal);
}
.service-card:hover .service-card-icon {
  background-color: var(--color-primary);
  color: white;
}
.service-card-title {
  font-size: 20px;
  margin-bottom: 12px;
}
.service-card-desc {
  color: var(--color-text-muted);
  font-size: 15px;
  margin-bottom: 24px;
  flex-grow: 1;
}
.service-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}
.btn-quick-view {
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
}
.btn-quick-view:hover {
  color: var(--color-primary);
}
.btn-read-more {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 14px;
}
.btn-read-more:hover {
  color: var(--color-accent);
}
.quick-view-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.quick-view-icon-wrap {
  text-align: center;
  padding: 20px 0;
}
.quick-view-icon {
  color: var(--color-primary);
}
.quick-view-desc {
  font-size: 16px;
  color: var(--color-text-dark);
}
.quick-view-section h4 {
  font-family: var(--font-body);
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--color-primary);
}
.quick-view-section ul {
  padding-left: 20px;
  list-style-type: disc;
  color: var(--color-text-muted);
}
.quick-view-section li {
  margin-bottom: 4px;
}
.quick-view-buttons {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.quick-view-buttons .btn {
  flex: 1;
}
@media (max-width: 480px) {
  .quick-view-buttons {
    flex-direction: column;
  }
}
`,
  'pages/Home.jsx': `
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
`,
  'pages/Home.css': `
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  background-image: url('/image.png');
  background-size: cover;
  background-position: center;
  color: white;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(59, 29, 82, 0.9) 0%, rgba(59, 29, 82, 0.4) 100%);
}
.hero-container {
  position: relative;
  z-index: 10;
}
.hero-content {
  max-width: 700px;
}
.hero-subtitle {
  font-family: var(--font-body);
  font-size: 16px;
  letter-spacing: 4px;
  color: var(--color-accent);
  margin-bottom: 8px;
}
.hero-title {
  font-size: 56px;
  color: white;
  margin-bottom: 16px;
}
.hero-tagline {
  font-size: 24px;
  font-family: var(--font-heading);
  font-style: italic;
  margin-bottom: 24px;
  color: var(--color-secondary);
}
.hero-desc {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
  line-height: 1.8;
}
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.feature-strip {
  background-color: var(--color-primary-light);
  color: white;
  padding: 32px 0;
}
.feature-grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  transition: transform var(--transition-fast);
}
.feature-item:hover {
  transform: translateY(-2px);
  color: var(--color-accent);
}

.section-header {
  margin-bottom: 48px;
}
.section-header.center {
  text-align: center;
}
.section-title {
  font-size: 32px;
  margin-bottom: 12px;
}
.section-subtitle {
  color: var(--color-accent);
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
}
.section-desc {
  color: var(--color-text-muted);
  font-size: 16px;
}

.services-section {
  padding: 80px 0;
  background-color: var(--color-bg-secondary);
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.why-us-section {
  padding: 80px 0;
  background-color: white;
}
.why-us-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
.why-us-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  font-weight: 500;
  transition: all var(--transition-fast);
}
.why-us-item:hover {
  background-color: var(--color-primary);
  color: white;
}
.why-us-icon {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
`,
  'pages/About.jsx': `
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
`,
  'pages/About.css': `
.about-container {
  padding: 80px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
}
.about-title {
  font-size: 40px;
  margin-bottom: 24px;
}
.about-desc {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
  line-height: 1.8;
}
.focus-section {
  margin-top: 40px;
}
.focus-section h2 {
  font-family: var(--font-body);
  font-size: 24px;
  margin-bottom: 24px;
}
.focus-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.focus-item {
  background-color: var(--color-primary);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  box-shadow: var(--shadow-sm);
}
.about-image-wrapper {
  background-color: var(--color-bg-secondary);
  border-radius: 16px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-image {
  max-width: 100%;
  height: auto;
}
@media (min-width: 992px) {
  .about-container {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}
`,
  'pages/Services.jsx': `
import React from 'react';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  return (
    <div className="page-wrapper">
      <div className="container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="section-header center">
          <h1 className="section-title">ALL SERVICES</h1>
          <p className="section-subtitle">Comprehensive Guidance for Life and Property</p>
        </div>
        <div className="services-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px'}}>
          {servicesData.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Services;
`,
  'pages/ServiceDetail.jsx': `
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) {
      navigate('/services');
    }
  }, [id, service, navigate]);

  if (!service) return null;

  return (
    <div className="page-wrapper">
      <div className="service-hero">
        <div className="container">
          <h1 className="service-hero-title">{service.title}</h1>
        </div>
      </div>
      
      <div className="container service-content-container">
        <div className="service-main-content">
          <h2 className="service-section-title">Overview</h2>
          <p className="service-text">{service.fullDescription}</p>
          
          <h2 className="service-section-title mt-8">What is Included</h2>
          <ul className="service-list">
            {service.includes.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h2 className="service-section-title mt-8">Suitable For</h2>
          <ul className="service-list">
            {service.suitableFor.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h2 className="service-section-title mt-8">Benefits</h2>
          <ul className="service-list">
            {service.benefits.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        
        <div className="service-sidebar">
          <div className="sidebar-card">
            <h3>Ready for Guidance?</h3>
            <p>Book a consultation to get personalized advice from The Vastu Guru.</p>
            <div className="sidebar-actions">
              <Link to="/book-consultation" className="btn btn-primary w-full">Book Consultation</Link>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full">WhatsApp Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetail;
`,
  'pages/ServiceDetail.css': `
.service-hero {
  background-color: var(--color-primary);
  color: white;
  padding: 80px 0;
  text-align: center;
}
.service-hero-title {
  font-size: 48px;
  color: white;
}
.service-content-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 60px 24px;
}
.service-section-title {
  font-family: var(--font-body);
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--color-primary);
}
.mt-8 { margin-top: 32px; }
.service-text {
  font-size: 18px;
  color: var(--color-text-muted);
  line-height: 1.8;
}
.service-list {
  list-style: none;
  padding: 0;
}
.service-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  font-size: 16px;
  color: var(--color-text-dark);
}
.service-list li::before {
  content: "•";
  color: var(--color-accent);
  font-size: 24px;
  position: absolute;
  left: 0;
  top: -4px;
}
.sidebar-card {
  background-color: var(--color-bg-secondary);
  padding: 32px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}
.sidebar-card h3 {
  font-family: var(--font-body);
  font-size: 20px;
  margin-bottom: 12px;
}
.sidebar-card p {
  color: var(--color-text-muted);
  margin-bottom: 24px;
}
.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.w-full {
  width: 100%;
}
@media (min-width: 992px) {
  .service-content-container {
    grid-template-columns: 2fr 1fr;
  }
  .service-sidebar {
    position: sticky;
    top: 100px;
    align-self: start;
  }
}
`,
  'pages/Contact.jsx': `
import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Modal from '../components/Modal';
import './Contact.css';

const Contact = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessModalOpen(true);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
  };

  return (
    <div className="page-wrapper">
      <div className="container contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-tagline">THE VASTU GURU - Vastu Expert<br/>Bringing Energy, Balance and Success Together</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon-wrap"><Phone size={24} /></div>
              <div>
                <h4>Call Us</h4>
                <p>9912531255</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><Phone size={24} /></div>
              <div>
                <h4>WhatsApp</h4>
                <p>9912553575</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <p>thevastuguru15@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>

      <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Message Sent">
        <div className="text-center" style={{textAlign: 'center', padding: '20px 0'}}>
          <h3 style={{marginBottom: '16px', color: 'var(--color-whatsapp)'}}>Success!</h3>
          <p>Thank you for contacting The Vastu Guru. We have received your message and will get back to you shortly.</p>
          <button className="btn btn-primary" onClick={() => setSuccessModalOpen(false)} style={{marginTop: '24px'}}>Close</button>
        </div>
      </Modal>
    </div>
  );
};
export default Contact;
`,
  'pages/Contact.css': `
.contact-container {
  padding: 80px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
.contact-title {
  font-size: 48px;
  margin-bottom: 16px;
}
.contact-tagline {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 40px;
  line-height: 1.6;
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
}
.contact-icon-wrap {
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  padding: 16px;
  border-radius: 50%;
}
.contact-item h4 {
  font-family: var(--font-body);
  font-size: 18px;
  margin-bottom: 4px;
}
.contact-item p {
  color: var(--color-text-muted);
  font-size: 16px;
}
.contact-form-wrapper {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}
.contact-form-wrapper h2 {
  font-family: var(--font-body);
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text-dark);
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color var(--transition-fast);
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}
@media (min-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}
`,
  'pages/BookConsultation.jsx': `
import React, { useState } from 'react';
import { servicesData } from '../data/services';
import Modal from '../components/Modal';

const BookConsultation = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', whatsapp: '', email: '', service: '', date: '', time: '', mode: 'Online', message: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessModalOpen(true);
    setFormData({name: '', phone: '', whatsapp: '', email: '', service: '', date: '', time: '', mode: 'Online', message: ''});
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{maxWidth: '800px', paddingTop: '60px', paddingBottom: '80px'}}>
        <div className="text-center" style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 className="section-title">Book a Consultation</h1>
          <p className="section-desc">Schedule your session with The Vastu Guru for personalized guidance.</p>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Select Service *</label>
              <select name="service" required value={formData.service} onChange={handleChange}>
                <option value="">-- Choose a Service --</option>
                {servicesData.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div className="form-group">
                <label>Preferred Date *</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Preferred Time *</label>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Consultation Mode *</label>
              <select name="mode" required value={formData.mode} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            <div className="form-group">
              <label>Additional Message</label>
              <textarea name="message" rows="3" value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn btn-gold w-full" style={{fontSize: '18px', padding: '16px'}}>BOOK CONSULTATION</button>
          </form>
        </div>
      </div>

      <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Booking Confirmed">
        <div className="text-center" style={{textAlign: 'center', padding: '20px 0'}}>
          <h3 style={{marginBottom: '16px', color: 'var(--color-primary)'}}>Consultation Request Received</h3>
          <p>Thank you for contacting The Vastu Guru. Your consultation request has been received. Our team will contact you shortly to confirm the appointment.</p>
          <button className="btn btn-primary" onClick={() => setSuccessModalOpen(false)} style={{marginTop: '24px'}}>Done</button>
        </div>
      </Modal>
    </div>
  );
};
export default BookConsultation;
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, relativePath);
  fs.writeFileSync(fullPath, content.trim());
}

console.log("All components created successfully.");
