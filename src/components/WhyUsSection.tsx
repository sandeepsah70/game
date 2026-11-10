import React from 'react'
import { ShieldCheck, UserCheck, Smartphone, Clock, Award, ArrowRight } from 'lucide-react'

interface WhyUsSectionProps {
  onOpenQuote: () => void
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="why-us" className="blr-whyus-section">
      <div className="blr-container">
        <div className="section-header-center">
          <span className="section-eyebrow">THE BLR SQUAD DIFFERENCE</span>
          <h2 className="section-title">
            Why 120+ Bangalore Organizations Rely on <span className="highlight-yellow">BLR Squad</span>
          </h2>
          <p className="section-subtitle">
            We solve the common frustrations of absenteeism, untrained guards, and lax supervision through military-grade discipline and digital monitoring.
          </p>
        </div>

        <div className="whyus-grid-columns">
          {/* Pillar 1 */}
          <div className="whyus-feature-card">
            <div className="whyus-icon-header">
              <div className="whyus-icon-circle">
                <UserCheck size={26} className="text-yellow" />
              </div>
              <span className="pillar-num">01</span>
            </div>
            <h3>5-Stage Stringent Verification</h3>
            <p>
              Every guard undergoes mandatory police clearance, Aadhaar biometric verification, residential antecedent checks, and independent reference validation.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="whyus-feature-card">
            <div className="whyus-icon-header">
              <div className="whyus-icon-circle">
                <Clock size={26} className="text-yellow" />
              </div>
              <span className="pillar-num">02</span>
            </div>
            <h3>24/7 Night Surprise Audits</h3>
            <p>
              Dedicated Field Officers and Mobile Patrolling Jeeps conduct unscheduled night inspections to ensure guards remain awake, alert, and strictly at posts.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="whyus-feature-card">
            <div className="whyus-icon-header">
              <div className="whyus-icon-circle">
                <Smartphone size={26} className="text-yellow" />
              </div>
              <span className="pillar-num">03</span>
            </div>
            <h3>QR Guard Tour Patrol System</h3>
            <p>
              Guards scan geo-tagged QR codes across your premises at designated hourly intervals, generating real-time digital patrol proof accessible to clients.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="whyus-feature-card">
            <div className="whyus-icon-header">
              <div className="whyus-icon-circle">
                <ShieldCheck size={26} className="text-yellow" />
              </div>
              <span className="pillar-num">04</span>
            </div>
            <h3>Rapid 2-Hour Replacement</h3>
            <p>
              We maintain a 15% reserve pool of ready-to-deploy trained personnel at our Kasturinagar headquarters to guarantee instant relief guards during sick leaves.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="whyus-feature-card">
            <div className="whyus-icon-header">
              <div className="whyus-icon-circle">
                <Award size={26} className="text-yellow" />
              </div>
              <span className="pillar-num">05</span>
            </div>
            <h3>100% PSARA & Statutory Law</h3>
            <p>
              Full compliance with Karnataka PSARA, Minimum Wages Act, PF, ESI, Gratuity, Bonus and Workman Compensation with monthly audited proof shared with you.
            </p>
          </div>

          {/* Transition CTA Card */}
          <div className="whyus-cta-card">
            <span className="transition-badge">HASSLE-FREE AGENCY SWITCH</span>
            <h3>Unhappy with Your Current Security Agency?</h3>
            <p>
              Switching to BLR Squad takes less than 24 hours. We handle all deployment logistics, post surveys, and shift handovers with zero downtime.
            </p>
            <button className="btn-switch-agency" onClick={onOpenQuote}>
              <span>Plan Agency Switchover</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
