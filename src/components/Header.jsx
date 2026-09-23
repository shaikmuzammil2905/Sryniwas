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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo-link">
          <img src="/image copy 2.png" alt="The Vastu Guru" className="header-logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          
          <div className="nav-dropdown" 
               onMouseEnter={() => setServicesDropdownOpen(true)}
               onMouseLeave={() => setServicesDropdownOpen(false)}>
            <Link to="/services" className={`nav-link ${location.pathname.includes('/services') ? 'active' : ''}`}>
              Services <ChevronDown size={16} />
            </Link>
            {servicesDropdownOpen && (
              <div className="dropdown-menu animate-fade-up">
                {servicesData.map(service => (
                  <Link key={service.id} to={`/services/${service.id}`} className="dropdown-item">
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link to="/why-us" className={`nav-link ${location.pathname === '/why-us' ? 'active' : ''}`}>Why Us</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
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
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
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
                  <Link key={service.id} to={`/services/${service.id}`} className="mobile-dropdown-item">
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