import React from 'react'
import { MapPin, Phone, CheckCircle2 } from 'lucide-react'

export const ServiceAreasSection: React.FC = () => {
  const REGIONS = [
    {
      region: 'East Bengaluru',
      areas: ['Whitefield', 'ITPL & Hoodi', 'Marathahalli', 'Kasturinagar', 'Mahadevapura', 'KR Puram', 'CV Raman Nagar'],
      hub: 'Kasturinagar Central Operations Hub',
    },
    {
      region: 'South Bengaluru',
      areas: ['Electronic City (Ph 1 & 2)', 'Koramangala', 'HSR Layout', 'Bellandur & ORR', 'Sarjapur Road', 'JP Nagar', 'Bannerghatta Rd'],
      hub: 'Electronic City Fast Deployment Unit',
    },
    {
      region: 'North Bengaluru',
      areas: ['Hebbal', 'Manyata Tech Park', 'Yelahanka', 'Thanisandra', 'Sahakar Nagar', 'Devanahalli Airport Road'],
      hub: 'North Outer Ring Road Patrol Base',
    },
    {
      region: 'West & Central Bengaluru',
      areas: ['Indiranagar', 'MG Road & CBD', 'Rajajinagar', 'Peenya Industrial Estate', 'Yeshwanthpur', 'Malleshwaram'],
      hub: 'Central Bengaluru Quick Response Unit',
    },
  ]

  return (
    <section id="areas" className="blr-areas-section">
      <div className="blr-container">
        <div className="section-header-center">
          <span className="section-eyebrow">CITY-WIDE RAPID DEPLOYMENT</span>
          <h2 className="section-title">
            Security Coverage Across <span className="highlight-yellow">Greater Bangalore</span>
          </h2>
          <p className="section-subtitle">
            Our strategically located zonal supervisory hubs ensure continuous night patrolling, rapid replacement guards, and on-ground emergency support anywhere in Bengaluru.
          </p>
        </div>

        <div className="areas-region-grid">
          {REGIONS.map((r, idx) => (
            <div key={idx} className="region-card">
              <div className="region-header">
                <MapPin size={20} className="text-yellow" />
                <h3>{r.region}</h3>
              </div>
              <ul className="areas-list">
                {r.areas.map((a, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="text-yellow-light" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <div className="hub-tag">
                <small>Supervisory Base: {r.hub}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact Banner */}
        <div className="areas-dispatch-banner">
          <div className="dispatch-text">
            <h4>Operating a property outside these zones?</h4>
            <p>We deploy security forces across all Karnataka and South India industrial corridors.</p>
          </div>
          <a href="tel:+919916388000" className="btn-dispatch-call">
            <Phone size={16} />
            <span>Speak to Dispatch: +91 99163 88000</span>
          </a>
        </div>
      </div>
    </section>
  )
}
