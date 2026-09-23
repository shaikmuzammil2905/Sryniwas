const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const files = {
  'data/services.js': `
export const servicesData = [
  {
    id: 'vastu-consultation',
    title: 'Vastu Consultation (Residential & Commercial)',
    shortDescription: 'Harmonizing energy flow in living and workspaces according to traditional Vedic principles.',
    fullDescription: 'Comprehensive analysis of directions, entrance, rooms and other important spaces with suitable recommendations based on traditional Vastu principles.',
    includes: [
      'Floor plan and structural analysis',
      'Energy-balancing recommendations without structural demolition',
      'Main entrance and kitchen alignment guidance',
      'Wealth and health zone analysis',
      'Room-wise Vastu observations',
      'Practical recommendations based on the property'
    ],
    suitableFor: [
      'New home buyers',
      'Existing homeowners experiencing concerns with their space',
      'Office owners',
      'Commercial builders'
    ],
    benefits: ['Enhanced prosperity', 'Better health', 'Harmonious relationships'],
    icon: 'Home',
    ctaText: 'BOOK VASTU AUDIT'
  },
  {
    id: 'numerology',
    title: 'Numerology Consultation',
    shortDescription: 'Explore numerical patterns associated with your name and date of birth for personalized guidance and self-understanding.',
    fullDescription: 'Detailed calculation of your core numbers, life path, and destiny numbers to provide actionable guidance for personal and professional growth.',
    includes: [
      'Core Numbers Analysis',
      'Life Path Number',
      'Destiny Number',
      'Soul Urge Number',
      'Career and business compatibility',
      'Relationship / marriage compatibility',
      'Personal Year analysis and forecasting'
    ],
    suitableFor: [
      'Individuals seeking direction',
      'Career planning',
      'Personal growth'
    ],
    benefits: ['Personalized Life Path & Destiny Report'],
    icon: 'Hash',
    ctaText: 'GET NUMEROLOGY CONSULTATION'
  },
  {
    id: 'mobile-numerology',
    title: 'Mobile Numerology',
    shortDescription: 'Analysis of mobile number patterns from a Numerology perspective for personal, professional and business use.',
    fullDescription: 'Evaluation of your current mobile number or guidance in selecting a new one to attract better opportunities for personal or business use.',
    includes: [
      'Current mobile number analysis',
      'Compound number calculation',
      'Number pattern interpretation',
      'Missing-number analysis',
      'Number selection guidance',
      'Identification of traditionally considered challenging combinations'
    ],
    suitableFor: [
      'Professionals',
      'Entrepreneurs',
      'Sales executives',
      'Business owners',
      'Traders'
    ],
    benefits: ['Improved professional connections', 'Better business growth', 'Positive communication'],
    icon: 'Smartphone',
    ctaText: 'CHECK MY MOBILE NUMBER'
  },
  {
    id: 'name-correction',
    title: 'Name Correction & Alignment',
    shortDescription: 'Numerological analysis of personal, business and brand names with suggestions based on traditional numerology systems.',
    fullDescription: 'Detailed evaluation of your name vibrations and suitable name-correction suggestions to align with your birth date for enhanced luck and success.',
    includes: [
      'First-name analysis',
      'Full-name analysis',
      'Spelling variation analysis',
      'Chaldean system analysis',
      'Pythagorean system analysis',
      'Signature guidance',
      'Company and brand name analysis'
    ],
    suitableFor: [
      'Individuals seeking a name review',
      'Newborn naming considerations',
      'Entrepreneurs',
      'Newly launched startups',
      'Personal and professional branding'
    ],
    benefits: ['Attract better opportunities', 'Brand success', 'Removal of energetic blockages'],
    icon: 'Type',
    ctaText: 'ANALYZE MY NAME'
  },
  {
    id: 'aura-analysis',
    title: 'Aura Analysis & Energy Cleansing',
    shortDescription: 'An aura-focused consultation intended to explore perceived energy patterns, emotional wellbeing and spiritual wellness.',
    fullDescription: 'A comprehensive scan of your energy field followed by an interpretation and general guidance to help balance your chakras and overall aura.',
    includes: [
      'Aura scan / analysis',
      'Chakra-focused observations',
      'Discussion of perceived energy patterns',
      'Traditional crystal guidance',
      'Sound-based wellness suggestions',
      'Space-clearing suggestions'
    ],
    suitableFor: [
      'People interested in spiritual wellness',
      'Those experiencing stress or mental fatigue',
      'People seeking personal reflection',
      'Wellness-focused consultations'
    ],
    benefits: ['Identify energy blockages', 'Stress relief guidance', 'Spiritual balance'],
    icon: 'Sun',
    ctaText: 'BOOK AURA CONSULTATION'
  },
  {
    id: 'vastu-remedies',
    title: 'Vastu Remedies',
    shortDescription: 'Traditional Vastu-based recommendations for addressing identified concerns within a property.',
    fullDescription: 'Specific, actionable remedies to correct Vastu doshas (flaws) without requiring major structural demolition.',
    includes: [
      'Space-specific recommendations',
      'Direction-based guidance',
      'Traditional remedy suggestions',
      'Practical implementation guidance'
    ],
    suitableFor: [
      'Existing homeowners',
      'Tenants',
      'Properties with structural constraints'
    ],
    benefits: ['Neutralize negative energy', 'Cost-effective corrections', 'Promote peace'],
    icon: 'ShieldCheck',
    ctaText: 'EXPLORE VASTU REMEDIES'
  },
  {
    id: 'gemstone-bracelet-guidance',
    title: 'Gemstone & Bracelet Guidance',
    shortDescription: 'Guidance regarding gemstones, Rudraksha, Zodiac Bracelets, Chakra Bracelets and related spiritual products.',
    fullDescription: 'Personalized recommendations for spiritual products to support your energy, astrological chart, and personal goals.',
    includes: [
      'Gemstone guidance',
      'Rudraksha guidance',
      'Zodiac Bracelet guidance',
      'Chakra Bracelet guidance',
      'Traditional usage information'
    ],
    suitableFor: [
      'Individuals seeking specific energy support',
      'Astrology enthusiasts'
    ],
    benefits: ['Enhanced personal energy', 'Astrological balance', 'Spiritual protection'],
    icon: 'Gem',
    ctaText: 'EXPLORE GUIDANCE'
  }
];
`,
  'components/ServiceCard.jsx': `
import React, { useState } from 'react';
import { ArrowRight, Home, Hash, Smartphone, Type, Sun, ShieldCheck, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import './ServiceCard.css';

const iconMap = { Home, Hash, Smartphone, Type, Sun, ShieldCheck, Gem };

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ServiceCard = ({ service }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const Icon = iconMap[service.icon] || Home;

  return (
    <>
      <motion.div 
        className="service-card" 
        onClick={() => setQuickViewOpen(true)}
        variants={itemVariants}
      >
        <div className="service-card-icon">
          <Icon size={32} />
        </div>
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-desc">{service.shortDescription}</p>
        
        <div className="service-card-actions">
          <span className="btn-read-more">
            View Details <ArrowRight size={16} className="arrow-icon" />
          </span>
        </div>
      </motion.div>

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
          
          <div className="quick-view-section">
            <h4>Ideal For:</h4>
            <ul>
              {service.suitableFor.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          
          <div className="quick-view-buttons">
            <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full" style={{textAlign: 'center'}}>
              CONSULT NOW ON WHATSAPP
            </a>
            <a href="tel:9912531255" className="btn btn-primary w-full" style={{textAlign: 'center'}}>
              SCHEDULE CALL
            </a>
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
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md), 0 0 20px rgba(82, 42, 115, 0.1);
  border-color: var(--color-secondary);
  background: linear-gradient(to bottom, #ffffff, #faf8fd);
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
  transform: scale(1.05);
}
.service-card-title {
  font-size: 20px;
  margin-bottom: 12px;
  line-height: 1.3;
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
  justify-content: flex-start;
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}
.btn-read-more {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  transition: all var(--transition-fast);
}
.arrow-icon {
  transition: transform var(--transition-fast);
}
.service-card:hover .btn-read-more {
  color: var(--color-accent);
}
.service-card:hover .arrow-icon {
  transform: translateX(4px);
}
.quick-view-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.quick-view-icon-wrap {
  text-align: center;
  padding: 10px 0;
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
  margin-bottom: 6px;
  font-size: 15px;
}
.quick-view-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
@media (min-width: 768px) {
  .quick-view-buttons {
    flex-direction: row;
  }
}
`,
  'components/Modal.jsx': `
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const isMobile = window.innerWidth <= 768;

  const drawerVariants = {
    hidden: { y: isMobile ? "100%" : 20, opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0, duration: 0.4 } },
    exit: { y: isMobile ? "100%" : 20, opacity: 0, scale: isMobile ? 1 : 0.95, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
              <button className="modal-close" onClick={onClose} aria-label="Close modal"><X size={24} /></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}
.modal-content {
  position: relative;
  background-color: var(--color-bg-main);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
}
.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 2;
}
.modal-title {
  margin: 0;
  font-size: 22px;
  color: var(--color-primary);
}
.modal-close {
  color: var(--color-text-muted);
  background: var(--color-bg-secondary);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.modal-close:hover {
  color: var(--color-text-dark);
  background: var(--color-border);
}
.modal-body {
  padding: 24px;
  overflow-y: auto;
  padding-bottom: 40px; /* Safe area for scrolling */
}

@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-end; /* Align drawer to bottom on mobile */
  }
  .modal-content {
    max-height: 85vh;
    border-radius: 20px 20px 0 0; /* Only top corners rounded */
    margin: 0;
    max-width: 100%;
  }
}
`,
  'pages/Home.jsx': `
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
                className={\`faq-item \${openFaq === idx ? 'open' : ''}\`} 
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
`,
  'pages/Home.css': `
/* Hero Section */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  color: white;
  overflow: hidden;
  padding: 100px 0 60px; /* Safe padding for header and bottom */
}
.hero-bg-anim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/image copy 3.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  animation: heroPulse 12s infinite alternate ease-in-out;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero {
    min-height: 100vh;
  }
  .hero-bg-anim {
    background-image: url('/image copy 4.png');
    background-position: top center;
    background-attachment: scroll;
    animation: heroPulseMobile 15s infinite alternate ease-in-out;
  }
}

@keyframes heroPulse {
  0% { transform: scale(1); filter: brightness(1); }
  100% { transform: scale(1.05); filter: brightness(1.1); }
}

@keyframes heroPulseMobile {
  0% { transform: scale(1) translateY(0); filter: brightness(1); }
  100% { transform: scale(1.05) translateY(-2%); filter: brightness(1.1); }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgba(59, 29, 82, 0.95) 0%, rgba(59, 29, 82, 0.4) 100%);
  z-index: 2;
}
.hero-container {
  position: relative;
  z-index: 10;
}
.hero-content {
  max-width: 800px;
}
.hero-badge {
  display: inline-block;
  padding: 6px 12px;
  background-color: rgba(212, 175, 55, 0.2);
  color: var(--color-accent);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 16px;
}
.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  color: white;
  margin-bottom: 16px;
  line-height: 1.1;
  font-weight: 700;
}
.hero-tagline {
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-family: var(--font-heading);
  font-style: italic;
  margin-bottom: 16px;
  color: var(--color-secondary);
  line-height: 1.3;
}
.hero-desc {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  opacity: 0.9;
  margin-bottom: 24px;
  line-height: 1.6;
  max-width: 600px;
}
.hero-services {
  font-size: 15px;
  color: white;
  opacity: 0.9;
  margin-bottom: 32px;
  line-height: 1.8;
  font-weight: 500;
}
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .w-mobile-full {
    width: 100%;
    text-align: center;
  }
  .hero-content {
    padding-bottom: 40px;
  }
}

/* Introduction Section */
.intro-section {
  padding: 80px 0;
  background-color: white;
}
.intro-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
}
.intro-text h2 {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  margin-bottom: 24px;
}
.intro-text p {
  font-size: 16px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
  line-height: 1.8;
  max-width: 700px;
}
.intro-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 32px;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--color-primary);
  background-color: var(--color-bg-secondary);
  padding: 16px;
  border-radius: 8px;
}
.intro-image-wrapper {
  background-color: var(--color-bg-secondary);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  overflow: hidden;
}
.intro-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

@media (min-width: 600px) {
  .intro-stats {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 992px) {
  .intro-container {
    grid-template-columns: 1.2fr 1fr;
    gap: 80px;
  }
  .intro-text p {
    font-size: 18px;
  }
}

/* Services */
.services-section {
  padding: 80px 0;
  background-color: var(--color-bg-secondary);
}
.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Process Section */
.process-section {
  padding: 80px 0;
  background-color: white;
}
.process-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  position: relative;
}
@media (min-width: 600px) {
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .process-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.process-step {
  text-align: center;
  padding: 32px 24px;
  background-color: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}
.process-step:hover {
  transform: translateY(-8px);
  border-color: var(--color-accent);
}
.step-number {
  font-size: 48px;
  font-family: var(--font-heading);
  color: var(--color-accent);
  opacity: 0.3;
  margin-bottom: 16px;
  font-weight: 700;
}
.process-step h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.process-step p {
  color: var(--color-text-muted);
  font-size: 15px;
}

/* FAQ Section */
.faq-section {
  padding: 80px 0;
  background-color: var(--color-bg-secondary);
}
.faq-container {
  max-width: 800px;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.faq-item {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all var(--transition-fast);
}
.faq-item.open {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
}
.faq-question h4 {
  margin: 0;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-text-dark);
}
.faq-question:hover h4 {
  color: var(--color-primary);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out, padding 0.4s ease;
  background-color: var(--color-bg-main);
}
.faq-item.open .faq-answer {
  max-height: 400px;
  padding: 0 24px 20px;
}
.faq-answer p {
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}
`,
  'pages/WhyUs.jsx': `
import React from 'react';
import { Sparkles, Shield, Clock, Search, Video, User, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './WhyUs.css';

const reasons = [
  { icon: Sparkles, title: "Personalized Consultation", desc: "Every space and person is unique. We provide guidance specifically tailored to your charts and floor plans." },
  { icon: Shield, title: "Professional Guidance", desc: "Years of experience in Vastu and Numerology ensure you receive accurate and trustworthy advice." },
  { icon: CheckCircle, title: "Easy-to-Understand Analysis", desc: "We translate complex principles into simple, actionable steps that anyone can follow." },
  { icon: Search, title: "Vastu & Numerology Services", desc: "A holistic approach combining the power of space harmony and number vibrations." },
  { icon: Video, title: "Online Consultation", desc: "Access our expertise from anywhere in the world through seamless online sessions." },
  { icon: User, title: "Individual Attention", desc: "We dedicate ample time to understand your specific challenges and goals." },
  { icon: Lock, title: "Client Privacy", desc: "Your personal details, floor plans, and consultations are kept strictly confidential." },
  { icon: Clock, title: "Practical Recommendations", desc: "We focus on realistic remedies that don't always require structural demolition." }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WhyUs = () => {
  return (
    <div className="page-wrapper">
      <div className="why-us-hero">
        <motion.div 
          className="container text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="why-us-hero-title">Why Choose The Vastu Guru?</h1>
          <p className="why-us-hero-desc">Discover what makes our approach to Vastu and Numerology unique, professional, and effective.</p>
        </motion.div>
      </div>

      <div className="container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <motion.div 
          className="why-us-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} className="why-us-card" variants={itemVariants}>
                <div className="why-us-card-icon">
                  <Icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyUs;
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, relativePath);
  fs.writeFileSync(fullPath, content.trim());
}

console.log("UX upgrade script completed successfully.");
