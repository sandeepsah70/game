import React, { useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'

interface Winner {
  id: number
  user: string
  game: string
  amount: number
  avatar: string
}

const INITIAL_WINNERS: Winner[] = [
  { id: 1, user: 'User 98***71', game: 'Win Go 1Min', amount: 3450, avatar: '👤' },
  { id: 2, user: 'User 70***19', game: 'Aviator Pro', amount: 18200, avatar: '⚡' },
  { id: 3, user: 'User 81***90', game: 'Fortune Gems', amount: 8900, avatar: '👑' },
  { id: 4, user: 'User 91***34', game: 'Chicken Road', amount: 4600, avatar: '🔥' },
  { id: 5, user: 'User 95***82', game: 'Vortex Galaxy', amount: 12500, avatar: '💎' },
]

export const WinningFeed: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS)

  useEffect(() => {
    const games = ['Win Go 1Min', 'Aviator Pro', 'Fortune Gems 2', 'Vortex', 'Super Ace', 'Turbo Mines']
    const avatars = ['👤', '⚡', '👑', '🔥', '💎', '🎯']

    const interval = setInterval(() => {
      const randomUser = `User ${Math.floor(10 + Math.random() * 89)}***${Math.floor(10 + Math.random() * 89)}`
      const randomGame = games[Math.floor(Math.random() * games.length)]
      const randomAmount = Math.floor(800 + Math.random() * 22000)
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

      setWinners((prev) => [
        {
          id: Date.now(),
          user: randomUser,
          game: randomGame,
          amount: randomAmount,
          avatar: randomAvatar,
        },
        ...prev.slice(0, 5),
      ])
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dw-feed-section">
      <div className="feed-header">
        <div className="feed-title-box">
          <Trophy size={18} className="trophy-gold" />
          <span className="feed-title">REAL-TIME WINNING FEED</span>
        </div>
        <span className="live-pulse-badge">
          <span className="pulse-dot"></span> LIVE PAYOUTS
        </span>
      </div>

      <div className="feed-list">
        {winners.map((w) => (
          <div key={w.id} className="feed-item">
            <div className="feed-avatar">{w.avatar}</div>
            <div className="feed-info">
              <span className="feed-user">{w.user}</span>
              <span className="feed-game">{w.game}</span>
            </div>
            <div className="feed-cash">
              <span className="cash-plus">+₹{w.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
