import React, { useState } from 'react'
import { X, ArrowDownToLine, ArrowUpFromLine, CheckCircle2, ShieldCheck } from 'lucide-react'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  balance: number
  onDeposit: (amt: number) => void
  onWithdraw: (amt: number) => void
  initialTab?: 'deposit' | 'withdraw'
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  onDeposit,
  onWithdraw,
  initialTab = 'deposit',
}) => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>(initialTab)
  const [amount, setAmount] = useState(500)
  const [upiId, setUpiId] = useState('')
  const [successToast, setSuccessToast] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAction = () => {
    if (tab === 'deposit') {
      onDeposit(amount)
      setSuccessToast(`₹${amount} deposited successfully with +100% bonus!`)
      setTimeout(() => {
        setSuccessToast(null)
        onClose()
      }, 1500)
    } else {
      if (balance < amount) {
        alert('Insufficient balance to withdraw!')
        return
      }
      onWithdraw(amount)
      setSuccessToast(`Withdrawal of ₹${amount} submitted to UPI!`)
      setTimeout(() => {
        setSuccessToast(null)
        onClose()
      }, 1500)
    }
  }

  return (
    <div className="dw-modal-backdrop" onClick={onClose}>
      <div className="dw-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3>WALLET MANAGEMENT</h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Current Balance Box */}
        <div className="modal-balance-box">
          <span className="lbl">Available Balance</span>
          <span className="val">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${tab === 'deposit' ? 'active green' : ''}`}
            onClick={() => setTab('deposit')}
          >
            <ArrowDownToLine size={16} />
            <span>Deposit</span>
          </button>
          <button
            className={`tab-btn ${tab === 'withdraw' ? 'active purple' : ''}`}
            onClick={() => setTab('withdraw')}
          >
            <ArrowUpFromLine size={16} />
            <span>Withdraw</span>
          </button>
        </div>

        {/* Channel Selection */}
        <div className="payment-channels">
          <label className="section-label">Payment Channel</label>
          <div className="channel-chips">
            <span className="channel-chip active">Instant UPI / QR ⚡</span>
            <span className="channel-chip">PayTM / PhonePe</span>
            <span className="channel-chip">IMPS Bank</span>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="amount-section">
          <label className="section-label">Select Amount (INR)</label>
          <div className="amount-chips">
            {[200, 500, 1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                className={`amt-btn ${amount === amt ? 'active' : ''}`}
                onClick={() => setAmount(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {tab === 'withdraw' && (
          <div className="input-group">
            <label className="section-label">Enter UPI ID / VPA</label>
            <input
              type="text"
              placeholder="e.g. mobile@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="wallet-input"
            />
          </div>
        )}

        {/* Security / Bonus Tag */}
        <div className="security-notice">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>
            {tab === 'deposit'
              ? 'First deposit gets +100% bonus credited instantly.'
              : 'Safe & encrypted payouts processed within 5-10 minutes.'}
          </span>
        </div>

        {/* Toast */}
        {successToast && (
          <div className="modal-success-toast">
            <CheckCircle2 size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* Action Button */}
        <button className={`btn-primary-action ${tab}`} onClick={handleAction}>
          {tab === 'deposit' ? `Confirm Deposit ₹${amount}` : `Confirm Withdrawal ₹${amount}`}
        </button>
      </div>
    </div>
  )
}
