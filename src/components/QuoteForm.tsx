import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react'

export const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Apartment & Gated Community',
    area: 'Whitefield',
    guardsCount: '2-5 Guards',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate submission / store inquiry
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section id="risk" className="blr-quote-section">
      <div className="blr-container">
        <div className="quote-box-wrapper">
          <div className="quote-grid">
            {/* Left Info Panel */}
            <div className="quote-info-panel">
              <span className="quote-eyebrow">FREE SITE ASSESSMENT</span>
              <h2 className="quote-heading">Get a Customized Security Plan & Quote in 15 Minutes</h2>
              <p className="quote-desc">
                Our Bengaluru security supervisors will conduct a free vulnerability check of your premises and provide an itemized manpower and surveillance proposal.
              </p>

              <div className="guarantees-list">
                <div className="g-item">
                  <ShieldCheck size={20} className="text-yellow" />
                  <div>
                    <strong>100% Statutorily Compliant</strong>
                    <p>PF, ESI, Minimum Wages, Gratuity & PSARA compliance guaranteed.</p>
                  </div>
                </div>

                <div className="g-item">
                  <ShieldCheck size={20} className="text-yellow" />
                  <div>
                    <strong>No Long-Term Lock-in</strong>
                    <p>Flexible 30-day trial deployments with zero hidden handover fees.</p>
                  </div>
                </div>

                <div className="g-item">
                  <PhoneCall size={20} className="text-yellow" />
                  <div>
                    <strong>Direct Operations Line</strong>
                    <p>Reach our Bangalore central dispatch at +91 99163 88000 anytime.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="quote-form-panel">
              {submitted ? (
                <div className="quote-success-state">
                  <CheckCircle2 size={54} className="text-success-green" />
                  <h3>Inquiry Received Successfully!</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our Bengaluru Operations Manager has received your request for <strong>{formData.serviceType}</strong> in <strong>{formData.area}</strong> and will call you on <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button className="btn-reset-form" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="assessment-form">
                  <h3 className="form-title">Request Site Survey & Pricing</h3>

                  <div className="form-group-row">
                    <div className="form-field">
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Contact Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="e.g. 9916388000"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-field">
                      <label>Property / Service Type</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="Apartment & Gated Community">Apartment & Gated Community</option>
                        <option value="Corporate Office & Tech Park">Corporate Office & Tech Park</option>
                        <option value="Industrial Plant & Warehouse">Industrial Plant & Warehouse</option>
                        <option value="Armed / Unarmed Guards">Armed / Unarmed Security Guards</option>
                        <option value="VIP Bodyguard / Executive Escort">VIP Bodyguard / Executive Escort</option>
                        <option value="Event Security & Bouncers">Event Security & Bouncers</option>
                        <option value="K9 Dog Squad">K9 Dog Squad Security</option>
                        <option value="Facility Management">Integrated Facility Management</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Bangalore Location / Area</label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      >
                        <option value="Kasturinagar">Kasturinagar / East Bangalore</option>
                        <option value="Whitefield">Whitefield / ITPL</option>
                        <option value="Electronic City">Electronic City Phase 1 & 2</option>
                        <option value="Koramangala">Koramangala</option>
                        <option value="Indiranagar">Indiranagar</option>
                        <option value="HSR Layout">HSR Layout</option>
                        <option value="Bellandur / ORR">Bellandur / Outer Ring Road</option>
                        <option value="Manyata Tech Park / Hebbal">Manyata Tech Park / Hebbal</option>
                        <option value="Marathahalli">Marathahalli</option>
                        <option value="JP Nagar / Jayanagar">JP Nagar / Jayanagar</option>
                        <option value="Other Area in Bangalore">Other Area in Bangalore</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Estimated Manpower Needed</label>
                    <div className="guards-chips-selector">
                      {['1 - 2 Guards', '2 - 5 Guards', '6 - 10 Guards', '10+ Guards', 'Not Sure'].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          className={`chip-selector ${formData.guardsCount === cnt ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, guardsCount: cnt })}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-submit-assessment" disabled={loading}>
                    <span>{loading ? 'Processing...' : 'Get Instant Pricing & Consultation'}</span>
                    <ArrowRight size={18} />
                  </button>
                  <small className="form-privacy-note">🔒 Your details are 100% confidential. No spam calls.</small>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
