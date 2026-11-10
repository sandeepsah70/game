import React from 'react'
import { Volume2, ArrowDownToLine, ArrowUpFromLine, Crown, Gift, Share2, Headphones, Flame } from 'lucide-react'

interface QuickActionsProps {
  balance: number
  onOpenWallet: (tab?: 'deposit' | 'withdraw') => void
  onOpenCheckin: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({ balance, onOpenWallet, onOpenCheckin }) => {
  return (
    <div className="home-quick-actions">
      {/* 1. Yellow Megaphone Notice Bar */}
      <div className="dhani-notice-bar">
        <div className="notice-icon-box">
          <Volume2 size={16} className="text-amber-400" />
        </div>
        <div className="notice-track">
          <div className="notice-scroller">
            🔥 Welcome to Dhani.win – Where wealth happens! Play top trending games like Wingo, Vortex, Chicken Road, and Aviator—all in one place. Enjoy rich events, high win potential, and massive rewards every day!
          </div>
        </div>
        <div className="notice-hot-badge">
          <Flame size={12} /> Hot
        </div>
      </div>

      {/* 2. Wallet Assets Card (Like Dhaniwin Home Header) */}
      <div className="home-wallet-card">
        <div className="wallet-card-left">
          <span className="wallet-title">Total Balance</span>
          <span className="wallet-balance-val">
            ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="wallet-card-right">
          <button className="btn-wallet-main deposit" onClick={() => onOpenWallet('deposit')}>
            <ArrowDownToLine size={15} />
            <span>Deposit</span>
          </button>
          <button className="btn-wallet-main withdraw" onClick={() => onOpenWallet('withdraw')}>
            <ArrowUpFromLine size={15} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* 3. 4-Icon Feature Row */}
      <div className="feature-icons-grid">
        <button className="feature-icon-item" onClick={() => onOpenWallet('deposit')}>
          <div className="icon-circle gold">
            <ArrowDownToLine size={22} />
          </div>
          <span className="feature-name">Deposit</span>
          <span className="feature-badge-gold">+100%</span>
        </button>

        <button className="feature-icon-item" onClick={onOpenCheckin}>
          <div className="icon-circle purple">
            <Crown size={22} />
          </div>
          <span className="feature-name">VIP Club</span>
        </button>

        <button className="feature-icon-item" onClick={onOpenCheckin}>
          <div className="icon-circle pink">
            <Gift size={22} />
          </div>
          <span className="feature-name">Daily Bonus</span>
          <span className="feature-badge-red">Free</span>
        </button>

        <button className="feature-icon-item" onClick={onOpenCheckin}>
          <div className="icon-circle cyan">
            <Share2 size={22} />
          </div>
          <span className="feature-name">Invite</span>
        </button>

        <button className="feature-icon-item">
          <div className="icon-circle green">
            <Headphones size={22} />
          </div>
          <span className="feature-name">Support</span>
        </button>
      </div>
    </div>
  )
}
