import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Eye, Compass, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-anim"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-badge" variants={fadeInUp}>VASTU EXPERT</motion.span>
            <motion.h1 className="hero-title" variants={fadeInUp}>THE VASTU GURU</motion.h1>
            <motion.p className="hero-tagline" variants={fadeInUp}>Bringing Energy, Balance and Success Together</motion.p>
            <motion.p className="hero-desc" variants={fadeInUp}>
              Personalized guidance in Vastu, Numerology and related consultation services.
            </motion.p>
            
            <motion.div className="hero-services" variants={fadeInUp}>
              Vastu • Numerology • Mobile Numerology<br/>
              Name Correction • Aura Analysis
            </motion.div>

            <motion.div className="hero-actions" variants={fadeInUp}>
              <Link to="/book-consultation" className="btn btn-gold w-mobile-full">Book Consultation</Link>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-mobile-full">WhatsApp Now</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container intro-container">
          <motion.div 
            className="intro-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp}>A Balanced Approach to Your Space and Numbers</motion.h2>
            <motion.p variants={fadeInUp}>
              The Vastu Guru provides personalized consultation services across Vastu, Numerology, Mobile Numerology, Name Correction and Aura Analysis.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Our approach focuses on clear, easy-to-understand guidance based on each client's requirements, with attention to practical recommendations and individual consultation.
            </motion.p>
            <motion.div className="intro-stats" variants={staggerContainer}>
              <motion.div className="stat-item" variants={fadeInUp}><HeartHandshake size={24} /> Personalized Guidance</motion.div>
              <motion.div className="stat-item" variants={fadeInUp}><Eye size={24} /> Individual Attention</motion.div>
              <motion.div className="stat-item" variants={fadeInUp}><Search size={24} /> Online Consultation</motion.div>
              <motion.div className="stat-item" variants={fadeInUp}><Compass size={24} /> Privacy Focused</motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="intro-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/image copy 2.png" alt="Introduction" className="intro-image" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div 
            className="section-header center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={fadeInUp}>OUR SERVICES</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>Comprehensive Vastu & Numerology Solutions</motion.p>
            <motion.p className="section-desc" variants={fadeInUp} style={{maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)'}}>
              Personalized guidance designed to bring clarity, balance and positive direction to your home, work and personal journey.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consultation Process Section */}
      <section className="process-section">
        <div className="container">
          <motion.div 
            className="section-header center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Consultation Process</h2>
          </motion.div>
          <motion.div 
            className="process-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { num: '01', title: 'Understand', desc: "Understand the client's requirement." },
              { num: '02', title: 'Analyze', desc: "Review the relevant information and consultation requirements." },
              { num: '03', title: 'Guide', desc: "Provide clear, personalized guidance." },
              { num: '04', title: 'Follow Up', desc: "Provide relevant recommendations and next steps." }
            ].map((step, i) => (
              <motion.div key={i} className="process-step" variants={fadeInUp}>
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container faq-container">
          <motion.div 
            className="section-header center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div 
            className="faq-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className={`faq-item ${openFaq === idx ? 'open' : ''}`} 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                variants={fadeInUp}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;