import React, { useState } from 'react'
import { Gift, Crown, Share2, CheckCircle2, Copy } from 'lucide-react'

interface ActivityViewProps {
  onClaimReward: (amt: number) => void
}

export const ActivityView: React.FC<ActivityViewProps> = ({ onClaimReward }) => {
  const [activeTab, setActiveTab] = useState<'checkin' | 'vip' | 'invite' | 'gift'>('checkin')
  const [giftCode, setGiftCode] = useState('')
  const [claimedDays, setClaimedDays] = useState<number[]>([1])
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const handleClaim = (day: number, amt: number) => {
    if (claimedDays.includes(day)) {
      showToast('Already claimed today!')
      return
    }
    setClaimedDays([...claimedDays, day])
    onClaimReward(amt)
    showToast(`Claimed Day ${day} reward: +₹${amt}!`)
  }

  const handleRedeemGift = () => {
    if (!giftCode.trim()) return
    onClaimReward(188)
    showToast('Gift Code redeemed! +₹188 bonus credited.')
    setGiftCode('')
  }

  return (
    <div className="dw-activity-container">
      {/* Tab Switcher */}
      <div className="activity-tab-bar">
        <button
          className={`act-tab ${activeTab === 'checkin' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkin')}
        >
          <Gift size={16} />
          <span>Daily Check-in</span>
        </button>
        <button
          className={`act-tab ${activeTab === 'vip' ? 'active' : ''}`}
          onClick={() => setActiveTab('vip')}
        >
          <Crown size={16} />
          <span>VIP Privileges</span>
        </button>
        <button
          className={`act-tab ${activeTab === 'invite' ? 'active' : ''}`}
          onClick={() => setActiveTab('invite')}
        >
          <Share2 size={16} />
          <span>Invitation Rebate</span>
        </button>
      </div>

      {toast && (
        <div className="toast-notification">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Checkin Content */}
      {activeTab === 'checkin' && (
        <div className="checkin-board">
          <div className="board-header">
            <h3>7-DAY LOGIN BONUSES</h3>
            <p>Consecutive check-in unlocks higher rewards and VIP lucky spins!</p>
          </div>
          <div className="days-grid">
            {[
              { day: 1, amt: 20 },
              { day: 2, amt: 50 },
              { day: 3, amt: 100 },
              { day: 4, amt: 200 },
              { day: 5, amt: 350 },
              { day: 6, amt: 500 },
              { day: 7, amt: 1000 },
            ].map((d) => {
              const isClaimed = claimedDays.includes(d.day)
              return (
                <div key={d.day} className={`day-card ${isClaimed ? 'claimed' : ''}`}>
                  <span className="day-name">Day {d.day}</span>
                  <div className="day-coin">🪙</div>
                  <span className="day-amt">₹{d.amt}</span>
                  <button
                    className={`btn-claim ${isClaimed ? 'done' : ''}`}
                    onClick={() => handleClaim(d.day, d.amt)}
                    disabled={isClaimed}
                  >
                    {isClaimed ? 'Claimed' : 'Collect'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Gift Code Box */}
          <div className="gift-code-card">
            <h4>Redeem Promo Gift Code</h4>
            <div className="gift-input-row">
              <input
                type="text"
                placeholder="Enter secret code (e.g. DHANI888)"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
              />
              <button onClick={handleRedeemGift}>Redeem Code</button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Content */}
      {activeTab === 'vip' && (
        <div className="vip-board">
          <div className="current-vip-card">
            <div className="vip-left">
              <span className="vip-tag">CURRENT LEVEL</span>
              <h2>VIP LEVEL 1 MEMBER</h2>
              <p>Experience: 1,200 / 5,000 XP</p>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div className="vip-trophy">👑</div>
          </div>

          <div className="vip-perks-grid">
            <div className="perk-card">
              <span className="perk-title">Monthly Salary</span>
              <span className="perk-val">₹5,000 / mo</span>
            </div>
            <div className="perk-card">
              <span className="perk-title">Level Up Gift</span>
              <span className="perk-val">₹888 Cash</span>
            </div>
            <div className="perk-card">
              <span className="perk-title">Withdrawal Speed</span>
              <span className="perk-val">Priority 3 Mins</span>
            </div>
            <div className="perk-card">
              <span className="perk-title">Daily Cashback</span>
              <span className="perk-val">Up to 2.5%</span>
            </div>
          </div>
        </div>
      )}

      {/* Invite Rebate */}
      {activeTab === 'invite' && (
        <div className="invite-board">
          <div className="invite-hero">
            <h3>INVITE FRIENDS & EARN REBATES</h3>
            <p>Earn up to 30% commission on every bet your invited friends make!</p>
          </div>

          <div className="referral-box">
            <span className="ref-lbl">Your Exclusive Invitation Link:</span>
            <div className="ref-input-group">
              <input readOnly value="https://sandeepsah70.github.io/game/?ref=VIP777" />
              <button onClick={() => showToast('Invitation link copied!')}>
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>

          <div className="tiers-row">
            <div className="tier-card">
              <span className="t-name">Tier 1 Friends</span>
              <span className="t-pct">30% Rebate</span>
            </div>
            <div className="tier-card">
              <span className="t-name">Tier 2 Friends</span>
              <span className="t-pct">20% Rebate</span>
            </div>
            <div className="tier-card">
              <span className="t-name">Tier 3 Friends</span>
              <span className="t-pct">10% Rebate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
