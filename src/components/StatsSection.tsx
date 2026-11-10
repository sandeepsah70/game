import React from 'react'
import { Users, Building, Calendar, ThumbsUp, Zap, ShieldCheck } from 'lucide-react'

export const StatsSection: React.FC = () => {
  const STATS = [
    { num: '500+', label: 'Trained Guards Deployed', desc: 'Across Bangalore commercial & residential sites', icon: Users },
    { num: '120+', label: 'Premises Secured', desc: 'Gated societies, tech parks & manufacturing plants', icon: Building },
    { num: '10+', label: 'Years in Karnataka', desc: 'Continuous excellence and government PSARA licence', icon: Calendar },
    { num: '99.2%', label: 'Client Retention Rate', desc: 'Long-standing security partnerships over years', icon: ThumbsUp },
    { num: '15 Min', label: 'Emergency Response', desc: 'Rapid mobile supervisor team dispatched 24/7', icon: Zap },
    { num: '100%', label: 'Statutory Compliance', desc: 'PF, ESI, Minimum Wages & ISO quality audited', icon: ShieldCheck },
  ]

  return (
    <section id="stats" className="blr-stats-section">
      <div className="blr-container">
        <div className="stats-box-grid">
          {STATS.map((s, idx) => {
            const Icon = s.icon
            return (
              <div key={idx} className="stat-card-item">
                <div className="stat-icon-wrapper">
                  <Icon size={22} className="text-yellow" />
                </div>
                <div className="stat-data-block">
                  <span className="stat-number-headline">{s.num}</span>
                  <strong className="stat-title-strong">{s.label}</strong>
                  <p className="stat-desc-p">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
