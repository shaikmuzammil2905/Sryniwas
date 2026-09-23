import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
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
              <li><Link to="/#why-us">Why Us</Link></li>
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
                  <Link to={`/services/${service.id}`}>{service.title}</Link>
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
