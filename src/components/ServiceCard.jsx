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
        <div className="service-card-image-wrapper">
          <img src={service.image} alt={service.title} className="service-card-image" />
          <div className="service-card-icon">
            <Icon size={24} />
          </div>
        </div>
        <div className="service-card-content">
          <h3 className="service-card-title">{service.title}</h3>
          <p className="service-card-desc">{service.shortDescription}</p>
          
          <div className="service-card-actions">
            <span className="btn-read-more">
              View Details <ArrowRight size={16} className="arrow-icon" />
            </span>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} title={service.title}>
        <div className="quick-view-content">
          <div className="quick-view-image-wrap">
            <img src={service.image} alt={service.title} className="quick-view-image" />
          </div>
          <div className="quick-view-text-content">
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
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full" style={{textAlign: 'center', flex: 1}}>
                CONSULT NOW ON WHATSAPP
              </a>
              <a href="tel:9912531255" className="btn btn-primary w-full" style={{textAlign: 'center', flex: 1}}>
                SCHEDULE CALL
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ServiceCard;