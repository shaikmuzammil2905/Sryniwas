import React, { useState } from 'react';
import { servicesData } from '../data/services';
import Modal from '../components/Modal';
import './Contact.css';

const BookConsultation = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', whatsapp: '', email: '', service: '', date: '', time: '', mode: 'Online', message: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessModalOpen(true);
    setFormData({name: '', phone: '', whatsapp: '', email: '', service: '', date: '', time: '', mode: 'Online', message: ''});
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{maxWidth: '800px', paddingTop: '60px', paddingBottom: '80px'}}>
        <div className="text-center" style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 className="section-title">Book a Consultation</h1>
          <p className="section-desc">Schedule your session with The Vastu Guru for personalized guidance.</p>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-row-2">
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Select Service *</label>
              <select name="service" required value={formData.service} onChange={handleChange}>
                <option value="">-- Choose a Service --</option>
                {servicesData.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Preferred Date *</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Preferred Time *</label>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Consultation Mode *</label>
              <select name="mode" required value={formData.mode} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            <div className="form-group">
              <label>Additional Message</label>
              <textarea name="message" rows="3" value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn btn-gold w-full" style={{fontSize: '18px', padding: '16px'}}>BOOK CONSULTATION</button>
          </form>
        </div>
      </div>

      <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Booking Confirmed">
        <div className="text-center" style={{textAlign: 'center', padding: '20px 0'}}>
          <h3 style={{marginBottom: '16px', color: 'var(--color-primary)'}}>Consultation Request Received</h3>
          <p>Thank you for contacting The Vastu Guru. Your consultation request has been received. Our team will contact you shortly to confirm the appointment.</p>
          <button className="btn btn-primary" onClick={() => setSuccessModalOpen(false)} style={{marginTop: '24px'}}>Done</button>
        </div>
      </Modal>
    </div>
  );
};
export default BookConsultation;