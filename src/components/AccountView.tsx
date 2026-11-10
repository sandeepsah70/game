import React from 'react'
import type { User } from '@supabase/supabase-js'
import { Crown, Wallet, Shield, Headphones, FileText, Settings, LogOut, LogIn, ChevronRight } from 'lucide-react'

interface AccountViewProps {
  user: User | null
  balance: number
  onOpenAuth: (mode: 'signin' | 'signup') => void
  onOpenWallet: (tab?: 'deposit' | 'withdraw') => void
  onSignOut: () => void
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
  balance,
  onOpenAuth,
  onOpenWallet,
  onSignOut,
}) => {
  const userName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Guest Player')

  return (
    <div className="dw-account-container">
      {/* Profile Card */}
      <div className="account-hero-card">
        <div className="account-avatar-row">
          <div className="avatar-circle">
            <span className="avatar-icon">👑</span>
          </div>
          <div className="account-meta">
            <div className="name-row">
              <h3>{userName}</h3>
              <span className="vip-badge-pill">VIP 1</span>
            </div>
            <span className="uid-text">UID: {user ? user.id.slice(0, 10) : '889201'}</span>
            <span className="account-email">{user ? user.email : 'Not logged in (Demo Mode)'}</span>
          </div>
        </div>

        {/* Balance Card inside Account */}
        <div className="account-funds-deck">
          <div className="funds-box">
            <span className="funds-lbl">Total Balance</span>
            <span className="funds-val">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="funds-actions">
            <button className="btn-fund-act deposit" onClick={() => onOpenWallet('deposit')}>
              Deposit
            </button>
            <button className="btn-fund-act withdraw" onClick={() => onOpenWallet('withdraw')}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Menus */}
      <div className="account-menu-list">
        <div className="menu-group-card">
          <button className="menu-row-item" onClick={() => onOpenWallet()}>
            <div className="menu-icon-lbl">
              <Wallet size={18} className="text-purple-400" />
              <span>Wallet Records & History</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>

          <button className="menu-row-item">
            <div className="menu-icon-lbl">
              <FileText size={18} className="text-emerald-400" />
              <span>Betting History</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>

          <button className="menu-row-item">
            <div className="menu-icon-lbl">
              <Crown size={18} className="text-amber-400" />
              <span>VIP Privilege Rewards</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>
        </div>

        <div className="menu-group-card">
          <button className="menu-row-item">
            <div className="menu-icon-lbl">
              <Shield size={18} className="text-blue-400" />
              <span>Security Center & 2FA</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>

          <button className="menu-row-item">
            <div className="menu-icon-lbl">
              <Headphones size={18} className="text-pink-400" />
              <span>24/7 Live Customer Service</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>

          <button className="menu-row-item">
            <div className="menu-icon-lbl">
              <Settings size={18} className="text-slate-400" />
              <span>App Settings & Notifications</span>
            </div>
            <ChevronRight size={18} className="arrow-right" />
          </button>
        </div>

        {/* Auth Action */}
        <div className="account-auth-footer">
          {user ? (
            <button className="btn-signout-full" onClick={onSignOut}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          ) : (
            <div className="guest-auth-buttons">
              <button className="btn-login-full" onClick={() => onOpenAuth('signin')}>
                <LogIn size={18} />
                <span>Log In</span>
              </button>
              <button className="btn-register-full" onClick={() => onOpenAuth('signup')}>
                <span>Create Free Account</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
