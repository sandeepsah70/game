import React, { useState } from 'react'
import { ArrowLeft, Bomb, Gem, Trophy } from 'lucide-react'

interface MinesGameProps {
  onBack: () => void
  balance: number
  onUpdateBalance: (newBalance: number) => void
}

interface Tile {
  id: number
  isMine: boolean
  revealed: boolean
}

export const MinesGame: React.FC<MinesGameProps> = ({ onBack, balance, onUpdateBalance }) => {
  const [mineCount, setMineCount] = useState<number>(3)
  const [betAmount, setBetAmount] = useState<number>(100)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [tiles, setTiles] = useState<Tile[]>(() =>
    Array.from({ length: 25 }, (_, i) => ({ id: i, isMine: false, revealed: false }))
  )
  const [gemsFound, setGemsFound] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [won, setWon] = useState<boolean>(false)
  const [cashedOutAmount, setCashedOutAmount] = useState<number | null>(null)

  // Multiplier calculation based on mines and gems revealed
  const getMultiplier = (gems: number) => {
    if (gems === 0) return 1.0
    // Standard provably fair multiplier formula approximation
    let mult = 1.0
    for (let i = 0; i < gems; i++) {
      mult *= (25 - i) / (25 - mineCount - i)
    }
    return parseFloat((mult * 0.98).toFixed(2)) // 2% house edge
  }

  const currentMultiplier = getMultiplier(gemsFound)
  const currentPayout = parseFloat((betAmount * currentMultiplier).toFixed(2))

  const startGame = () => {
    if (balance < betAmount) {
      alert('Insufficient wallet balance!')
      return
    }

    onUpdateBalance(balance - betAmount)
    setIsPlaying(true)
    setIsGameOver(false)
    setWon(false)
    setGemsFound(0)
    setCashedOutAmount(null)

    // Place random mines
    const mineIndices = new Set<number>()
    while (mineIndices.size < mineCount) {
      mineIndices.add(Math.floor(Math.random() * 25))
    }

    setTiles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        isMine: mineIndices.has(i),
        revealed: false,
      }))
    )
  }

  const handleTileClick = (id: number) => {
    if (!isPlaying || isGameOver || tiles[id].revealed) return

    const tile = tiles[id]
    if (tile.isMine) {
      // Hit a mine! Game over
      setTiles((prev) =>
        prev.map((t) => (t.id === id ? { ...t, revealed: true } : t.isMine ? { ...t, revealed: true } : t))
      )
      setIsGameOver(true)
      setIsPlaying(false)
      setWon(false)
    } else {
      // Found a Gem!
      const newTiles = tiles.map((t) => (t.id === id ? { ...t, revealed: true } : t))
      setTiles(newTiles)
      const nextGems = gemsFound + 1
      setGemsFound(nextGems)

      // If all gems cleared
      if (nextGems === 25 - mineCount) {
        const finalWin = parseFloat((betAmount * getMultiplier(nextGems)).toFixed(2))
        onUpdateBalance(balance + finalWin)
        setCashedOutAmount(finalWin)
        setIsGameOver(true)
        setIsPlaying(false)
        setWon(true)
      }
    }
  }

  const handleCashout = () => {
    if (!isPlaying || isGameOver || gemsFound === 0) return

    onUpdateBalance(balance + currentPayout)
    setCashedOutAmount(currentPayout)
    setIsGameOver(true)
    setIsPlaying(false)
    setWon(true)

    // Reveal rest of board
    setTiles((prev) => prev.map((t) => ({ ...t, revealed: true })))
  }

  return (
    <div className="mines-wrapper">
      {/* Top Bar */}
      <div className="game-top-bar">
        <button onClick={onBack} className="btn-back">
          <ArrowLeft size={18} />
          <span>Lobby</span>
        </button>
        <div className="game-title-badge mines-title">
          <Gem size={16} className="text-cyan-400" />
          <span>Turbo Mines</span>
        </div>
        <div className="game-balance">
          <span>₹{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Stats Header */}
      <div className="mines-stats-banner">
        <div className="stat-pill">
          <span className="lbl">Gems Found</span>
          <span className="val cyan">{gemsFound} / {25 - mineCount}</span>
        </div>
        <div className="stat-pill">
          <span className="lbl">Current Multiplier</span>
          <span className="val gold">{currentMultiplier}x</span>
        </div>
        <div className="stat-pill">
          <span className="lbl">Next Value</span>
          <span className="val green">₹{currentPayout}</span>
        </div>
      </div>

      {/* 5x5 Grid */}
      <div className="mines-grid">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`mine-tile ${tile.revealed ? (tile.isMine ? 'mine' : 'gem') : ''} ${
              !isPlaying ? 'disabled' : ''
            }`}
            onClick={() => handleTileClick(tile.id)}
            disabled={!isPlaying || tile.revealed}
          >
            {tile.revealed ? (
              tile.isMine ? (
                <Bomb size={24} className="bomb-icon animate-bounce" />
              ) : (
                <Gem size={26} className="gem-icon animate-pulse" />
              )
            ) : (
              <span className="tile-dot"></span>
            )}
          </button>
        ))}
      </div>

      {/* Win / Loss Notice */}
      {isGameOver && (
        <div className={`mines-result-toast ${won ? 'win' : 'lose'}`}>
          {won ? (
            <div>
              🎉 <strong>Cashed out ₹{cashedOutAmount}!</strong> Multiplier: {currentMultiplier}x
            </div>
          ) : (
            <div>
              💥 <strong>BOOM! You hit a mine.</strong> Better luck next round!
            </div>
          )}
        </div>
      )}

      {/* Controls Deck */}
      <div className="mines-control-deck">
        {!isPlaying ? (
          <>
            <div className="mines-config-row">
              <div className="config-group">
                <label>Number of Mines</label>
                <div className="mine-chip-row">
                  {[1, 3, 5, 10].map((m) => (
                    <button
                      key={m}
                      className={`chip-btn ${mineCount === m ? 'active' : ''}`}
                      onClick={() => setMineCount(m)}
                    >
                      {m} 💣
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-group">
                <label>Bet Amount (₹)</label>
                <div className="bet-input-row">
                  <button onClick={() => setBetAmount(Math.max(10, betAmount - 50))}>-</button>
                  <span className="bet-val">₹{betAmount}</span>
                  <button onClick={() => setBetAmount(betAmount + 50)}>+</button>
                </div>
              </div>
            </div>

            <button className="btn-mines-start" onClick={startGame}>
              Start Game (Bet ₹{betAmount})
            </button>
          </>
        ) : (
          <div className="mines-active-deck">
            <button
              className="btn-mines-cashout"
              onClick={handleCashout}
              disabled={gemsFound === 0}
            >
              <Trophy size={18} />
              <span>Cash Out ₹{currentPayout} ({currentMultiplier}x)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
