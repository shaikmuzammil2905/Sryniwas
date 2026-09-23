import React from 'react';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  return (
    <div className="page-wrapper">
      <div className="container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="section-header center">
          <h1 className="section-title">ALL SERVICES</h1>
          <p className="section-subtitle">Comprehensive Guidance for Life and Property</p>
        </div>
        <div className="services-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px'}}>
          {servicesData.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Services;