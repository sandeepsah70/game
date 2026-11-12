import React from 'react'
import { Shield, Mail, MapPin, FileText, Globe } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="blr-footer">
      <div className="blr-container footer-content-grid">
        {/* Col 1: Brand & About */}
        <div className="footer-col brand-col">
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="./uploads/logo/jtms-logo-transparent.png"
              alt="JTMS Logo"
              style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: '50%' }}
            />
            <div className="brand-text-block">
              <span className="brand-name">JTMS <span className="highlight-yellow">TECHS</span></span>
              <span className="brand-motto">YOUR SAFETY, OUR RESPONSIBILITY</span>
            </div>
          </div>
          <p className="footer-company-desc">
            JTMS TECHS Manpower and Security Service Private Limited is a government-licensed (PSARA) security guard and facility management agency providing high-caliber protective personnel across Karnataka and South India.
          </p>
          <div className="psara-reg-badge">
            <Shield size={14} className="text-yellow" />
            <span>Govt PSARA License Verified • 100% Statutory Compliant</span>
          </div>
        </div>

        {/* Col 2: Security Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Services</h4>
          <ul className="footer-links">
            <li><a href="./#our-services">Corporate & Tech Park Security</a></li>
            <li><a href="./#our-services">Apartment & Residential Security</a></li>
            <li><a href="./#our-services">Industrial & Factory Security</a></li>
            <li><a href="./#our-services">Armed & Unarmed Security Guards</a></li>
            <li><a href="./premium-services">VIP Bodyguards & Executive Escorts</a></li>
            <li><a href="./premium-services">High Value Goods Escort</a></li>
            <li><a href="./#our-services">K9 Dog Squad Security</a></li>
            <li><a href="./#our-services">Integrated Facility Management</a></li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Pages</h4>
          <ul className="footer-links">
            <li><a href="./">Home</a></li>
            <li><a href="./about">About Us</a></li>
            <li><a href="./#our-services">Services</a></li>
            <li><a href="./premium-services">Premium Services</a></li>
            <li><a href="./media">Media & Press Releases</a></li>
            <li><a href="./clients">Our Reputed Clients</a></li>
            <li><a href="./gallery">Photo Gallery</a></li>
            <li><a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer">Download Official Brochure</a></li>
          </ul>
        </div>

        {/* Col 4: Contact & Office */}
        <div className="footer-col">
          <h4 className="footer-heading">Registered Office</h4>
          <div className="footer-contact-items">
            <div className="f-item">
              <MapPin size={18} className="f-icon" />
              <span>
                BCMC Layout, 4th Main, 8th Cross, Near Shani Mahatma Temple, Raghuvanhalli, Bangalore - 560062, Karnataka
              </span>
            </div>
            <div className="f-item">
              <Mail size={18} className="f-icon" />
              <div>
                <a href="mailto:info@jtmstech.in">info@jtmstech.in</a><br />
                <a href="mailto:Info.com875@gmail.com">Info.com875@gmail.com</a>
              </div>
            </div>
            <div className="f-item">
              <Globe size={18} className="f-icon" />
              <a href="https://www.jtmstech.in" target="_blank" rel="noreferrer">www.jtmstech.in</a>
            </div>
            <div className="f-item">
              <FileText size={18} className="f-icon" />
              <a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer" style={{ color: '#f5c026', fontWeight: 'bold' }}>
                View JTMS Brochure (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="blr-container bottom-bar-inner">
          <p>© 2026 JTMS TECHS Manpower and Security Service Private Limited. All Rights Reserved.</p>
          <div className="bottom-policy-tags">
            <span>Bengaluru, Karnataka, India</span>
            <span>•</span>
            <a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none' }}>
              JTMS Brochure
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
