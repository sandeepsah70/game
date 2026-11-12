import React, { useState } from 'react'
import { FileText, Mail, Menu, X, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onOpenQuote: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigateTo = (url: string) => {
    setMobileMenuOpen(false)
    window.location.href = url
  }

  return (
    <header className="blr-header">
      {/* Top Notification Bar */}
      <div className="blr-top-bar">
        <div className="blr-container top-bar-flex">
          <div className="top-trust-badge">
            <span className="dot-live"></span>
            <span>Government Licensed (PSARA) • 100% Police Verified Guards • JTMS Security</span>
          </div>
          <div className="top-contact-links">
            <a href="mailto:info@jtmstech.in" className="top-email-link">
              <Mail size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />
              <span>info@jtmstech.in</span>
            </a>
            <span className="divider">|</span>
            <a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer" className="top-phone-link">
              <FileText size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />
              <span>Official Brochure</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="blr-main-nav">
        <div className="blr-container nav-flex">
          {/* Brand Logo */}
          <a href="./" className="blr-brand-logo">
            <img
              src="./uploads/logo/jtms-logo-transparent.png"
              alt="JTMS Security Logo"
              style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '50%' }}
            />
            <div className="brand-text-block">
              <span className="brand-name">JTMS <span className="highlight-yellow">SECURITY</span></span>
              <span className="brand-motto">YOUR SAFETY, OUR RESPONSIBILITY</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <a href="./" className="nav-link">Home</a>
            <a href="./about" className="nav-link">About</a>
            <a href="./#our-services" className="nav-link">Services</a>
            <a href="./premium-services" className="nav-link">Premium Services</a>
            <a href="./media" className="nav-link">Media</a>
            <a href="./clients" className="nav-link">Clients</a>
            <a href="./gallery" className="nav-link">Gallery</a>
          </div>

          {/* Right Action Get Brochure & Quote Button */}
          <div className="nav-right-actions">
            <a
              href="./brochure/JTMS-Brochure.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold brochure"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 4, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}
            >
              <FileText size={15} />
              <span>Get Brochure</span>
            </a>

            <button className="btn-get-quote-nav" onClick={onOpenQuote}>
              <span>Quick Enquiry</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <button onClick={() => navigateTo('./')} className="mobile-nav-link">Home</button>
            <button onClick={() => navigateTo('./about')} className="mobile-nav-link">About</button>
            <button onClick={() => navigateTo('./#our-services')} className="mobile-nav-link">Services</button>
            <button onClick={() => navigateTo('./premium-services')} className="mobile-nav-link">Premium Services</button>
            <button onClick={() => navigateTo('./media')} className="mobile-nav-link">Media & Press</button>
            <button onClick={() => navigateTo('./clients')} className="mobile-nav-link">Our Clients</button>
            <button onClick={() => navigateTo('./gallery')} className="mobile-nav-link">Photo Gallery</button>
            <div className="mobile-menu-cta">
              <a
                href="./brochure/JTMS-Brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-get-quote-full"
                style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
              >
                Download Official Brochure
              </a>
              <button
                className="btn-call-mobile"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenQuote()
                }}
              >
                Request Security Assessment
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
