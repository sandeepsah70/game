import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="blr-contact-section">
      <div className="blr-container">
        <div className="section-header-center">
          <span className="section-eyebrow">GET IN TOUCH</span>
          <h2 className="section-title">
            Visit Our Bengaluru Hub or <span className="highlight-yellow">Request an Audit</span>
          </h2>
          <p className="section-subtitle">
            Our central control dispatch room in Kasturinagar operates 24 hours a day, 365 days a year.
          </p>
        </div>

        <div className="contact-grid-main">
          {/* Left Details */}
          <div className="contact-info-cards">
            <div className="contact-card-box">
              <div className="c-icon-circle">
                <MapPin size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>Registered Head Office</h4>
                <p>
                  #79, 1st Floor, B. Channasandra Bus Stop,<br />
                  Kasturinagar, Bengaluru, Karnataka – 560043
                </p>
                <a
                  href="https://maps.google.com/?q=Kasturinagar+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="link-map-dir"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="c-icon-circle">
                <Phone size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>24/7 Operations Helpline</h4>
                <p>
                  <a href="tel:+919916388000" className="phone-bold">+91 99163 88000</a><br />
                  <a href="tel:+919916827658" className="phone-sub">+91 99168 27658</a>
                </p>
                <small>Round-the-clock emergency support & relief guard dispatch</small>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="c-icon-circle">
                <Mail size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>Official Correspondence</h4>
                <p>
                  <a href="mailto:support@blrsquad.com" className="email-link">support@blrsquad.com</a>
                </p>
                <small>Send tender documents, RFP proposals & corporate requisitions</small>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="c-icon-circle">
                <Clock size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>Hours of Operation</h4>
                <p>
                  <strong>Control Room:</strong> 24 Hours / 7 Days<br />
                  <strong>Administrative Office:</strong> Mon - Sat (9:00 AM - 7:00 PM)
                </p>
              </div>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="contact-form-container">
            {sent ? (
              <div className="contact-sent-success">
                <CheckCircle2 size={48} className="text-success-green" />
                <h3>Message Received!</h3>
                <p>Thank you, {formData.name}. Our Bangalore team will get in touch with you shortly.</p>
                <button className="btn-send-another" onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-direct-form">
                <h3>Direct Inquiry Form</h3>
                <p>Have questions about billing, deployment timelines or guard training? Write to us.</p>

                <div className="field-block">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Murthy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="field-row-two">
                  <div className="field-block">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9916388000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="field-block">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field-block">
                  <label>Your Requirement / Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your property, guard requirement or location in Bangalore..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-contact">
                  <Send size={16} />
                  <span>Send Inquiry to Operations</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
