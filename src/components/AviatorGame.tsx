import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Flame } from 'lucide-react'

interface AviatorGameProps {
  onBack: () => void
  balance: number
  onUpdateBalance: (newBalance: number) => void
}

export const AviatorGame: React.FC<AviatorGameProps> = ({ onBack, balance, onUpdateBalance }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [gameState, setGameState] = useState<'waiting' | 'flying' | 'crashed'>('waiting')
  const [multiplier, setMultiplier] = useState(1.0)
  const [betAmount, setBetAmount] = useState(100)
  const [hasBet, setHasBet] = useState(false)
  const [cashedOut, setCashedOut] = useState<number | null>(null)
  const [recentCrashes, setRecentCrashes] = useState<number[]>([1.85, 2.45, 1.15, 12.8, 3.2, 1.4, 5.6])
  const [countdown, setCountdown] = useState(4)

  const flightRef = useRef({
    multiplier: 1.0,
    crashPoint: 2.5,
    progress: 0,
    animId: 0,
  })

  // Start round cycle
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (gameState === 'waiting') {
      flightRef.current.multiplier = 1.0
      setMultiplier(1.0)
      setCashedOut(null)
      setCountdown(4)

      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval)
            // Launch plane
            startFlight()
            return 0
          }
          return c - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }

    return () => clearTimeout(timer)
  }, [gameState])

  const startFlight = () => {
    // Generate crash point (weighted towards 1.2 - 4x, occasionally 10x+)
    const r = Math.random()
    let crash = 1.1 + Math.random() * 3
    if (r > 0.8) crash = 4 + Math.random() * 10
    if (r > 0.95) crash = 15 + Math.random() * 25
    if (r < 0.15) crash = 1.05 + Math.random() * 0.2

    flightRef.current.crashPoint = parseFloat(crash.toFixed(2))
    flightRef.current.multiplier = 1.0
    flightRef.current.progress = 0
    setGameState('flying')
  }

  // Animation Loop for Flight Canvas
  useEffect(() => {
    if (gameState !== 'flying') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isRunning = true
    let startTime = Date.now()

    const loop = () => {
      if (!isRunning) return

      const elapsed = (Date.now() - startTime) / 1000
      // Multiplier increases exponentially
      const currMultiplier = parseFloat((1.0 + Math.pow(elapsed * 0.75, 1.8)).toFixed(2))
      flightRef.current.multiplier = currMultiplier
      setMultiplier(currMultiplier)

      // Check if crashed
      if (currMultiplier >= flightRef.current.crashPoint) {
        setGameState('crashed')
        setRecentCrashes((prev) => [flightRef.current.crashPoint, ...prev.slice(0, 6)])
        setHasBet(false)

        setTimeout(() => {
          setGameState('waiting')
        }, 3000)
        return
      }

      // Render Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Flight Curve
      const progress = Math.min(elapsed / 8, 1)
      const startX = 40
      const startY = canvas.height - 40
      const planeX = startX + progress * (canvas.width - 100)
      const planeY = startY - Math.pow(progress, 1.4) * (canvas.height - 90)

      // Fill area under curve
      const gradient = ctx.createLinearGradient(0, planeY, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.35)')
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)')

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(startX + (planeX - startX) * 0.5, startY, planeX, planeY)
      ctx.lineTo(planeX, startY)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Curve line
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(startX + (planeX - startX) * 0.5, startY, planeX, planeY)
      ctx.stroke()

      // Draw Lucky Plane
      ctx.save()
      ctx.translate(planeX, planeY)
      ctx.rotate(-Math.PI / 12)
      ctx.font = '28px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✈️', 0, 0)
      ctx.restore()

      flightRef.current.animId = requestAnimationFrame(loop)
    }

    flightRef.current.animId = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      cancelAnimationFrame(flightRef.current.animId)
    }
  }, [gameState])

  const handlePlaceBet = () => {
    if (balance < betAmount) {
      alert('Insufficient wallet balance!')
      return
    }
    onUpdateBalance(balance - betAmount)
    setHasBet(true)
  }

  const handleCashout = () => {
    if (!hasBet || gameState !== 'flying') return
    const win = betAmount * multiplier
    onUpdateBalance(balance + win)
    setCashedOut(multiplier)
    setHasBet(false)
  }

  return (
    <div className="aviator-wrapper">
      {/* Top Bar */}
      <div className="game-top-bar">
        <button onClick={onBack} className="btn-back">
          <ArrowLeft size={18} />
          <span>Lobby</span>
        </button>
        <div className="game-title-badge aviator">
          <Flame size={16} className="text-red-500" />
          <span>Aviator Pro</span>
        </div>
        <div className="game-balance">
          <span>₹{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* History multipliers row */}
      <div className="aviator-history-row">
        {recentCrashes.map((val, idx) => (
          <span
            key={idx}
            className={`crash-pill ${val >= 10 ? 'gold' : val >= 2 ? 'purple' : 'blue'}`}
          >
            {val.toFixed(2)}x
          </span>
        ))}
      </div>

      {/* Canvas Arena */}
      <div className="aviator-canvas-box">
        <canvas ref={canvasRef} width={600} height={320} className="aviator-canvas" />

        {/* Central Multiplier Indicator */}
        <div className="aviator-center-hud">
          {gameState === 'waiting' ? (
            <div className="hud-waiting">
              <span className="waiting-lbl">NEXT ROUND IN</span>
              <span className="waiting-countdown">{countdown}s</span>
            </div>
          ) : gameState === 'crashed' ? (
            <div className="hud-crashed">
              <span className="flew-away">FLEW AWAY!</span>
              <span className="crashed-mult">{flightRef.current.crashPoint.toFixed(2)}x</span>
            </div>
          ) : (
            <div className="hud-flying">
              <span className="live-multiplier">{multiplier.toFixed(2)}x</span>
            </div>
          )}
        </div>
      </div>

      {/* Betting Control Deck */}
      <div className="aviator-bet-panel">
        <div className="amount-input-row">
          <button className="amt-mod-btn" onClick={() => setBetAmount(Math.max(10, betAmount - 50))}>-</button>
          <div className="amt-display">₹{betAmount}</div>
          <button className="amt-mod-btn" onClick={() => setBetAmount(betAmount + 50)}>+</button>
          <div className="quick-chips">
            {[100, 200, 500, 1000].map((v) => (
              <button key={v} className="chip-pill" onClick={() => setBetAmount(v)}>₹{v}</button>
            ))}
          </div>
        </div>

        {/* Big Action Button */}
        {hasBet && gameState === 'flying' ? (
          <button className="btn-aviator-action cashout" onClick={handleCashout}>
            <span className="action-txt">CASH OUT</span>
            <span className="cashout-val">₹{(betAmount * multiplier).toFixed(2)}</span>
          </button>
        ) : (
          <button
            className={`btn-aviator-action bet ${hasBet ? 'waiting-start' : ''}`}
            onClick={handlePlaceBet}
            disabled={hasBet || gameState === 'flying'}
          >
            <span className="action-txt">{hasBet ? 'BET ACCEPTED' : 'BET'}</span>
            <span className="sub-txt">₹{betAmount}.00</span>
          </button>
        )}
      </div>

      {/* Cashout Notice */}
      {cashedOut && (
        <div className="cashout-alert-toast">
          🎉 You cashed out at <strong>{cashedOut.toFixed(2)}x</strong>! Won{' '}
          <strong>₹{(betAmount * cashedOut).toFixed(2)}</strong>!
        </div>
      )}
    </div>
  )
}
