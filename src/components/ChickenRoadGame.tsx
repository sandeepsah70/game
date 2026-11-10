import React, { useState } from 'react'
import { ArrowLeft, Trophy, Flame } from 'lucide-react'

interface ChickenRoadGameProps {
  onBack: () => void
  balance: number
  onUpdateBalance: (newBalance: number) => void
}

const LANES = [
  { step: 1, mult: 1.25, label: 'Lane 1' },
  { step: 2, mult: 1.75, label: 'Lane 2' },
  { step: 3, mult: 2.50, label: 'Lane 3' },
  { step: 4, mult: 4.20, label: 'Lane 4' },
  { step: 5, mult: 7.50, label: 'Lane 5' },
  { step: 6, mult: 15.0, label: 'Golden Barn 🏆' },
]

export const ChickenRoadGame: React.FC<ChickenRoadGameProps> = ({ onBack, balance, onUpdateBalance }) => {
  const [betAmount, setBetAmount] = useState<number>(100)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isCrashed, setIsCrashed] = useState<boolean>(false)
  const [wonAmount, setWonAmount] = useState<number | null>(null)

  const currentMultiplier = currentStep > 0 ? LANES[currentStep - 1].mult : 1.0
  const currentCash = parseFloat((betAmount * currentMultiplier).toFixed(2))

  const startGame = () => {
    if (balance < betAmount) {
      alert('Insufficient wallet balance!')
      return
    }

    onUpdateBalance(balance - betAmount)
    setIsPlaying(true)
    setIsCrashed(false)
    setCurrentStep(0)
    setWonAmount(null)
  }

  const handleStepForward = () => {
    if (!isPlaying || isCrashed) return

    // 80% chance safe at early steps, slightly decreasing
    const safeChance = 0.82 - currentStep * 0.05
    const isSafe = Math.random() < safeChance

    if (isSafe) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)

      if (nextStep === LANES.length) {
        // Reached golden barn!
        const finalWin = parseFloat((betAmount * LANES[LANES.length - 1].mult).toFixed(2))
        onUpdateBalance(balance + finalWin)
        setWonAmount(finalWin)
        setIsPlaying(false)
      }
    } else {
      // Hit by car!
      setIsCrashed(true)
      setIsPlaying(false)
    }
  }

  const handleCashout = () => {
    if (!isPlaying || currentStep === 0) return

    onUpdateBalance(balance + currentCash)
    setWonAmount(currentCash)
    setIsPlaying(false)
  }

  return (
    <div className="chicken-wrapper">
      {/* Top Bar */}
      <div className="game-top-bar">
        <button onClick={onBack} className="btn-back">
          <ArrowLeft size={18} />
          <span>Lobby</span>
        </button>
        <div className="game-title-badge chicken-title">
          <Flame size={16} className="text-amber-400" />
          <span>Chicken Road</span>
        </div>
        <div className="game-balance">
          <span>₹{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Road View */}
      <div className="road-container">
        {LANES.slice().reverse().map((lane) => {
          const isCurrent = currentStep === lane.step
          const isPassed = currentStep > lane.step
          return (
            <div
              key={lane.step}
              className={`road-lane ${isCurrent ? 'current' : ''} ${isPassed ? 'passed' : ''}`}
            >
              <div className="lane-meta">
                <span className="lane-label">{lane.label}</span>
                <span className="lane-mult">{lane.mult}x</span>
              </div>
              <div className="lane-actor">
                {isCurrent ? (
                  isCrashed ? (
                    <span className="crash-icon">💥🚙</span>
                  ) : (
                    <span className="chicken-icon bounce">🐔</span>
                  )
                ) : isPassed ? (
                  <span className="safe-mark">✅</span>
                ) : (
                  <span className="lane-dash">- - - -</span>
                )}
              </div>
            </div>
          )
        })}

        {/* Start Line */}
        <div className={`road-start-line ${currentStep === 0 ? 'active' : ''}`}>
          <span>STARTING CURB</span>
          {currentStep === 0 && isPlaying && <span className="chicken-icon">🐔</span>}
        </div>
      </div>

      {/* Result feedback */}
      {isCrashed && (
        <div className="chicken-toast crash">
          💥 <strong>A car zoomed by!</strong> The chicken was hit. Better luck next cross!
        </div>
      )}

      {wonAmount && (
        <div className="chicken-toast win">
          🎉 <strong>Safe Cashout: +₹{wonAmount}!</strong> Great timing!
        </div>
      )}

      {/* Control panel */}
      <div className="chicken-control-panel">
        {!isPlaying ? (
          <>
            <div className="bet-amount-deck">
              <label>Select Bet Amount</label>
              <div className="chips-row">
                {[50, 100, 200, 500, 1000].map((amt) => (
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

            <button className="btn-chicken-start" onClick={startGame}>
              Start Crossing (₹{betAmount})
            </button>
          </>
        ) : (
          <div className="chicken-actions-deck">
            <button className="btn-step-forward" onClick={handleStepForward}>
              <span>CROSS NEXT LANE 🐔</span>
            </button>

            <button
              className="btn-chicken-cashout"
              onClick={handleCashout}
              disabled={currentStep === 0}
            >
              <Trophy size={16} />
              <span>Cash Out ₹{currentCash} ({currentMultiplier}x)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

