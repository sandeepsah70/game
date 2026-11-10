import React from 'react'
import { Volume2, ArrowDownToLine, ArrowUpFromLine, Crown, Gift, Share2, Award } from 'lucide-react'

interface QuickActionsProps {
  onOpenWallet: (tab?: 'deposit' | 'withdraw') => void
  onOpenCheckin: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onOpenWallet, onOpenCheckin }) => {
  return (
    <div className="dw-quick-section">
      {/* Marquee Broadcast */}
      <div className="dw-notice-ticker">
        <div className="ticker-icon">
          <Volume2 size={16} />
        </div>
        <div className="ticker-marquee">
          <span className="ticker-text">
            🔥 Welcome to Dhani.win – Where wealth happens! Instant deposits & 24/7 lightning withdrawals via UPI & Crypto. High win potential on Win Go, Aviator, Vortex, and Chicken Road!
          </span>
        </div>
        <div className="ticker-tag">Latest</div>
      </div>

      {/* 4-6 Quick Action Icon Grid */}
      <div className="dw-action-grid">
        <button className="dw-action-card deposit" onClick={() => onOpenWallet('deposit')}>
          <div className="action-icon-circle green">
            <ArrowDownToLine size={20} />
          </div>
          <span className="action-label">Deposit</span>
          <span className="action-badge">+100%</span>
        </button>

        <button className="dw-action-card withdraw" onClick={() => onOpenWallet('withdraw')}>
          <div className="action-icon-circle purple">
            <ArrowUpFromLine size={20} />
          </div>
          <span className="action-label">Withdraw</span>
          <span className="action-sub">Fast UPI</span>
        </button>

        <button className="dw-action-card vip" onClick={onOpenCheckin}>
          <div className="action-icon-circle gold">
            <Crown size={20} />
          </div>
          <span className="action-label">VIP Club</span>
          <span className="action-badge gold">Lv.1</span>
        </button>

        <button className="dw-action-card daily" onClick={onOpenCheckin}>
          <div className="action-icon-circle pink">
            <Gift size={20} />
          </div>
          <span className="action-label">Daily Rewards</span>
          <span className="action-badge red">Free</span>
        </button>

        <button className="dw-action-card invite" onClick={onOpenCheckin}>
          <div className="action-icon-circle cyan">
            <Share2 size={20} />
          </div>
          <span className="action-label">Invite Bonus</span>
          <span className="action-sub">₹500/Friend</span>
        </button>

        <button className="dw-action-card rank">
          <div className="action-icon-circle orange">
            <Award size={20} />
          </div>
          <span className="action-label">Jackpot Pool</span>
          <span className="action-sub gold">₹14.8M</span>
        </button>
      </div>
    </div>
  )
}
