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
              <div key={idx} className="why-us-card animate-fade-up" style={{animationDelay: `${idx * 0.1}s`}}>
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