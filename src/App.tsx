import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import { Header } from './components/Header'
import { BannerSlider } from './components/BannerSlider'
import { QuickActions } from './components/QuickActions'
import { GameLobby } from './components/GameLobby'
import { WinningFeed } from './components/WinningFeed'
import { BottomNav } from './components/BottomNav'
import { WinGoGame } from './components/WinGoGame'
import { AviatorGame } from './components/AviatorGame'
import { ChickenRoadGame } from './components/ChickenRoadGame'
import { MinesGame } from './components/MinesGame'
import { SpaceDefender } from './components/SpaceDefender'
import { ActivityView } from './components/ActivityView'
import { AccountView } from './components/AccountView'
import { WalletModal } from './components/WalletModal'
import { AuthModal } from './components/AuthModal'
import { AppDownloadModal } from './components/AppDownloadModal'
import './App.css'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'activity' | 'promotion' | 'wallet' | 'account'>('home')
  const [activeGame, setActiveGame] = useState<string | null>(null)

  // Wallet balance state (starts with demo ₹5,000 if new)
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('dhani_wallet_balance')
    return saved ? parseFloat(saved) : 5000.0
  })

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin')
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [walletModalTab, setWalletModalTab] = useState<'deposit' | 'withdraw'>('deposit')
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  // Save balance to localStorage
  const handleUpdateBalance = (newBal: number) => {
    const rounded = Math.max(0, parseFloat(newBal.toFixed(2)))
    setBalance(rounded)
    localStorage.setItem('dhani_wallet_balance', rounded.toString())
  }

  // Check Supabase session without blocking UI
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  const handleOpenWallet = (tab: 'deposit' | 'withdraw' = 'deposit') => {
    setWalletModalTab(tab)
    setWalletModalOpen(true)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const handlePlayGame = (gameId: string) => {
    if (gameId === 'wingo' || gameId === 'wingo_3m' || gameId === 'k3_lottery') {
      setActiveGame('wingo')
    } else if (gameId === 'aviator' || gameId === 'vortex') {
      setActiveGame('aviator')
    } else if (gameId === 'chicken_road') {
      setActiveGame('chicken_road')
    } else if (gameId === 'mines') {
      setActiveGame('mines')
    } else if (gameId === 'space_defender') {
      setActiveGame('space_defender')
    } else {
      setActiveGame('wingo')
    }
  }

  return (
    <div className="dhani-app-wrapper">
      <div className="dhani-phone-frame">
        {/* Top Header */}
        <Header
          user={user}
          balance={balance}
          onOpenAuth={handleOpenAuth}
          onOpenWallet={() => handleOpenWallet('deposit')}
          onSignOut={handleSignOut}
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        {/* Main Screen Content */}
        <main className="dhani-screen-body">
          {activeGame === 'wingo' ? (
            <WinGoGame
              onBack={() => setActiveGame(null)}
              balance={balance}
              onUpdateBalance={handleUpdateBalance}
            />
          ) : activeGame === 'aviator' ? (
            <AviatorGame
              onBack={() => setActiveGame(null)}
              balance={balance}
              onUpdateBalance={handleUpdateBalance}
            />
          ) : activeGame === 'chicken_road' ? (
            <ChickenRoadGame
              onBack={() => setActiveGame(null)}
              balance={balance}
              onUpdateBalance={handleUpdateBalance}
            />
          ) : activeGame === 'mines' ? (
            <MinesGame
              onBack={() => setActiveGame(null)}
              balance={balance}
              onUpdateBalance={handleUpdateBalance}
            />
          ) : activeGame === 'space_defender' ? (
            <SpaceDefender
              onBack={() => setActiveGame(null)}
              gamerName={user?.user_metadata?.full_name || 'Player'}
            />
          ) : activeNavTab === 'home' ? (
            <>
              <BannerSlider onSelectGame={handlePlayGame} />
              <QuickActions
                balance={balance}
                onOpenWallet={handleOpenWallet}
                onOpenCheckin={() => setActiveNavTab('activity')}
              />
              <GameLobby onPlayGame={handlePlayGame} />
              <WinningFeed />
            </>
          ) : activeNavTab === 'activity' || activeNavTab === 'promotion' ? (
            <ActivityView onClaimReward={(amt) => handleUpdateBalance(balance + amt)} />
          ) : activeNavTab === 'wallet' ? (
            <div className="tab-embedded-view">
              <div className="view-title-row">
                <h2>My Wallet Center</h2>
              </div>
              <div className="embedded-wallet-card">
                <span className="lbl">Total Assets</span>
                <span className="cash">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                <div className="wallet-btn-deck">
                  <button className="btn-act-dep" onClick={() => handleOpenWallet('deposit')}>
                    Recharge / Deposit
                  </button>
                  <button className="btn-act-wit" onClick={() => handleOpenWallet('withdraw')}>
                    Instant Withdrawal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <AccountView
              user={user}
              balance={balance}
              onOpenAuth={handleOpenAuth}
              onOpenWallet={handleOpenWallet}
              onSignOut={handleSignOut}
            />
          )}
        </main>

        {/* Bottom App Navigation */}
        <BottomNav
          activeTab={activeNavTab}
          onSelectTab={(t) => {
            setActiveGame(null)
            setActiveNavTab(t)
          }}
        />

        {/* Modals */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />

        <WalletModal
          isOpen={walletModalOpen}
          onClose={() => setWalletModalOpen(false)}
          balance={balance}
          onDeposit={(amt) => handleUpdateBalance(balance + amt)}
          onWithdraw={(amt) => handleUpdateBalance(balance - amt)}
          initialTab={walletModalTab}
        />

        <AppDownloadModal
          isOpen={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
        />
      </div>
    </div>
  )
}
