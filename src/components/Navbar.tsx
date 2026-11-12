import React, { useState } from 'react'
import { Shield, Phone, Menu, X, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onOpenQuote: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="blr-header">
      {/* Top Notification / Helpline Bar */}
      <div className="blr-top-bar">
        <div className="blr-container top-bar-flex">
          <div className="top-trust-badge">
            <span className="dot-live"></span>
            <span>Government Licensed (PSARA) • 100% Police Verified Guards in Bengaluru</span>
          </div>
          <div className="top-contact-links">
            <a href="tel:+91 99644 41471" className="top-phone-link">
              <Phone size={13} />
              <span>24/7 Helpline: +91 99644 41471</span>
            </a>
            <span className="divider">|</span>
            <a href="mailto:Info.com875@gmail.com" className="top-email-link">
              Info.com875@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="blr-main-nav">
        <div className="blr-container nav-flex">
          {/* Brand Logo */}
          <a href="#" className="blr-brand-logo" onClick={() => scrollTo('hero')}>
            <div className="logo-shield">
              <Shield size={26} className="shield-icon-yellow" />
              <span className="shield-inner-star">★</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-name">BLR <span className="highlight-yellow">SQUAD</span></span>
              <span className="brand-motto">TRUST • SECURE • PROTECT</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <button onClick={() => scrollTo('hero')} className="nav-link">Home</button>
            <button onClick={() => scrollTo('services')} className="nav-link">Services</button>
            <button onClick={() => scrollTo('why-us')} className="nav-link">Why JTMS</button>
            <button onClick={() => scrollTo('stats')} className="nav-link">Guards & Stats</button>
            <button onClick={() => scrollTo('testimonials')} className="nav-link">Reviews</button>
            <button onClick={() => scrollTo('areas')} className="nav-link">Coverage Areas</button>
            <button onClick={() => scrollTo('contact')} className="nav-link">Contact</button>
          </div>

          {/* Right Action Call & Quote Button */}
          <div className="nav-right-actions">
            <a href="tel:+91 99644 41471" className="nav-phone-chip">
              <div className="phone-circle">
                <Phone size={15} />
              </div>
              <div className="phone-meta">
                <small>Quick Call</small>
                <strong>+91 99644 41471</strong>
              </div>
            </a>

            <button className="btn-get-quote-nav" onClick={onOpenQuote}>
              <span>Get a Quote</span>
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
            <button onClick={() => scrollTo('hero')} className="mobile-nav-link">Home</button>
            <button onClick={() => scrollTo('services')} className="mobile-nav-link">Security Services</button>
            <button onClick={() => scrollTo('why-us')} className="mobile-nav-link">Why Choose Us</button>
            <button onClick={() => scrollTo('stats')} className="mobile-nav-link">Our Deployment</button>
            <button onClick={() => scrollTo('testimonials')} className="mobile-nav-link">Client Testimonials</button>
            <button onClick={() => scrollTo('areas')} className="mobile-nav-link">Bangalore Areas</button>
            <button onClick={() => scrollTo('contact')} className="mobile-nav-link">Contact & Office</button>
            <div className="mobile-menu-cta">
              <button
                className="btn-get-quote-full"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenQuote()
                }}
              >
                Request Security Assessment
              </button>
              <a href="tel:+91 99644 41471" className="btn-call-mobile">
                <Phone size={16} /> Call +91 99644 41471
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

