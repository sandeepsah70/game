import React, { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'
import { LogOut, Trophy, Shield, Zap, Sparkles, User as UserIcon, Gamepad2 } from 'lucide-react'
import { SpaceDefender } from './SpaceDefender'

interface DashboardProps {
  user: User
  onSignOut?: () => void
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [inGame, setInGame] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const gamerName =
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Player'

  if (inGame) {
    return <SpaceDefender onBack={() => setInGame(false)} gamerName={gamerName} />
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="brand">
          <Sparkles className="brand-icon" size={24} />
          <span>GAME ARENA</span>
        </div>
        <div className="user-nav">
          <div className="user-badge">
            <span className="online-indicator"></span>
            <span className="user-name">{gamerName}</span>
          </div>
          <button onClick={handleSignOut} className="signout-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Hero Card */}
        <div className="hero-banner">
          <div className="hero-content">
            <span className="rank-tag">RANK: ROOKIE CHALLENGER</span>
            <h1>Welcome back, <span className="highlight-text">{gamerName}</span>!</h1>
            <p>
              Your Supabase account is active and connected. Jump into the Cyber Defender arena or check your stats below.
            </p>
            <div className="hero-actions">
              <button className="play-btn" onClick={() => setInGame(true)}>
                <Gamepad2 size={18} />
                <span>Play Cyber Defender</span>
              </button>
              <button className="secondary-btn">
                <Trophy size={18} />
                <span>Leaderboard</span>
              </button>
            </div>
          </div>
          <div className="hero-glow-card">
            <Shield size={48} className="shield-icon" />
            <div className="shield-text">
              <strong>Account Verified</strong>
              <small>Protected by Supabase Auth</small>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <UserIcon size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Email Account</span>
              <span className="stat-value email-val">{user.email}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <Shield size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">User ID</span>
              <span className="stat-value uid-val">{user.id.slice(0, 14)}...</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <Zap size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Connection</span>
              <span className="stat-value live">Active Session</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
