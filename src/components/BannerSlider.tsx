import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, Flame, Zap, ShieldCheck } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    tag: 'FIRST DEPOSIT',
    title: '100% WELCOME BONUS',
    desc: 'Deposit now and claim up to ₹10,000 extra cash into your wallet!',
    bg: 'linear-gradient(135deg, #4A1A7D 0%, #200D3C 100%)',
    accent: '#E3B745',
    icon: Sparkles,
    badge: '+100% EXTRA',
  },
  {
    id: 2,
    tag: 'POPULAR #1',
    title: 'WINGO 1MIN FAST DRAW',
    desc: 'Green, Violet, or Red? 60s rounds with up to 9.82x instant payouts!',
    bg: 'linear-gradient(135deg, #065F46 0%, #1B1034 100%)',
    accent: '#18B660',
    icon: Flame,
    badge: '9.82X WIN',
  },
  {
    id: 3,
    tag: 'CRASH TREND',
    title: 'AVIATOR & VORTEX CRASH',
    desc: 'Cash out before the lucky jet flies away! Unlimited win potential.',
    bg: 'linear-gradient(135deg, #881337 0%, #1B1034 100%)',
    accent: '#FB5B5B',
    icon: Zap,
    badge: '100X+',
  },
  {
    id: 4,
    tag: 'PRESTIGE CLUB',
    title: 'VIP DAILY CASH PRIVILEGES',
    desc: 'Level up your VIP rank to claim weekly salaries & mystery gifts!',
    bg: 'linear-gradient(135deg, #78350F 0%, #1B1034 100%)',
    accent: '#F59E0B',
    icon: ShieldCheck,
    badge: 'VIP CASH',
  },
]

interface BannerSliderProps {
  onSelectGame?: (gameType: string) => void
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ onSelectGame }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]
  const Icon = slide.icon

  const handleClick = () => {
    if (slide.id === 2 && onSelectGame) onSelectGame('wingo')
    else if (slide.id === 3 && onSelectGame) onSelectGame('aviator')
  }

  return (
    <div className="banner-carousel-wrap">
      <div className="banner-slide-card" style={{ background: slide.bg }}>
        <div className="banner-slide-info">
          <div className="slide-tag-row">
            <span className="slide-pill" style={{ borderColor: slide.accent, color: slide.accent }}>
              <Icon size={12} /> {slide.tag}
            </span>
            <span className="slide-badge-highlight">{slide.badge}</span>
          </div>
          <h2 className="slide-heading">{slide.title}</h2>
          <p className="slide-subtext">{slide.desc}</p>
          <button className="btn-slide-action" onClick={handleClick}>
            <span>Play Now</span>
          </button>
        </div>

        {/* 3D Decorative Gold Circle */}
        <div className="banner-graphics">
          <div className="glow-graphic-ring">
            <span className="center-symbol">🏆</span>
            <span className="small-sparkle">✨</span>
          </div>
        </div>

        {/* Prev / Next controls */}
        <button
          className="carousel-btn left"
          onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="carousel-btn right"
          onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Indicator dots */}
        <div className="carousel-indicators">
          {SLIDES.map((s, idx) => (
            <span
              key={s.id}
              className={`indicator-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
