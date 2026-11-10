import React from 'react'
import { Home, Gift, Share2, Wallet, User } from 'lucide-react'

interface BottomNavProps {
  activeTab: 'home' | 'activity' | 'promotion' | 'wallet' | 'account'
  onSelectTab: (tab: 'home' | 'activity' | 'promotion' | 'wallet' | 'account') => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="dw-bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onSelectTab('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
        onClick={() => onSelectTab('activity')}
      >
        <Gift size={20} />
        <span>Activity</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'promotion' ? 'active' : ''}`}
        onClick={() => onSelectTab('promotion')}
      >
        <Share2 size={20} />
        <span>Promotion</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
        onClick={() => onSelectTab('wallet')}
      >
        <Wallet size={20} />
        <span>Wallet</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
        onClick={() => onSelectTab('account')}
      >
        <User size={20} />
        <span>Account</span>
      </button>
    </nav>
  )
}
