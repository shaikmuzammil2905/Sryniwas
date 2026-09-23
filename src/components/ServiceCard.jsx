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
          <Link to={`/services/${service.id}`} className="btn-read-more">
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