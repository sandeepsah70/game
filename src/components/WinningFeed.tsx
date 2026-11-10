import React, { useState, useEffect } from 'react'
import { Trophy, Crown, Sparkles } from 'lucide-react'

interface Winner {
  id: number
  user: string
  game: string
  amount: number
  avatar: string
}

const INITIAL_WINNERS: Winner[] = [
  { id: 1, user: 'User 98***71', game: 'Win Go 1Min', amount: 3450, avatar: '👤' },
  { id: 2, user: 'User 70***19', game: 'Aviator', amount: 18200, avatar: '⚡' },
  { id: 3, user: 'User 81***90', game: 'Fortune Gems 2', amount: 8900, avatar: '👑' },
  { id: 4, user: 'User 91***34', game: 'Chicken Road', amount: 4600, avatar: '🔥' },
  { id: 5, user: 'User 95***82', game: 'Turbo Mines', amount: 12500, avatar: '💎' },
]

export const WinningFeed: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS)

  useEffect(() => {
    const games = ['Win Go 1Min', 'Aviator', 'Fortune Gems 2', 'Chicken Road', 'Turbo Mines', 'Vortex']
    const avatars = ['👤', '⚡', '👑', '🔥', '💎', '🎯']

    const interval = setInterval(() => {
      const randomUser = `User ${Math.floor(10 + Math.random() * 89)}***${Math.floor(10 + Math.random() * 89)}`
      const randomGame = games[Math.floor(Math.random() * games.length)]
      const randomAmount = Math.floor(800 + Math.random() * 25000)
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
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dw-feed-section">
      {/* Champion Podium (Top 3 Daily Winners) */}
      <div className="champion-podium-card">
        <div className="podium-title-row">
          <Crown size={16} className="text-amber-400" />
          <span>TODAY'S TOP WINNING STARS</span>
          <Sparkles size={14} className="text-amber-400" />
        </div>

        <div className="podium-trio">
          {/* 2nd Place */}
          <div className="podium-slot rank-2">
            <div className="crown-badge-mini silver">🥈</div>
            <div className="podium-avatar">👤</div>
            <span className="p-user">98***43</span>
            <span className="p-amt">₹892,400</span>
          </div>

          {/* 1st Place */}
          <div className="podium-slot rank-1">
            <div className="crown-badge-mini gold">👑 1st</div>
            <div className="podium-avatar gold-ring">🤴</div>
            <span className="p-user gold-txt">91***88</span>
            <span className="p-amt gold-txt">₹1,450,200</span>
          </div>

          {/* 3rd Place */}
          <div className="podium-slot rank-3">
            <div className="crown-badge-mini bronze">🥉</div>
            <div className="podium-avatar">👤</div>
            <span className="p-user">70***12</span>
            <span className="p-amt">₹635,100</span>
          </div>
        </div>
      </div>

      {/* Live Ticker Header */}
      <div className="feed-header">
        <div className="feed-title-box">
          <Trophy size={16} className="trophy-gold" />
          <span className="feed-title">REAL-TIME WINNING FEED</span>
        </div>
        <span className="live-pulse-badge">
          <span className="pulse-dot"></span> LIVE PAYOUTS
        </span>
      </div>

      {/* Live List */}
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
