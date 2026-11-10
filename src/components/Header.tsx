import React from 'react'
import type { User } from '@supabase/supabase-js'
import { Crown, Wallet, Download, Headphones, Bell, LogIn, UserPlus, LogOut } from 'lucide-react'

interface HeaderProps {
  user: User | null
  balance: number
  onOpenAuth: (mode: 'signin' | 'signup') => void
  onOpenWallet: () => void
  onSignOut: () => void
}

export const Header: React.FC<HeaderProps> = ({
  user,
  balance,
  onOpenAuth,
  onOpenWallet,
  onSignOut,
}) => {
  return (
    <header className="dw-header">
      <div className="dw-header-container">
        {/* Brand Logo */}
        <div className="dw-brand">
          <div className="dw-logo-badge">
            <Crown size={22} className="crown-icon" />
          </div>
          <div className="dw-brand-text">
            <span className="brand-primary">DHANI<span className="gold-accent">.WIN</span></span>
            <span className="brand-tagline">WHERE WEALTH HAPPENS</span>
          </div>
        </div>

        {/* Right Action Icons & Auth */}
        <div className="dw-header-actions">
          {/* Download App & Support */}
          <button className="icon-action-btn" title="Download App">
            <Download size={18} />
            <span className="btn-label-desktop">App</span>
          </button>

          <button className="icon-action-btn" title="24/7 Live Support">
            <Headphones size={18} />
          </button>

          <button className="icon-action-btn" title="Notifications">
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>

          {/* User state / Auth buttons */}
          {user ? (
            <div className="dw-user-status">
              <button className="dw-balance-chip" onClick={onOpenWallet}>
                <Wallet size={15} className="wallet-icon" />
                <span className="balance-amount">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </button>
              <div className="dw-user-info">
                <span className="user-email-tag">{user.email?.split('@')[0]}</span>
              </div>
              <button className="dw-btn-signout" onClick={onSignOut} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="dw-auth-buttons">
              <button className="dw-btn-login" onClick={() => onOpenAuth('signin')}>
                <LogIn size={15} />
                <span>Log In</span>
              </button>
              <button className="dw-btn-register" onClick={() => onOpenAuth('signup')}>
                <UserPlus size={15} />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
