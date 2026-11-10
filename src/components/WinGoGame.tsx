import React, { useState, useEffect } from 'react'
import { ArrowLeft, History, Sparkles } from 'lucide-react'

interface WinGoGameProps {
  onBack: () => void
  balance: number
  onUpdateBalance: (newBalance: number) => void
}

interface HistoryItem {
  period: string
  number: number
  color: 'green' | 'red' | 'violet'
  size: 'Big' | 'Small'
}

export const WinGoGame: React.FC<WinGoGameProps> = ({ onBack, balance, onUpdateBalance }) => {
  const [seconds, setSeconds] = useState(45)
  const [period, setPeriod] = useState('202611100389')
  const [selectedBet, setSelectedBet] = useState<'green' | 'violet' | 'red' | 'big' | 'small' | number | null>(null)
  const [betAmount, setBetAmount] = useState(100)
  const [placedBet, setPlacedBet] = useState<{ type: string; amount: number } | null>(null)
  const [resultModal, setResultModal] = useState<{ won: boolean; amount: number; number: number; color: string } | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([
    { period: '202611100388', number: 7, color: 'green', size: 'Big' },
    { period: '202611100387', number: 2, color: 'red', size: 'Small' },
    { period: '202611100386', number: 0, color: 'violet', size: 'Small' },
    { period: '202611100385', number: 9, color: 'green', size: 'Big' },
    { period: '202611100384', number: 4, color: 'red', size: 'Small' },
  ])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // Draw period
          handleDraw()
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [placedBet, balance])

  const handleDraw = () => {
    const drawnNumber = Math.floor(Math.random() * 10)
    let drawnColor: 'green' | 'red' | 'violet' = drawnNumber % 2 === 0 ? 'red' : 'green'
    if (drawnNumber === 0 || drawnNumber === 5) {
      drawnColor = 'violet'
    }
    const drawnSize: 'Big' | 'Small' = drawnNumber >= 5 ? 'Big' : 'Small'

    const nextPeriod = (parseInt(period, 10) + 1).toString()
    setPeriod(nextPeriod)

    // Add to history
    setHistory((prev) => [
      { period, number: drawnNumber, color: drawnColor, size: drawnSize },
      ...prev.slice(0, 7),
    ])

    // Check if user won
    if (placedBet) {
      let won = false
      let payoutMultiplier = 2

      if (placedBet.type === 'green' && (drawnColor === 'green' || drawnColor === 'violet')) {
        won = true
        payoutMultiplier = drawnColor === 'violet' ? 1.5 : 2
      } else if (placedBet.type === 'red' && (drawnColor === 'red' || drawnColor === 'violet')) {
        won = true
        payoutMultiplier = drawnColor === 'violet' ? 1.5 : 2
      } else if (placedBet.type === 'violet' && drawnColor === 'violet') {
        won = true
        payoutMultiplier = 4.5
      } else if (placedBet.type === 'big' && drawnSize === 'Big') {
        won = true
        payoutMultiplier = 2
      } else if (placedBet.type === 'small' && drawnSize === 'Small') {
        won = true
        payoutMultiplier = 2
      } else if (typeof placedBet.type === 'number' && placedBet.type === drawnNumber) {
        won = true
        payoutMultiplier = 9
      }

      if (won) {
        const winAmount = placedBet.amount * payoutMultiplier
        onUpdateBalance(balance + winAmount)
        setResultModal({ won: true, amount: winAmount, number: drawnNumber, color: drawnColor })
      } else {
        setResultModal({ won: false, amount: placedBet.amount, number: drawnNumber, color: drawnColor })
      }
      setPlacedBet(null)
    }
  }

  const handlePlaceBet = () => {
    if (!selectedBet) return
    if (seconds <= 5) {
      alert('Betting closed for this period! Please wait for next draw.')
      return
    }
    if (balance < betAmount) {
      alert('Insufficient wallet balance! Please deposit to continue.')
      return
    }

    onUpdateBalance(balance - betAmount)
    setPlacedBet({ type: selectedBet.toString(), amount: betAmount })
  }

  return (
    <div className="wingo-wrapper">
      {/* Top Bar */}
      <div className="game-top-bar">
        <button onClick={onBack} className="btn-back">
          <ArrowLeft size={18} />
          <span>Lobby</span>
        </button>
        <div className="game-title-badge">
          <Sparkles size={16} className="text-emerald-400" />
          <span>Win Go 1Min</span>
        </div>
        <div className="game-balance">
          <span>₹{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Header Countdown Card */}
      <div className="wingo-clock-card">
        <div className="period-box">
          <span className="lbl">Period</span>
          <span className="val">{period}</span>
        </div>
        <div className="countdown-box">
          <span className="lbl">Time Remaining</span>
          <div className="timer-digits">
            <span className="digit">0</span>
            <span className="digit">0</span>
            <span className="colon">:</span>
            <span className="digit">{Math.floor(seconds / 10)}</span>
            <span className="digit">{seconds % 10}</span>
          </div>
        </div>
      </div>

      {/* Color Select Buttons */}
      <div className="wingo-colors-row">
        <button
          className={`btn-color-choice green ${selectedBet === 'green' ? 'active' : ''}`}
          onClick={() => setSelectedBet('green')}
          disabled={seconds <= 5}
        >
          <span>Green</span>
          <small>2x</small>
        </button>
        <button
          className={`btn-color-choice violet ${selectedBet === 'violet' ? 'active' : ''}`}
          onClick={() => setSelectedBet('violet')}
          disabled={seconds <= 5}
        >
          <span>Violet</span>
          <small>4.5x</small>
        </button>
        <button
          className={`btn-color-choice red ${selectedBet === 'red' ? 'active' : ''}`}
          onClick={() => setSelectedBet('red')}
          disabled={seconds <= 5}
        >
          <span>Red</span>
          <small>2x</small>
        </button>
      </div>

      {/* Number Select Row (0 to 9) */}
      <div className="wingo-numbers-grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const isGreen = n % 2 !== 0 && n !== 5
          const isRed = n % 2 === 0 && n !== 0
          return (
            <button
              key={n}
              className={`num-btn ${isGreen ? 'green-bg' : isRed ? 'red-bg' : 'violet-bg'} ${
                selectedBet === n ? 'selected' : ''
              }`}
              onClick={() => setSelectedBet(n)}
              disabled={seconds <= 5}
            >
              {n}
            </button>
          )
        })}
      </div>

      {/* Big / Small Row */}
      <div className="wingo-bigsmall-row">
        <button
          className={`btn-bigsmall orange ${selectedBet === 'big' ? 'active' : ''}`}
          onClick={() => setSelectedBet('big')}
          disabled={seconds <= 5}
        >
          Big (5-9) 2x
        </button>
        <button
          className={`btn-bigsmall blue ${selectedBet === 'small' ? 'active' : ''}`}
          onClick={() => setSelectedBet('small')}
          disabled={seconds <= 5}
        >
          Small (0-4) 2x
        </button>
      </div>

      {/* Bet Amount Selector */}
      <div className="wingo-bet-selector">
        <span className="bet-lbl">Select Amount:</span>
        <div className="chips-row">
          {[10, 50, 100, 500, 1000].map((amt) => (
            <button
              key={amt}
              className={`chip-btn ${betAmount === amt ? 'active' : ''}`}
              onClick={() => setBetAmount(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Bet Button */}
      <button
        className="btn-confirm-bet"
        onClick={handlePlaceBet}
        disabled={!selectedBet || seconds <= 5 || placedBet !== null}
      >
        {placedBet
          ? `Bet Placed: ₹${placedBet.amount} on ${placedBet.type.toUpperCase()}`
          : seconds <= 5
          ? 'Betting Closed - Drawing...'
          : `Place Bet ₹${betAmount}`}
      </button>

      {/* Result Modal Popup */}
      {resultModal && (
        <div className="result-modal-backdrop" onClick={() => setResultModal(null)}>
          <div className="result-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header-badge ${resultModal.won ? 'win' : 'lose'}`}>
              {resultModal.won ? '🎉 CONGRATULATIONS!' : '💔 BETTER LUCK NEXT TIME!'}
            </div>
            <div className="draw-result-circle" style={{ background: resultModal.color === 'green' ? '#10b981' : resultModal.color === 'red' ? '#ef4444' : '#8b5cf6' }}>
              <span>{resultModal.number}</span>
            </div>
            <p className="draw-info-text">
              Period Result: <strong>{resultModal.number}</strong> ({resultModal.color.toUpperCase()})
            </p>
            {resultModal.won ? (
              <div className="win-cash-tag">+₹{resultModal.amount.toFixed(2)}</div>
            ) : (
              <div className="lose-cash-tag">-₹{resultModal.amount.toFixed(2)}</div>
            )}
            <button className="btn-modal-close" onClick={() => setResultModal(null)}>
              Continue Playing
            </button>
          </div>
        </div>
      )}

      {/* History Table */}
      <div className="wingo-history-card">
        <div className="history-header">
          <History size={16} />
          <span>Recent Period History</span>
        </div>
        <div className="history-table-header">
          <span>Period</span>
          <span>Number</span>
          <span>Size</span>
          <span>Color</span>
        </div>
        {history.map((h) => (
          <div key={h.period} className="history-row">
            <span className="mono">{h.period.slice(-4)}</span>
            <span className="res-num" style={{ color: h.color === 'green' ? '#10b981' : h.color === 'red' ? '#ef4444' : '#c084fc' }}>
              {h.number}
            </span>
            <span>{h.size}</span>
            <span className={`color-dot ${h.color}`}></span>
          </div>
        ))}
      </div>
    </div>
  )
}
