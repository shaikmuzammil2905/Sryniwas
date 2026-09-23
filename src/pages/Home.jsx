import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Eye, Compass, HeartHandshake } from 'lucide-react';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

const faqs = [
  { q: "What services does The Vastu Guru provide?", a: "We provide Vastu Consultation, Numerology, Mobile Numerology, Name Correction, Aura Analysis, Vastu Remedies, and Gemstone Guidance." },
  { q: "Can I book an online consultation?", a: "Yes, we offer both Online and In-Person consultations depending on your preference and location." },
  { q: "What information is required for a consultation?", a: "Typically, we need your birth details (date, time, location) for Numerology, and a floor plan for Vastu analysis. Specifics will be shared upon booking." },
  { q: "Can I consult regarding a home or office?", a: "Absolutely. We provide Vastu guidance for homes, apartments, offices, shops, and commercial properties." },
  { q: "What is Numerology consultation?", a: "It's an analysis of your core numbers based on your birth date and name to provide guidance for personal and professional growth." },
  { q: "What is Mobile Numerology?", a: "Evaluating your mobile number to see if its energetic vibration aligns with your personal or business goals." },
  { q: "What happens during an Aura Analysis?", a: "We use an Aura Scanner to check your energy field, interpret the results, and suggest ways to balance your chakras." },
  { q: "How can I contact The Vastu Guru?", a: "You can call us at 9912531255, WhatsApp at 9912553575, or email thevastuguru15@gmail.com." }
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-anim"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge animate-fade-down">VASTU EXPERT</span>
            <h1 className="hero-title animate-fade-up">THE VASTU GURU</h1>
            <p className="hero-tagline animate-fade-up stagger-1">Bringing Energy, Balance and Success Together</p>
            <p className="hero-desc animate-fade-up stagger-2">
              Personalized guidance in Vastu, Numerology and related consultation services to help you understand your space, numbers and personal requirements with clarity.
            </p>
            
            <div className="hero-services animate-fade-up stagger-3">
              <span>Vastu Consultation</span> • <span>Numerology</span> • <span>Mobile Numerology</span><br/>
              <span>Name Correction</span> • <span>Aura Analysis</span>
            </div>

            <div className="hero-actions animate-fade-up stagger-4">
              <Link to="/book-consultation" className="btn btn-gold">Book Consultation</Link>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp Now</a>
              <a href="tel:9912531255" className="btn btn-outline" style={{borderColor: 'white', color: 'white'}}>Call Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container intro-container">
          <div className="intro-text">
            <h2>A Balanced Approach to Your Space and Numbers</h2>
            <p>
              The Vastu Guru provides personalized consultation services across Vastu, Numerology, Mobile Numerology, Name Correction and Aura Analysis.
            </p>
            <p>
              Our approach focuses on clear, easy-to-understand guidance based on each client's requirements, with attention to practical recommendations and individual consultation.
            </p>
            <div className="intro-stats">
              <div className="stat-item"><HeartHandshake size={24} /> Personalized Guidance</div>
              <div className="stat-item"><Eye size={24} /> Individual Attention</div>
              <div className="stat-item"><Search size={24} /> Online Consultation</div>
              <div className="stat-item"><Compass size={24} /> Privacy Focused</div>
            </div>
          </div>
          <div className="intro-image-wrapper">
            <img src="/image copy 2.png" alt="Introduction" className="intro-image" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive guidance for your home, work and personal journey.</p>
          </div>
          <div className="services-grid">
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Consultation Process</h2>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Understand</h3>
              <p>Understand the client's requirement.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Analyze</h3>
              <p>Review the relevant information and consultation requirements.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Guide</h3>
              <p>Provide clear, personalized guidance.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Follow Up</h3>
              <p>Provide relevant recommendations and next steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container faq-container">
          <div className="section-header center">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;