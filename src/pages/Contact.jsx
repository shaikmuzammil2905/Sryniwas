import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Modal from '../components/Modal';
import './Contact.css';

const Contact = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessModalOpen(true);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
  };

  return (
    <div className="page-wrapper">
      <div className="container contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-tagline">THE VASTU GURU - Vastu Expert<br/>Bringing Energy, Balance and Success Together</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon-wrap"><Phone size={24} /></div>
              <div>
                <h4>Call Us</h4>
                <p>9912531255</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><Phone size={24} /></div>
              <div>
                <h4>WhatsApp</h4>
                <p>9912553575</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <p>thevastuguru15@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>

      <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Message Sent">
        <div className="text-center" style={{textAlign: 'center', padding: '20px 0'}}>
          <h3 style={{marginBottom: '16px', color: 'var(--color-whatsapp)'}}>Success!</h3>
          <p>Thank you for contacting The Vastu Guru. We have received your message and will get back to you shortly.</p>
          <button className="btn btn-primary" onClick={() => setSuccessModalOpen(false)} style={{marginTop: '24px'}}>Close</button>
        </div>
      </Modal>
    </div>
  );
};
export default Contact;