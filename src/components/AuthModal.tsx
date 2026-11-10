import React, { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, Crown, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../supabaseClient'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'signin' | 'signup'
  onAuthSuccess?: () => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const clearMessages = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    clearMessages()
    setMode(newMode)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()

    if (!email) {
      setErrorMessage('Please enter your email.')
      return
    }

    if (mode === 'forgot') {
      try {
        setLoading(true)
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        })
        if (error) throw error
        setSuccessMessage('Password reset link sent to your email!')
      } catch (err: unknown) {
        const error = err as { message?: string }
        setErrorMessage(error?.message || 'Failed to send reset email.')
      } finally {
        setLoading(false)
      }
      return
    }

    if (!password) {
      setErrorMessage('Please enter your password.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.')
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName.trim() || undefined },
          },
        })

        if (error) throw error

        if (data.session) {
          setSuccessMessage('Account registered successfully! Logging you in...')
          setTimeout(() => {
            if (onAuthSuccess) onAuthSuccess()
            onClose()
          }, 1200)
        } else {
          setSuccessMessage('Account created! Please check your email to verify.')
        }
      } catch (err: unknown) {
        const error = err as { message?: string }
        setErrorMessage(error?.message || 'Failed to sign up.')
      } finally {
        setLoading(false)
      }
    } else {
      // Sign in
      try {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
        setSuccessMessage('Login successful!')
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess()
          onClose()
        }, 800)
      } catch (err: unknown) {
        const error = err as { message?: string }
        setErrorMessage(error?.message || 'Invalid email or password.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="dw-modal-backdrop" onClick={onClose}>
      <div className="dw-modal-card auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="auth-brand-logo">
            <Crown size={22} className="crown-gold" />
            <span>DHANI<span className="gold-accent">.WIN</span></span>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        {mode !== 'forgot' && (
          <div className="modal-tabs">
            <button
              className={`tab-btn ${mode === 'signin' ? 'active purple' : ''}`}
              onClick={() => switchMode('signin')}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${mode === 'signup' ? 'active purple' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Register
            </button>
          </div>
        )}

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="dw-auth-alert error">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="dw-auth-alert success">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="dw-auth-form">
          {mode === 'signup' && (
            <div className="dw-form-field">
              <label>Gamer Tag / Username</label>
              <div className="input-wrap">
                <User size={16} className="inp-icon" />
                <input
                  type="text"
                  placeholder="e.g. Winner777"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="dw-form-field">
            <label>Email Address</label>
            <div className="input-wrap">
              <Mail size={16} className="inp-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="dw-form-field">
              <div className="label-between">
                <label>Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    className="btn-forgot-link"
                    onClick={() => switchMode('forgot')}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="input-wrap">
                <Lock size={16} className="inp-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="dw-form-field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <Lock size={16} className="inp-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <button type="submit" className="dw-btn-submit" disabled={loading}>
            {loading ? (
              <span className="btn-flex">
                <RefreshCw size={16} className="spin-icon" /> Processing...
              </span>
            ) : (
              <span className="btn-flex">
                {mode === 'signin' ? 'Log In' : mode === 'signup' ? 'Create Account' : 'Send Recovery'}
                <ArrowRight size={16} />
              </span>
            )}
          </button>
        </form>

        <div className="modal-bottom-hint">
          {mode === 'signin' ? (
            <p>
              New to Dhani.win?{' '}
              <button onClick={() => switchMode('signup')} className="txt-link">
                Register Free
              </button>
            </p>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => switchMode('signin')} className="txt-link">
                Log In
              </button>
            </p>
          ) : (
            <p>
              <button onClick={() => switchMode('signin')} className="txt-link">
                Back to Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

