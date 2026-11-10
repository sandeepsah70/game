import React, { useState } from 'react'
import { Flame, Sparkles, Zap, Trophy, Play, Layers, Compass, Swords } from 'lucide-react'

export interface GameItem {
  id: string
  name: string
  category: 'hot' | 'lottery' | 'original' | 'slots' | 'casino'
  provider: string
  rating: string
  players: string
  badge?: string
  gradient: string
  iconType: string
  multiplier?: string
}

const GAMES: GameItem[] = [
  // Trending / Hot
  {
    id: 'wingo',
    name: 'Win Go 1Min',
    category: 'lottery',
    provider: 'Dhani Original',
    rating: '4.9 ★',
    players: '48.2K',
    badge: 'HOT 🔥',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    iconType: 'dice',
    multiplier: '9.82x',
  },
  {
    id: 'aviator',
    name: 'Aviator Pro',
    category: 'original',
    provider: 'Spribe Turbo',
    rating: '5.0 ★',
    players: '86.4K',
    badge: 'POPULAR',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 60%, #f97316 100%)',
    iconType: 'plane',
    multiplier: '100x+',
  },
  {
    id: 'vortex',
    name: 'Vortex Galaxy',
    category: 'original',
    provider: 'Dhani Original',
    rating: '4.8 ★',
    players: '31.1K',
    badge: 'NEW',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #c084fc 100%)',
    iconType: 'spiral',
    multiplier: '50x',
  },
  {
    id: 'chicken_road',
    name: 'Chicken Road',
    category: 'original',
    provider: 'InOut Games',
    rating: '4.7 ★',
    players: '22.8K',
    badge: 'TRENDING',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 60%, #fcd34d 100%)',
    iconType: 'egg',
    multiplier: '24x',
  },
  {
    id: 'wingo_3m',
    name: 'Win Go 3Min',
    category: 'lottery',
    provider: 'Dhani Original',
    rating: '4.8 ★',
    players: '19.5K',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
    iconType: 'clock',
    multiplier: '9.82x',
  },
  {
    id: 'k3_lottery',
    name: 'K3 Fast Dice',
    category: 'lottery',
    provider: 'Lottery Classic',
    rating: '4.6 ★',
    players: '14.2K',
    gradient: 'linear-gradient(135deg, #be123c 0%, #f43f5e 100%)',
    iconType: 'dice3',
    multiplier: '80x',
  },
  {
    id: 'mines',
    name: 'Turbo Mines',
    category: 'original',
    provider: 'Dhani Original',
    rating: '4.9 ★',
    players: '35.4K',
    badge: 'TOP WIN',
    gradient: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
    iconType: 'gem',
    multiplier: '990x',
  },
  {
    id: 'fortune_gems',
    name: 'Fortune Gems 2',
    category: 'slots',
    provider: 'JILI Games',
    rating: '4.9 ★',
    players: '42.7K',
    badge: 'JACKPOT',
    gradient: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)',
    iconType: 'slot',
    multiplier: '10,000x',
  },
  {
    id: 'super_ace',
    name: 'Super Ace Slots',
    category: 'slots',
    provider: 'JILI Games',
    rating: '4.8 ★',
    players: '38.9K',
    gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
    iconType: 'card',
    multiplier: '1,500x',
  },
  {
    id: 'teen_patti',
    name: 'Royal Teen Patti',
    category: 'casino',
    provider: 'King Live',
    rating: '4.9 ★',
    players: '29.3K',
    badge: 'LIVE DEALER',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    iconType: 'spade',
    multiplier: 'Instant',
  },
  {
    id: 'andar_bahar',
    name: 'Andar Bahar Live',
    category: 'casino',
    provider: 'Ezugi Live',
    rating: '4.8 ★',
    players: '25.6K',
    gradient: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
    iconType: 'chip',
    multiplier: '2.0x',
  },
  {
    id: 'space_defender',
    name: 'Space Defender Arcade',
    category: 'original',
    provider: 'Retro Arcade',
    rating: '5.0 ★',
    players: '16.9K',
    badge: 'FREE PLAY',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
    iconType: 'fighter',
    multiplier: 'Skill',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Games', icon: Layers },
  { id: 'hot', label: 'Hot Trending', icon: Flame },
  { id: 'lottery', label: 'Lottery (Wingo)', icon: Sparkles },
  { id: 'original', label: 'Original & Crash', icon: Zap },
  { id: 'slots', label: 'Slots', icon: Compass },
  { id: 'casino', label: 'Casino & Cards', icon: Swords },
]

interface GameLobbyProps {
  onPlayGame: (gameId: string) => void
}

export const GameLobby: React.FC<GameLobbyProps> = ({ onPlayGame }) => {
  const [activeTab, setActiveTab] = useState('all')

  const filteredGames = GAMES.filter((g) => {
    if (activeTab === 'all') return true
    if (activeTab === 'hot') return g.badge !== undefined
    return g.category === activeTab
  })

  return (
    <section className="dw-lobby-section">
      {/* Category Tabs Scroll Bar */}
      <div className="dw-category-bar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              className={`cat-pill ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Grid of Games */}
      <div className="dw-game-grid">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="dw-game-card"
            onClick={() => onPlayGame(game.id)}
          >
            {/* Visual Thumbnail */}
            <div className="card-thumb" style={{ background: game.gradient }}>
              {game.badge && <span className="card-badge">{game.badge}</span>}
              {game.multiplier && (
                <span className="card-multiplier">
                  <Trophy size={11} /> {game.multiplier}
                </span>
              )}
              <div className="thumb-symbol">
                {game.iconType === 'plane' && '🚀'}
                {game.iconType === 'dice' && '🎲'}
                {game.iconType === 'spiral' && '🌀'}
                {game.iconType === 'egg' && '🐔'}
                {game.iconType === 'clock' && '⏱️'}
                {game.iconType === 'dice3' && '🎯'}
                {game.iconType === 'gem' && '💎'}
                {game.iconType === 'slot' && '🎰'}
                {game.iconType === 'card' && '🃏'}
                {game.iconType === 'spade' && '♠️'}
                {game.iconType === 'chip' && '🪙'}
                {game.iconType === 'fighter' && '🛸'}
              </div>
              <div className="play-overlay">
                <div className="play-circle">
                  <Play size={20} fill="#ffffff" />
                </div>
                <span>PLAY</span>
              </div>
            </div>

            {/* Card Metadata */}
            <div className="card-body">
              <div className="card-title-row">
                <span className="game-name">{game.name}</span>
              </div>
              <div className="card-info-row">
                <span className="game-provider">{game.provider}</span>
                <span className="game-players">{game.players} online</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
