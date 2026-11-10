import React, { useState } from 'react'
import { ArrowLeft, Trophy, RotateCw, Sparkles } from 'lucide-react'

interface SlotGameProps {
  onBack: () => void
  balance: number
  onUpdateBalance: (newBalance: number) => void
}

const SYMBOLS = ['💎', '7️⃣', '👑', '🍇', '🔔', '⭐', '🍒']
const PAYOUTS: Record<string, number> = {
  '7️⃣': 20, // 20x for three 7s
  '👑': 15, // 15x for three crowns
  '💎': 10, // 10x for three gems
  '⭐': 8,  // 8x for three stars
  '🔔': 5,  // 5x for three bells
  '🍇': 3,  // 3x for three grapes
  '🍒': 2,  // 2x for three cherries
}

export const SlotGame: React.FC<SlotGameProps> = ({ onBack, balance, onUpdateBalance }) => {
  const [reels, setReels] = useState<string[][]>([
    ['💎', '7️⃣', '👑'],
    ['⭐', '7️⃣', '🔔'],
    ['🍇', '7️⃣', '🍒'],
  ])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [betAmount, setBetAmount] = useState<number>(50)
  const [winMessage, setWinMessage] = useState<string | null>(null)

  const handleSpin = () => {
    if (spinning) return
    if (balance < betAmount) {
      alert('Insufficient wallet balance!')
      return
    }

    onUpdateBalance(balance - betAmount)
    setSpinning(true)
    setWinMessage(null)

    // Spin animation intervals
    let spinsLeft = 16
    const interval = setInterval(() => {
      setReels([
        [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ],
        [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ],
        [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ],
      ])

      spinsLeft--
      if (spinsLeft <= 0) {
        clearInterval(interval)

        // Decide final result (chance to win)
        const isWin = Math.random() < 0.38
        let finalReels: string[][]

        if (isWin) {
          const winningSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          // Match the middle row!
          finalReels = [
            [SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], winningSym, SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]],
            [SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], winningSym, SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]],
            [SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], winningSym, SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]],
          ]
          const mult = PAYOUTS[winningSym] || 5
          const payout = betAmount * mult
          onUpdateBalance(balance - betAmount + payout)
          setWinMessage(`🎉 WIN! 3x ${winningSym} paid ₹${payout} (${mult}x)!`)
        } else {
          finalReels = [
            [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]],
            [SYMBOLS[3], SYMBOLS[4], SYMBOLS[5]],
            [SYMBOLS[6], SYMBOLS[0], SYMBOLS[1]],
          ]
        }

        setReels(finalReels)
        setSpinning(false)
      }
    }, 90)
  }

  return (
    <div className="slot-game-wrapper">
      {/* Top Bar */}
      <div className="game-top-bar">
        <button onClick={onBack} className="btn-back">
          <ArrowLeft size={18} />
          <span>Lobby</span>
        </button>
        <div className="game-title-badge slot-title">
          <Sparkles size={16} className="text-amber-400" />
          <span>Fortune Gems 2</span>
        </div>
        <div className="game-balance">
          <span>₹{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Slot Machine Cabinet */}
      <div className="slot-cabinet">
        <div className="slot-marquee-header">
          <div className="jackpot-counter">
            <span className="lbl">MEGA JACKPOT</span>
            <span className="val">₹14,892,450.00</span>
          </div>
        </div>

        {/* 3 Reels Display */}
        <div className="reels-frame">
          <div className="payline-indicator left">▶</div>
          <div className="reels-container">
            {reels.map((col, colIdx) => (
              <div key={colIdx} className={`slot-reel ${spinning ? 'blur-spin' : ''}`}>
                {col.map((sym, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`symbol-cell ${rowIdx === 1 ? 'middle-payline' : ''}`}
                  >
                    <span className="sym-icon">{sym}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="payline-indicator right">◀</div>
        </div>

        {/* Win Alert */}
        {winMessage && (
          <div className="slot-win-banner">
            <Trophy size={18} className="trophy-gold" />
            <span>{winMessage}</span>
          </div>
        )}

        {/* Betting and Controls */}
        <div className="slot-control-bar">
          <div className="bet-chip-row">
            <span className="lbl">Bet:</span>
            {[20, 50, 100, 200, 500].map((amt) => (
              <button
                key={amt}
                className={`chip-btn ${betAmount === amt ? 'active' : ''}`}
                onClick={() => setBetAmount(amt)}
                disabled={spinning}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <button
            className={`btn-spin-big ${spinning ? 'spinning' : ''}`}
            onClick={handleSpin}
            disabled={spinning}
          >
            <RotateCw size={22} className={spinning ? 'spin-anim' : ''} />
            <span>{spinning ? 'SPINNING...' : `SPIN ₹${betAmount}`}</span>
          </button>
        </div>

        {/* Payout Table Mini */}
        <div className="slot-payout-table">
          <span className="payout-title">PAYTABLE (3 of a kind on middle payline)</span>
          <div className="payout-chips">
            <span>7️⃣ = 20x</span>
            <span>👑 = 15x</span>
            <span>💎 = 10x</span>
            <span>⭐ = 8x</span>
            <span>🔔 = 5x</span>
            <span>🍇 = 3x</span>
          </div>
        </div>
      </div>
    </div>
  )
}
