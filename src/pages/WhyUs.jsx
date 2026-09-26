import React from 'react';
import { Sparkles, Shield, Clock, Search, Video, User, Lock, CheckCircle, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './WhyUs.css';

const reasons = [
  { icon: Sparkles, title: "Traditional Knowledge + Practical Guidance", desc: "We bridge ancient Vedic principles with modern living, ensuring remedies are practical for today's lifestyle." },
  { icon: User, title: "Personalized Analysis", desc: "Every chart and floor plan is unique. We provide guidance tailored specifically to your individual energy." },
  { icon: Target, title: "Space-Specific Recommendations", desc: "No generic advice. We analyze each direction, room, and element within your specific property layout." },
  { icon: Search, title: "Residential + Commercial Mastery", desc: "From small apartments to large corporate offices, we understand the distinct energetic needs of different spaces." },
  { icon: CheckCircle, title: "Practical Remedies", desc: "We focus on realistic, micro-Vastu remedies like color therapy and crystals that don't require structural demolition." },
  { icon: Clock, title: "Clear Consultation Process", desc: "Our methodology is transparent, structured, and designed to give you clarity from the very first session." },
  { icon: Shield, title: "Client-Centered Approach", desc: "Your goals—whether financial, health-related, or peace of mind—are the foundation of our consultation." },
  { icon: Lock, title: "Long-Term Space Harmony", desc: "We aim for sustainable results, providing guidance that supports you both now and in the future." }
];

const consultationReasons = [
  "New home planning or construction",
  "Experiencing unexplained financial stagnation",
  "Health or well-being concerns at home",
  "Planning a new office or commercial space",
  "Selecting the right property or plot",
  "Resolving existing Vastu doshas",
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
    <div className="page-wrapper why-us-page">
      {/* INTRO */}
      <section className="why-us-hero">
        <div className="container about-grid">
          <motion.div 
            className="why-us-hero-text animate-fade-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="why-us-hero-title">Why Choose The Vastu Guru?</h1>
            <p className="why-us-hero-desc">
              We provide more than just advice; we provide a pathway to harmony. Discover what makes our approach to Vastu and Numerology unique, professional, and deeply effective.
            </p>
          </motion.div>
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/why_us_intro.jpg" alt="Why Choose Us" className="about-feature-img" />
          </motion.div>
        </div>
      </section>

      {/* CORE BLOCKS */}
      <section className="why-us-blocks bg-secondary">
        <div className="container">
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
      </section>

      {/* WHY CLIENTS CONSULT US */}
      <section className="consultation-reasons">
        <div className="container text-center">
          <h2 className="section-heading">Why Clients Consult Us</h2>
          <p className="section-subtext">Common scenarios where our expertise provides clarity.</p>
          <div className="reasons-list-container">
            <ul className="reasons-list">
              {consultationReasons.map((reason, idx) => (
                <li key={idx} className="animate-fade-up" style={{animationDelay: `${idx * 0.1}s`}}>
                  <ArrowRight className="reason-arrow" /> {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OUR CONSULTATION PROCESS */}
      <section className="consultation-process bg-secondary">
        <div className="container">
          <h2 className="section-heading text-center">Our Consultation Process</h2>
          <div className="timeline">
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">01</span>
                <h3>Consultation Inquiry</h3>
                <p>Reach out via WhatsApp or our booking form to initiate contact.</p>
              </div>
            </div>
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">02</span>
                <h3>Information Gathering</h3>
                <p>We collect your floor plans, birth details, and specific concerns.</p>
              </div>
            </div>
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">03</span>
                <h3>Vastu Analysis</h3>
                <p>Detailed checking of directional zones and elemental balances.</p>
              </div>
            </div>
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">04</span>
                <h3>Findings & Discussion</h3>
                <p>A comprehensive session explaining the root cause of imbalances.</p>
              </div>
            </div>
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">05</span>
                <h3>Recommendations</h3>
                <p>A tailored plan of practical, non-destructive remedies.</p>
              </div>
            </div>
            <div className="timeline-item animate-fade-up">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="step-num">06</span>
                <h3>Implementation Guidance</h3>
                <p>Follow-up support to ensure remedies are placed correctly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="why-us-cta bg-primary text-light text-center">
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Book a session with The Vastu Guru today and step into a harmonious future.</p>
          <a href="/contact" className="btn btn-secondary mt-4">Consult Now</a>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;