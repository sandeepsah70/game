import React, { useState } from 'react'
import { X, Download, ShieldCheck, Smartphone, CheckCircle2 } from 'lucide-react'

interface AppDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  if (!isOpen) return null

  const handleStartDownload = () => {
    setDownloading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setDownloading(false)
          return 100
        }
        return p + 20
      })
    }, 250)
  }

  return (
    <div className="dw-modal-backdrop" onClick={onClose}>
      <div className="dw-modal-card download-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3>DOWNLOAD MOBILE APP</h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="download-hero">
          <div className="app-icon-badge">
            <Smartphone size={32} className="text-amber-400" />
          </div>
          <h4>Dhani.win Official App</h4>
          <p>Version 3.8.2 | Fast, Secure & Smooth Gaming Experience</p>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>100% Virus Free & Verified APK</span>
          </div>
          <div className="feature-item">
            <CheckCircle2 size={16} className="text-amber-400" />
            <span>Instant Notifications on High Multipliers</span>
          </div>
          <div className="feature-item">
            <CheckCircle2 size={16} className="text-purple-400" />
            <span>One-Click UPI & Crypto Instant Withdrawals</span>
          </div>
        </div>

        {downloading ? (
          <div className="download-progress-box">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span>Downloading APK ({progress}%)...</span>
          </div>
        ) : progress === 100 ? (
          <div className="download-complete-toast">
            ✅ <strong>Download Complete!</strong> Tap to install DhaniWin.apk
          </div>
        ) : (
          <button className="btn-download-apk" onClick={handleStartDownload}>
            <Download size={18} />
            <span>Download for Android (.apk)</span>
          </button>
        )}
      </div>
    </div>
  )
}
