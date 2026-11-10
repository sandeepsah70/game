import React from 'react'
import { Building2, Home, Factory, Shield, UserCheck, Calendar, Dog, Sparkles, Check, ArrowRight } from 'lucide-react'

interface ServicesSectionProps {
  onOpenQuote: () => void
}

const SERVICES = [
  {
    id: 'corporate',
    title: 'Corporate Security Services',
    icon: Building2,
    badge: 'IT Parks & MNCs',
    desc: 'Complete front-desk concierge, visitor badging, access control, server room security, and employee night escort verification.',
    features: [
      'Automated Visitor Management System (VMS)',
      'Server Room & Asset Tag Verification',
      'Employee Night Cab Escorts & Female Safety',
      'CCTV Monitoring & Emergency Fire Drills',
    ],
  },
  {
    id: 'apartment',
    title: 'Apartment & Residential Security',
    icon: Home,
    badge: 'Gated Communities',
    desc: 'Strict gatekeeping for apartment complexes, multi-tier visitor validation, boom barrier control, and peaceful perimeter night rounds.',
    features: [
      'MyGate / NoBrokerHood App Integration',
      'Delivery Partner & Cab Driver Frisking',
      '24/7 Clubhouse & Children Play Area Patrol',
      'Water Tanker & Vendor Gate Pass Verification',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial & Factory Security',
    icon: Factory,
    badge: 'Plants & Warehouses',
    desc: 'Heavy-duty perimeter enforcement, weighbridge logging, material gate pass verification, and loss prevention audits.',
    features: [
      'Material Inward/Outward Challan Checks',
      'Worker Shift Frisking & Metal Detectors',
      'Hazardous Zone & Chemical Store Watch',
      'Perimeter Fence Night Canine Sweeps',
    ],
  },
  {
    id: 'guards',
    title: 'Armed & Unarmed Security Guards',
    icon: Shield,
    badge: 'Disciplined Manpower',
    desc: 'Physically fit, ex-defence personnel and thoroughly groomed civilian guards trained in drill, crowd management, and first aid.',
    features: [
      '100% Police Verified & Medically Fit',
      'Licensed Armed Guards with Valid Gun Retainers',
      'Uniformed, Turn-out Inspected Daily',
      'Proficient in Kannada, English & Hindi',
    ],
  },
  {
    id: 'vip',
    title: 'VIP Bodyguard & Executive Escort',
    icon: UserCheck,
    badge: 'Close Protection',
    desc: 'Discreet, elite executive protection officers (PSO) trained in defensive driving, route reconnaissance, and threat neutralisation.',
    features: [
      'Ex-NSG / Commando / Armed Forces Officers',
      'Discreet Business Travel & Airport Escort',
      'Crisis Management & Route Reconnaissance',
      'High Net Worth Individual (HNI) Family Safety',
    ],
  },
  {
    id: 'event',
    title: 'Event Security & Crowd Control',
    icon: Calendar,
    badge: 'Bouncers & Marshals',
    desc: 'Professional crowd marshals, bouncers, and perimeter security teams for concerts, exhibitions, corporate AGMs, and celebrity events.',
    features: [
      'Ticket Checking & Metal Detector Gates',
      'VIP Green Room & Stage Perimeter Cordon',
      'Emergency Evacuation & Panic Containment',
      'Female Security Officers for Women Frisking',
    ],
  },
  {
    id: 'k9',
    title: 'K9 Dog Squad Security',
    icon: Dog,
    badge: 'Canine Patrols',
    desc: 'Trained German Shepherds and Labradors with certified handlers for explosive detection, narcotic screening, and psychological deterrence.',
    features: [
      'Certified Handlers with Routine Obedience Drill',
      'Sniffer Dogs for Large Logistics Hubs',
      'Night-time Warehouse Perimeter Deterrence',
      'High-Footfall Mall & Metro Entry Sweeps',
    ],
  },
  {
    id: 'facility',
    title: 'Facility Management Services',
    icon: Sparkles,
    badge: 'Total Premises Care',
    desc: 'Integrated housekeeping, technical maintenance, MEP supervisors, and pantry stewards to keep commercial premises spotless.',
    features: [
      'Deep Sanitisation & Mechanised Floor Scrubbing',
      'DG Set, STP & Fire Hydrant Operations',
      'Pantry Stewards & Office Boy Support',
      'Single Point SLA & Consolidated Billing',
    ],
  },
]

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="services" className="blr-services-section">
      <div className="blr-container">
        <div className="section-header-center">
          <span className="section-eyebrow">COMPREHENSIVE PROTECTION</span>
          <h2 className="section-title">
            Elite Security Services Tailored for <span className="highlight-yellow">Bengaluru</span>
          </h2>
          <p className="section-subtitle">
            From tech corridors in Whitefield and Electronic City to premier residential societies in Koramangala and Hebbal, we deliver uncompromising safety.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-card-grid">
          {SERVICES.map((srv) => {
            const Icon = srv.icon
            return (
              <div key={srv.id} className="service-feature-card">
                <div className="card-top-row">
                  <div className="service-icon-wrap">
                    <Icon size={24} className="service-svg" />
                  </div>
                  <span className="service-badge-pill">{srv.badge}</span>
                </div>

                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.desc}</p>

                <ul className="service-checklist">
                  {srv.features.map((f, i) => (
                    <li key={i}>
                      <Check size={14} className="check-bullet" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="btn-service-inquire" onClick={onOpenQuote}>
                  <span>Inquire for {srv.badge}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
