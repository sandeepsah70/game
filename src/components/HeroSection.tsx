import React from 'react'
import { ShieldCheck, FileText, CheckCircle2, Award, ArrowRight, Mail } from 'lucide-react'

interface HeroSectionProps {
  onOpenQuote: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="hero" className="blr-hero-section">
      <div className="hero-overlay-pattern"></div>
      <div className="blr-container hero-container-grid">
        {/* Left Column: Content */}
        <div className="hero-text-content">
          <div className="hero-eyebrow-badge">
            <ShieldCheck size={16} className="text-yellow" />
            <span>PSARA LICENSED • POLICE VERIFIED AGENCY • JTMS SECURITY</span>
          </div>

          <h1 className="hero-main-title">
            Professional <span className="highlight-text-yellow">Security Services</span> in Bangalore
          </h1>

          <p className="hero-subtext">
            Safeguarding people, commercial properties, gated communities, and industrial facilities across Bengaluru with highly trained, disciplined, and background-checked security personnel.
          </p>

          <div className="hero-cta-group">
            <button className="btn-hero-primary" onClick={onOpenQuote}>
              <span>Get Free Security Quote</span>
              <ArrowRight size={18} />
            </button>
            <a href="./brochure/JTMS-Brochure.pdf" target="_blank" rel="noreferrer" className="btn-hero-secondary">
              <FileText size={17} />
              <span>Get Brochure (PDF)</span>
            </a>
          </div>

          {/* Key Checklist Highlights */}
          <div className="hero-trust-bullets">
            <div className="trust-bullet">
              <CheckCircle2 size={16} className="bullet-icon-check" />
              <span>Police Verified & Antecedent Checked</span>
            </div>
            <div className="trust-bullet">
              <CheckCircle2 size={16} className="bullet-icon-check" />
              <span>24/7 Mobile Night Patrol Audits</span>
            </div>
            <div className="trust-bullet">
              <CheckCircle2 size={16} className="bullet-icon-check" />
              <span>Rapid 2-Hour Guard Replacement</span>
            </div>
            <div className="trust-bullet">
              <CheckCircle2 size={16} className="bullet-icon-check" />
              <span>Zero-Notice Contract Flexibility</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Security Shield Showcase Card */}
        <div className="hero-showcase-column">
          <div className="hero-card-glow">
            <div className="card-top-header">
              <div className="officer-badge">
                <Award size={24} className="award-gold" />
              </div>
              <div className="badge-meta">
                <span className="badge-title">JTMS VIGILANCE</span>
                <span className="badge-status">Active 24/7 Patrol Network</span>
              </div>
            </div>

            <div className="hero-stat-trio">
              <div className="trio-box">
                <span className="trio-num">500+</span>
                <span className="trio-lbl">Guards Deployed</span>
              </div>
              <div className="trio-box">
                <span className="trio-num">120+</span>
                <span className="trio-lbl">Sites Secured</span>
              </div>
              <div className="trio-box">
                <span className="trio-num">99.2%</span>
                <span className="trio-lbl">Client Retention</span>
              </div>
            </div>

            <div className="hero-deployment-banner">
              <div className="pulse-indicator-live">
                <span className="ping-wave"></span>
                <span className="core-dot"></span>
              </div>
              <div className="deployment-text">
                <strong>Rapid Response Units On Patrol</strong>
                <small>Covering Whitefield, Electronic City, HSR & Outer Ring Road</small>
              </div>
            </div>

            <div className="card-quick-form">
              <span className="form-head-title">Need Guards Tomorrow?</span>
              <p className="form-sub">Speak directly with our Bengaluru Operations Team</p>
              <a href="mailto:info@jtmstech.in" className="btn-call-direct-card">
                <Mail size={16} />
                <span>Email: info@jtmstech.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
