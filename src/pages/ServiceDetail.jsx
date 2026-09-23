import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) {
      navigate('/services');
    }
  }, [id, service, navigate]);

  if (!service) return null;

  return (
    <div className="page-wrapper">
      <div className="service-hero">
        <div className="container">
          <h1 className="service-hero-title">{service.title}</h1>
        </div>
      </div>
      
      <div className="container service-content-container">
        <div className="service-main-content">
          <h2 className="service-section-title">Overview</h2>
          <p className="service-text">{service.fullDescription}</p>
          
          <h2 className="service-section-title mt-8">What is Included</h2>
          <ul className="service-list">
            {service.includes.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h2 className="service-section-title mt-8">Suitable For</h2>
          <ul className="service-list">
            {service.suitableFor.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h2 className="service-section-title mt-8">Benefits</h2>
          <ul className="service-list">
            {service.benefits.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        
        <div className="service-sidebar">
          <div className="sidebar-card">
            <h3>Ready for Guidance?</h3>
            <p>Book a consultation to get personalized advice from The Vastu Guru.</p>
            <div className="sidebar-actions">
              <Link to="/book-consultation" className="btn btn-primary w-full">Book Consultation</Link>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full">WhatsApp Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetail;