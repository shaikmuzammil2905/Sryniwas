import React from 'react';
import { Sparkles, Shield, Clock, Search, Video, User, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WhyUs = () => {
  return (
    <div className="page-wrapper">
      <div className="why-us-hero">
        <motion.div 
          className="container text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="why-us-hero-title">Why Choose The Vastu Guru?</h1>
          <p className="why-us-hero-desc">Discover what makes our approach to Vastu and Numerology unique, professional, and effective.</p>
        </motion.div>
      </div>

      <div className="container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <motion.div 
          className="why-us-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} className="why-us-card" variants={itemVariants}>
                <div className="why-us-card-icon">
                  <Icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyUs;