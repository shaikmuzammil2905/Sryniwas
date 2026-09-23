const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const files = {
  'App.jsx': `
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
          </Routes>
        </main>
        <Footer />
        <MobileActionBar />
      </div>
    </Router>
  );
};

export default App;
`,
  'components/Header.jsx': `
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MessageCircle, Calendar } from 'lucide-react';
import { servicesData } from '../data/services';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location]);

  return (
    <header className={\`header \${isScrolled ? 'scrolled' : ''}\`}>
      <div className="container header-container">
        <Link to="/" className="logo-link">
          <img src="/image copy 2.png" alt="The Vastu Guru" className="header-logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={\`nav-link \${location.pathname === '/' ? 'active' : ''}\`}>Home</Link>
          <Link to="/about" className={\`nav-link \${location.pathname === '/about' ? 'active' : ''}\`}>About</Link>
          
          <div className="nav-dropdown" 
               onMouseEnter={() => setServicesDropdownOpen(true)}
               onMouseLeave={() => setServicesDropdownOpen(false)}>
            <Link to="/services" className={\`nav-link \${location.pathname.includes('/services') ? 'active' : ''}\`}>
              Services <ChevronDown size={16} />
            </Link>
            {servicesDropdownOpen && (
              <div className="dropdown-menu animate-fade-up">
                {servicesData.map(service => (
                  <Link key={service.id} to={\`/services/\${service.id}\`} className="dropdown-item">
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link to="/why-us" className={\`nav-link \${location.pathname === '/why-us' ? 'active' : ''}\`}>Why Us</Link>
          <Link to="/contact" className={\`nav-link \${location.pathname === '/contact' ? 'active' : ''}\`}>Contact</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions desktop-only">
          <a href="tel:9912531255" className="action-icon" title="Call Now"><Phone size={20} /></a>
          <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="action-icon whatsapp" title="WhatsApp"><MessageCircle size={20} /></a>
          <Link to="/book-consultation" className="btn btn-primary">Book Consultation</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={\`mobile-menu \${mobileMenuOpen ? 'open' : ''}\`}>
        <div className="mobile-menu-inner">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/about" className="mobile-link">About</Link>
          
          <div className="mobile-dropdown-group">
            <div className="mobile-link" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
              Services <ChevronDown size={18} className={servicesDropdownOpen ? 'rotate' : ''} />
            </div>
            {servicesDropdownOpen && (
              <div className="mobile-dropdown-items">
                {servicesData.map(service => (
                  <Link key={service.id} to={\`/services/\${service.id}\`} className="mobile-dropdown-item">
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link to="/why-us" className="mobile-link">Why Us</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
          <Link to="/book-consultation" className="mobile-link btn-mobile-book">
            <Calendar size={18} /> Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
`,
  'components/Footer.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { servicesData } from '../data/services';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">THE VASTU GURU</h2>
            <p className="footer-title">Vastu Expert</p>
            <p className="footer-tagline">Bringing Energy, Balance and Success Together</p>
            
            <div className="footer-contact-info">
              <a href="tel:9912531255" className="contact-line">
                <Phone size={16} /> 9912531255
              </a>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="contact-line">
                <Phone size={16} /> 9912553575 (WhatsApp)
              </a>
              <a href="mailto:thevastuguru15@gmail.com" className="contact-line">
                <Mail size={16} /> thevastuguru15@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/why-us">Why Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book-consultation">Book Consultation</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              {servicesData.map(service => (
                <li key={service.id}>
                  <Link to={\`/services/\${service.id}\`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            “Our consultations are intended for guidance and informational purposes. They should not be considered a substitute for professional medical, legal, financial, architectural or engineering advice.”
          </p>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} The Vastu Guru. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
`,
  'pages/Home.jsx': `
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
              <div key={idx} className={\`faq-item \${openFaq === idx ? 'open' : ''}\`} onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
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
  animation: heroPulse 10s infinite alternate ease-in-out;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero-bg-anim {
    background-image: url('/image copy 4.png');
    background-position: top center;
    background-attachment: scroll;
  }
}

@keyframes heroPulse {
  0% { transform: scale(1); filter: brightness(1); }
  100% { transform: scale(1.05); filter: brightness(1.1); }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(59, 29, 82, 0.95) 0%, rgba(59, 29, 82, 0.6) 100%);
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
  font-size: 64px;
  color: white;
  margin-bottom: 16px;
  line-height: 1.1;
}
.hero-tagline {
  font-size: 28px;
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
.hero-services {
  font-size: 15px;
  color: var(--color-secondary);
  opacity: 0.8;
  margin-bottom: 40px;
  line-height: 1.8;
}
.hero-services span {
  font-weight: 500;
  color: white;
}
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Animations */
.animate-fade-down {
  animation: fadeDown 1s ease-out forwards;
}
.stagger-1 { animation-delay: 0.2s; opacity: 0; }
.stagger-2 { animation-delay: 0.4s; opacity: 0; }
.stagger-3 { animation-delay: 0.6s; opacity: 0; }
.stagger-4 { animation-delay: 0.8s; opacity: 0; }

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
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
  font-size: 36px;
  margin-bottom: 24px;
}
.intro-text p {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
  line-height: 1.8;
}
.intro-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding: 40px;
  border-radius: 16px;
  text-align: center;
}
.intro-image {
  max-width: 100%;
  height: auto;
}

/* Services */
.services-section {
  padding: 80px 0;
  background-color: var(--color-bg-secondary);
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

/* Process Section */
.process-section {
  padding: 80px 0;
  background-color: white;
}
.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  position: relative;
}
.process-step {
  text-align: center;
  padding: 24px;
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
  transition: max-height 0.3s ease-out, padding 0.3s ease;
  background-color: var(--color-bg-main);
}
.faq-item.open .faq-answer {
  max-height: 300px;
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

@media (min-width: 992px) {
  .intro-container {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}
@media (max-width: 768px) {
  .hero-title { font-size: 44px; }
  .intro-stats { grid-template-columns: 1fr; }
}
`,
  'pages/WhyUs.jsx': `
import React from 'react';
import { Sparkles, Shield, Clock, Search, Video, User, Lock, CheckCircle } from 'lucide-react';
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

const WhyUs = () => {
  return (
    <div className="page-wrapper">
      <div className="why-us-hero">
        <div className="container text-center">
          <h1 className="why-us-hero-title">Why Choose The Vastu Guru?</h1>
          <p className="why-us-hero-desc">Discover what makes our approach to Vastu and Numerology unique, professional, and effective.</p>
        </div>
      </div>

      <div className="container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="why-us-cards-grid">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="why-us-card animate-fade-up" style={{animationDelay: \`\${idx * 0.1}s\`}}>
                <div className="why-us-card-icon">
                  <Icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
`,
  'pages/WhyUs.css': `
.why-us-hero {
  background-color: var(--color-primary);
  color: white;
  padding: 100px 24px;
  text-align: center;
}
.why-us-hero-title {
  font-size: 48px;
  color: white;
  margin-bottom: 16px;
}
.why-us-hero-desc {
  font-size: 20px;
  color: var(--color-secondary);
  max-width: 600px;
  margin: 0 auto;
}
.why-us-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}
.why-us-card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  opacity: 0;
}
.why-us-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-secondary);
}
.why-us-card-icon {
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
.why-us-card:hover .why-us-card-icon {
  background-color: var(--color-primary);
  color: white;
  transform: scale(1.1);
}
.why-us-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.why-us-card p {
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.6;
}
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, relativePath);
  fs.writeFileSync(fullPath, content.trim());
}

console.log("Upgraded pages created successfully.");
