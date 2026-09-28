import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './MobileActionBar.css';

const MobileActionBar = () => {
  const { t } = useLanguage();

  return (
    <div className="mobile-action-bar">
      <a href="tel:9912531255" className="action-btn call-btn">
        <Phone size={20} />
        <span>{t('call')}</span>
      </a>
      <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="action-btn whatsapp-btn">
        <MessageCircle size={20} />
        <span>{t('whatsapp')}</span>
      </a>
      <Link to="/book-consultation" className="action-btn book-btn">
        <Calendar size={20} />
        <span>{t('bookNow')}</span>
      </Link>
    </div>
  );
};
export default MobileActionBar;