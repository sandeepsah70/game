import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, Flame, ShieldCheck, Zap } from 'lucide-react'

const BANNERS = [
  {
    id: 1,
    tag: 'MEGA PROMOTION',
    title: '100% FIRST DEPOSIT BONUS',
    subtitle: 'Deposit now and claim up to ₹10,000 instantly into your gaming wallet!',
    accent: '#ec4899',
    badgeIcon: Sparkles,
    cta: 'Claim Bonus',
  },
  {
    id: 2,
    tag: 'TRENDING #1',
    title: 'WINGO COLOR PREDICTION',
    subtitle: 'Green, Violet or Red? Predict every 60 seconds with up to 9x instant multipliers!',
    accent: '#10b981',
    badgeIcon: Flame,
    cta: 'Play Win Go',
  },
  {
    id: 3,
    tag: 'HIGH WIN POTENTIAL',
    title: 'AVIATOR & VORTEX CRASH',
    subtitle: 'Watch the multiplier skyrocket. Cash out at the peak before the plane takes off!',
    accent: '#f59e0b',
    badgeIcon: Zap,
    cta: 'Fly Now',
  },
  {
    id: 4,
    tag: 'VIP CLUB',
    title: 'DAILY CHECK-IN REWARDS',
    subtitle: 'Log in daily to claim spin vouchers, secret gift codes and VIP cashback!',
    accent: '#8b5cf6',
    badgeIcon: ShieldCheck,
    cta: 'Check In',
  },
]

interface BannerSliderProps {
  onSelectGame?: (gameType: string) => void
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ onSelectGame }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % BANNERS.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)

  const active = BANNERS[current]
  const Icon = active.badgeIcon

  const handleAction = () => {
    if (active.id === 2 && onSelectGame) onSelectGame('wingo')
    else if (active.id === 3 && onSelectGame) onSelectGame('aviator')
  }

  return (
    <div className="dw-banner-section">
      <div className="dw-banner-card" style={{ '--accent-color': active.accent } as React.CSSProperties}>
        <div className="dw-banner-content">
          <div className="dw-banner-badge">
            <Icon size={14} />
            <span>{active.tag}</span>
          </div>
          <h2 className="dw-banner-title">{active.title}</h2>
          <p className="dw-banner-subtitle">{active.subtitle}</p>
          <button className="dw-banner-cta" onClick={handleAction}>
            <span>{active.cta}</span>
            <Sparkles size={16} />
          </button>
        </div>

        {/* Decorative Graphic Element */}
        <div className="dw-banner-visual">
          <div className="coin-glow-circle">
            <div className="floating-badge">99.8%</div>
            <div className="jackpot-tag">PROVABLY FAIR</div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className="slider-arrow next" onClick={nextSlide} aria-label="Next">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="dw-banner-dots">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
