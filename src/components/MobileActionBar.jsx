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