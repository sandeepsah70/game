import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Meera Iyer',
    role: 'Property Manager',
    company: 'Gated Apartment Complex, Bengaluru',
    quote: "Our residents are very happy with the guards' discipline and courtesy. Any issue is resolved quickly by the supervisors. Truly dependable service.",
    rating: 5,
    avatar: 'MI',
  },
  {
    name: 'Vikram Shetty',
    role: 'Plant Head',
    company: 'Industrial Manufacturing Unit, Bengaluru',
    quote: 'From verification to deployment, everything was handled with great professionalism. We have trusted Bengaluru Squad for our plant security for years.',
    rating: 5,
    avatar: 'VS',
  },
  {
    name: 'Divya Menon',
    role: 'Event Coordinator',
    company: 'Corporate Events & Summits, Bengaluru',
    quote: 'The team managed crowd control and VIP movement at our event flawlessly. Calm, well-trained and extremely cooperative throughout.',
    rating: 5,
    avatar: 'DM',
  },
  {
    name: 'Rajesh Sundaram',
    role: 'Facility Director',
    company: 'Tech Park Campus, Whitefield',
    quote: 'Their QR code night patrol system and real-time attendance tracking have brought complete transparency and peace of mind to our campus security.',
    rating: 5,
    avatar: 'RS',
  },
]

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)

  const next = () => setActiveIdx((prev) => (prev + 1) % REVIEWS.length)
  const prev = () => setActiveIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)

  return (
    <section id="testimonials" className="blr-testimonials-section">
      <div className="blr-container">
        <div className="section-header-center">
          <span className="section-eyebrow">VERIFIED CLIENT VOICES</span>
          <h2 className="section-title">
            Trusted by Bangalore's Leading <span className="highlight-yellow">Communities & Corporates</span>
          </h2>
          <p className="section-subtitle">
            Read what facility directors, RWA committee members, and event organizers have to say about BLR Squad.
          </p>
        </div>

        {/* Carousel / Grid */}
        <div className="testimonials-grid">
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className={`testimonial-card ${idx === activeIdx ? 'highlight' : ''}`}>
              <div className="card-quote-icon">
                <Quote size={28} className="quote-svg-gold" />
              </div>

              <div className="stars-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbb616" color="#fbb616" />
                ))}
              </div>

              <p className="client-quote-text">"{rev.quote}"</p>

              <div className="client-author-box">
                <div className="author-avatar-chip">{rev.avatar}</div>
                <div className="author-details">
                  <strong>{rev.name}</strong>
                  <span>{rev.role}</span>
                  <small>{rev.company}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="testimonial-controls">
          <button className="btn-carousel-circle" onClick={prev} aria-label="Previous review">
            <ChevronLeft size={20} />
          </button>
          <div className="carousel-dots-list">
            {REVIEWS.map((_, i) => (
              <span
                key={i}
                className={`dot-pill ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
          <button className="btn-carousel-circle" onClick={next} aria-label="Next review">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

