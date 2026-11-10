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
  icon: string
  multiplier?: string
  hot?: boolean
}

const GAMES: GameItem[] = [
  // Trending
  {
    id: 'wingo',
    name: 'Win Go 1Min',
    category: 'lottery',
    provider: 'Dhani Original',
    rating: '5.0',
    players: '54.8K',
    badge: 'HOT 🔥',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    icon: '🎲',
    multiplier: '9.82x',
    hot: true,
  },
  {
    id: 'aviator',
    name: 'Aviator',
    category: 'original',
    provider: 'Spribe Gaming',
    rating: '5.0',
    players: '98.2K',
    badge: 'TRENDING',
    gradient: 'linear-gradient(135deg, #B91C1C 0%, #EF4444 100%)',
    icon: '🚀',
    multiplier: '100x+',
    hot: true,
  },
  {
    id: 'chicken_road',
    name: 'Chicken Road',
    category: 'original',
    provider: 'InOut Games',
    rating: '4.9',
    players: '36.4K',
    badge: 'TOP WIN',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    icon: '🐔',
    multiplier: '15x',
    hot: true,
  },
  {
    id: 'mines',
    name: 'Turbo Mines',
    category: 'original',
    provider: 'Dhani Original',
    rating: '4.9',
    players: '41.2K',
    badge: 'HIGH RATE',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
    icon: '💎',
    multiplier: '990x',
    hot: true,
  },
  {
    id: 'vortex',
    name: 'Vortex Galaxy',
    category: 'original',
    provider: 'Dhani Original',
    rating: '4.8',
    players: '28.9K',
    badge: 'POPULAR',
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
    icon: '🌀',
    multiplier: '50x',
  },
  {
    id: 'wingo_3m',
    name: 'Win Go 3Min',
    category: 'lottery',
    provider: 'Dhani Original',
    rating: '4.8',
    players: '21.5K',
    gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    icon: '⏱️',
    multiplier: '9.82x',
  },
  {
    id: 'k3_lottery',
    name: 'K3 Fast Dice',
    category: 'lottery',
    provider: 'Lottery Classic',
    rating: '4.7',
    players: '17.3K',
    gradient: 'linear-gradient(135deg, #BE123C 0%, #F43F5E 100%)',
    icon: '🎯',
    multiplier: '80x',
  },
  {
    id: 'fortune_gems',
    name: 'Fortune Gems 2',
    category: 'slots',
    provider: 'JILI Games',
    rating: '4.9',
    players: '46.1K',
    badge: 'JACKPOT',
    gradient: 'linear-gradient(135deg, #7E22CE 0%, #A855F7 100%)',
    icon: '🎰',
    multiplier: '10,000x',
  },
  {
    id: 'super_ace',
    name: 'Super Ace',
    category: 'slots',
    provider: 'JILI Games',
    rating: '4.8',
    players: '39.4K',
    gradient: 'linear-gradient(135deg, #B45309 0%, #F59E0B 100%)',
    icon: '🃏',
    multiplier: '1,500x',
  },
  {
    id: 'teen_patti',
    name: 'Royal Teen Patti',
    category: 'casino',
    provider: 'King Live',
    rating: '4.9',
    players: '33.2K',
    badge: 'LIVE',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    icon: '♠️',
    multiplier: 'Instant',
  },
  {
    id: 'andar_bahar',
    name: 'Andar Bahar',
    category: 'casino',
    provider: 'Ezugi Live',
    rating: '4.8',
    players: '27.8K',
    gradient: 'linear-gradient(135deg, #15803D 0%, #22C55E 100%)',
    icon: '🪙',
    multiplier: '2.0x',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'hot', label: 'Popular', icon: Flame },
  { id: 'lottery', label: 'Lottery', icon: Sparkles },
  { id: 'original', label: 'Original', icon: Zap },
  { id: 'slots', label: 'Slots', icon: Compass },
  { id: 'casino', label: 'Casino', icon: Swords },
]

interface GameLobbyProps {
  onPlayGame: (gameId: string) => void
}

export const GameLobby: React.FC<GameLobbyProps> = ({ onPlayGame }) => {
  const [activeTab, setActiveTab] = useState('all')

  const filteredGames = GAMES.filter((g) => {
    if (activeTab === 'all') return true
    if (activeTab === 'hot') return g.hot === true
    return g.category === activeTab
  })

  return (
    <section className="dhani-game-lobby">
      {/* Scrollable Category Tabs */}
      <div className="category-scroll-bar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              className={`cat-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Grid of Game Cards */}
      <div className="games-grid-container">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="dhani-game-card"
            onClick={() => onPlayGame(game.id)}
          >
            {/* Card Thumbnail */}
            <div className="game-thumb-box" style={{ background: game.gradient }}>
              {game.badge && <span className="game-badge-tag">{game.badge}</span>}
              {game.multiplier && (
                <span className="game-mult-tag">
                  <Trophy size={10} /> {game.multiplier}
                </span>
              )}
              <div className="game-emoji-symbol">{game.icon}</div>
              <div className="hover-play-veil">
                <div className="play-button-circle">
                  <Play size={18} fill="#22143B" />
                </div>
                <span>PLAY</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="game-card-footer">
              <span className="game-title">{game.name}</span>
              <div className="game-meta-row">
                <span className="game-prov">{game.provider}</span>
                <span className="game-online-count">{game.players}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
