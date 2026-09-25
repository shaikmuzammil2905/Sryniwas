import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import './Contact.css';

const faqs = [
  { question: "What do I need to prepare before a consultation?", answer: "We require a scaled floor plan of your property and the birth dates/times of key family members or business partners for accurate numerology alignment." },
  { question: "Do you offer online consultations?", answer: "Yes, we offer comprehensive online consultations globally via video call, providing the same level of detail as an in-person visit." },
  { question: "Will I need to make structural changes?", answer: "In 95% of cases, we use micro-Vastu remedies (color therapy, crystals, mirrors, metals) that do not require breaking walls or major demolition." },
  { question: "How long does a consultation take?", answer: "An initial analysis session usually takes 60 to 90 minutes, during which we discuss findings and recommend a detailed action plan." }
];

const Contact = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', propertyType: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessModalOpen(true);
    setFormData({ name: '', phone: '', email: '', propertyType: '', message: '' });
  };

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="page-wrapper contact-page">
      {/* SECTION 1: Intro */}
      <section className="contact-hero text-center animate-fade-in">
        <div className="container">
          <h1 className="contact-title">Let's Discuss Your Space</h1>
          <p className="contact-tagline">Ready to bring energy, balance, and success into your life? Reach out to schedule a session.</p>
        </div>
      </section>

      {/* SECTION 2 & 3: Quick Cards & Form */}
      <section className="contact-main">
        <div className="container contact-grid">
          <div className="contact-cards-column animate-fade-up">
            <h2 className="section-heading mb-4">Get in Touch</h2>
            <div className="quick-cards">
              <a href="tel:9912531255" className="quick-card">
                <div className="quick-card-icon"><Phone size={28} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>9912531255</p>
                </div>
              </a>
              <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="quick-card whatsapp-card">
                <div className="quick-card-icon"><MessageCircle size={28} /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>9912553575</p>
                </div>
              </a>
              <a href="mailto:thevastuguru15@gmail.com" className="quick-card">
                <div className="quick-card-icon"><Mail size={28} /></div>
                <div>
                  <h4>Email</h4>
                  <p>thevastuguru15@gmail.com</p>
                </div>
              </a>
            </div>
            
            <div className="contact-image-wrap mt-5">
              <img src="/images/contact_intro.jpg" alt="Contact Us" className="contact-feature-img" />
            </div>
          </div>

          <div className="contact-form-column animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="contact-form-wrapper">
              <h2>Send an Inquiry</h2>
              <p className="mb-4 text-muted">Fill out the form below and we will get back to you to schedule an initial discussion.</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="form-select">
                    <option value="">Select Property Type</option>
                    <option value="residential">Residential (Home/Apartment)</option>
                    <option value="commercial">Commercial (Office/Shop)</option>
                    <option value="industrial">Industrial (Factory)</option>
                    <option value="plot">Empty Plot / Land</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>How can we help you? *</label>
                  <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} placeholder="Describe your concerns or goals..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full btn-lg">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How Consultation Works */}
      <section className="how-it-works bg-secondary">
        <div className="container text-center">
          <h2 className="section-heading">How The Consultation Works</h2>
          <div className="steps-grid">
            <div className="step-box animate-fade-up" style={{animationDelay: '0.1s'}}>
              <div className="step-icon">1</div>
              <h4>Send Inquiry</h4>
              <p>Contact us via WhatsApp, call, or form.</p>
            </div>
            <div className="step-box animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="step-icon">2</div>
              <h4>Share Details</h4>
              <p>Provide your floor plan and birth details.</p>
            </div>
            <div className="step-box animate-fade-up" style={{animationDelay: '0.3s'}}>
              <div className="step-icon">3</div>
              <h4>Analysis</h4>
              <p>We perform a deep Vastu and Numerology audit.</p>
            </div>
            <div className="step-box animate-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="step-icon">4</div>
              <h4>Remedies</h4>
              <p>Receive practical, non-destructive solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-heading text-center mb-5">Common Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} onClick={() => toggleFaq(idx)}>
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  {openFaq === idx ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA */}
      <section className="contact-cta text-center bg-primary text-light">
        <div className="container">
          <h2 className="section-heading text-light">Ready to Understand Your Space?</h2>
          <p className="mb-4">Take the first step towards a harmonious, balanced, and prosperous life.</p>
          <div className="cta-buttons">
            <a href="tel:9912531255" className="btn btn-outline-light">Call Now</a>
            <a href="https://wa.me/9912553575" target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Message Sent">
        <div className="text-center" style={{textAlign: 'center', padding: '20px 0'}}>
          <h3 style={{marginBottom: '16px', color: 'var(--color-whatsapp)'}}>Success!</h3>
          <p>Thank you for contacting The Vastu Guru. We have received your inquiry and will be in touch shortly.</p>
          <button className="btn btn-primary" onClick={() => setSuccessModalOpen(false)} style={{marginTop: '24px'}}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;