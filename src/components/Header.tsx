import React from 'react'
import type { User } from '@supabase/supabase-js'
import { Crown, Wallet, Download, Headphones, Bell, LogIn, UserPlus, LogOut, RotateCw } from 'lucide-react'

interface HeaderProps {
  user: User | null
  balance: number
  onOpenAuth: (mode: 'signin' | 'signup') => void
  onOpenWallet: () => void
  onSignOut: () => void
  onOpenDownload?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  user,
  balance,
  onOpenAuth,
  onOpenWallet,
  onSignOut,
  onOpenDownload,
}) => {
  return (
    <header className="dhani-top-navbar">
      <div className="navbar-inner">
        {/* Left: Brand Logo */}
        <div className="brand-box">
          <div className="crown-badge">
            <Crown size={20} className="crown-svg" />
          </div>
          <div className="brand-title-wrap">
            <h1 className="brand-logo-text">
              Dhani<span className="brand-dot">.</span><span className="brand-win">win</span>
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="navbar-right">
          {/* App download button */}
          <button className="btn-app-download" onClick={onOpenDownload}>
            <Download size={14} />
            <span>App</span>
          </button>

          {/* Customer Service */}
          <button className="btn-icon-nav" title="Customer Service">
            <Headphones size={18} />
          </button>

          {/* Notifications */}
          <button className="btn-icon-nav" title="Notice">
            <Bell size={18} />
            <span className="red-dot"></span>
          </button>

          {/* Auth / Balance */}
          {user ? (
            <div className="logged-user-deck">
              <button className="chip-balance" onClick={onOpenWallet}>
                <Wallet size={14} className="wallet-ico" />
                <span className="bal-txt">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                <RotateCw size={12} className="spin-hover" />
              </button>
              <button className="btn-icon-nav logout" onClick={onSignOut} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="guest-action-deck">
              <button className="btn-dhani-login" onClick={() => onOpenAuth('signin')}>
                <LogIn size={13} />
                <span>Log in</span>
              </button>
              <button className="btn-dhani-register" onClick={() => onOpenAuth('signup')}>
                <UserPlus size={13} />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
