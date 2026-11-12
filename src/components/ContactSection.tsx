import React, { useState } from 'react'
import { MapPin, FileText, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'

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
            JTMS TECHS Manpower and Security Service central operations dispatch operates 24 hours a day, 365 days a year.
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
                  BCMC Layout, 4th Main, 8th Cross, Near Shani Mahatma Temple,<br />
                  Raghuvanhalli, Bangalore, Karnataka – 560062
                </p>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="c-icon-circle">
                <FileText size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>JTMS Company Brochure</h4>
                <p>
                  <a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer" className="phone-bold">
                    Download Official Brochure (PDF) →
                  </a>
                </p>
                <small>View complete company credentials, scope of work & service matrix</small>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="c-icon-circle">
                <Mail size={22} className="text-yellow" />
              </div>
              <div className="c-details">
                <h4>Official Correspondence</h4>
                <p>
                  <a href="mailto:info@jtmstech.in" className="email-link">info@jtmstech.in</a><br />
                  <a href="mailto:Info.com875@gmail.com" className="email-link">Info.com875@gmail.com</a>
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
                      placeholder="e.g. 9876543210"
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
