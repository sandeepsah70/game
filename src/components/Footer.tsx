import React from 'react'
import { Shield, Phone, Mail, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="blr-footer">
      <div className="blr-container footer-content-grid">
        {/* Col 1: Brand & About */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="logo-shield mini">
              <Shield size={22} className="shield-icon-yellow" />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">BLR <span className="highlight-yellow">SQUAD</span></span>
              <span className="brand-motto">TRUST • SECURE • PROTECT</span>
            </div>
          </div>
          <p className="footer-company-desc">
            Bengaluru Squad Services Private Limited is a government-licensed (PSARA) security guard and facility management agency providing high-caliber protective personnel across Karnataka and South India.
          </p>
          <div className="psara-reg-badge">
            <Shield size={14} className="text-yellow" />
            <span>Govt PSARA License Verified • 100% Statutory Compliant</span>
          </div>
        </div>

        {/* Col 2: Security Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Security Services</h4>
          <ul className="footer-links">
            <li><button onClick={() => scrollTo('services')}>Corporate & Tech Park Security</button></li>
            <li><button onClick={() => scrollTo('services')}>Apartment & Residential Security</button></li>
            <li><button onClick={() => scrollTo('services')}>Industrial & Factory Security</button></li>
            <li><button onClick={() => scrollTo('services')}>Armed & Unarmed Security Guards</button></li>
            <li><button onClick={() => scrollTo('services')}>VIP Bodyguards & Executive Escorts</button></li>
            <li><button onClick={() => scrollTo('services')}>Event Bouncers & Crowd Control</button></li>
            <li><button onClick={() => scrollTo('services')}>K9 Dog Squad Security</button></li>
            <li><button onClick={() => scrollTo('services')}>Integrated Facility Management</button></li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => scrollTo('hero')}>Home</button></li>
            <li><button onClick={() => scrollTo('why-us')}>Why Choose BLR Squad</button></li>
            <li><button onClick={() => scrollTo('stats')}>Manpower & Deployment</button></li>
            <li><button onClick={() => scrollTo('testimonials')}>Client Testimonials</button></li>
            <li><button onClick={() => scrollTo('areas')}>Coverage Across Bangalore</button></li>
            <li><button onClick={() => scrollTo('risk')}>Request Site Survey</button></li>
            <li><button onClick={() => scrollTo('contact')}>Contact Central Dispatch</button></li>
          </ul>
        </div>

        {/* Col 4: Contact & Office */}
        <div className="footer-col">
          <h4 className="footer-heading">Bengaluru Head Office</h4>
          <div className="footer-contact-items">
            <div className="f-item">
              <MapPin size={18} className="f-icon" />
              <span>
                #79, 1st Floor, B. Channasandra Bus Stop, Kasturinagar, Bengaluru, Karnataka – 560043
              </span>
            </div>
            <div className="f-item">
              <Phone size={18} className="f-icon" />
              <div>
                <a href="tel:+919916388000">+91 99163 88000</a><br />
                <a href="tel:+919916827658">+91 99168 27658</a>
              </div>
            </div>
            <div className="f-item">
              <Mail size={18} className="f-icon" />
              <a href="mailto:support@blrsquad.com">support@blrsquad.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="blr-container bottom-bar-inner">
          <p>© 2026 Bengaluru Squad Services Private Limited. All Rights Reserved.</p>
          <div className="bottom-policy-tags">
            <span>PSARA License No: KAR/BLR/SEC/2026</span>
            <span>•</span>
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
