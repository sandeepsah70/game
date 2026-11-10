import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Mail, Lock, User, Eye, EyeOff, Gamepad2, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

interface AuthProps {
  onSuccess?: () => void
}

export const Auth: React.FC<AuthProps> = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
      setErrorMessage('Please enter your email address.')
      return
    }

    if (mode === 'forgot') {
      try {
        setLoading(true)
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        })
        if (error) throw error
        setSuccessMessage('Password reset link has been sent to your email!')
      } catch (err: unknown) {
        const error = err as { message?: string }
        setErrorMessage(error?.message || 'Failed to send password reset email.')
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
            data: {
              full_name: fullName.trim() || undefined,
            },
          },
        })

        if (error) throw error

        if (data.session) {
          setSuccessMessage('Account created successfully! Logging you in...')
        } else {
          setSuccessMessage(
            'Account created! Please check your email to verify and activate your account.'
          )
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
        setSuccessMessage('Login successful! Redirecting to game hub...')
      } catch (err: unknown) {
        const error = err as { message?: string }
        setErrorMessage(error?.message || 'Invalid email or password.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Header Icon & Title */}
        <div className="auth-header">
          <div className="auth-badge">
            <Gamepad2 className="auth-icon-game" size={32} />
          </div>
          <h2 className="auth-title">
            {mode === 'signin' && 'Welcome Back, Gamer!'}
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'signin' && 'Log in with your Supabase credentials to jump in'}
            {mode === 'signup' && 'Join the gaming community in seconds'}
            {mode === 'forgot' && 'Enter your email to receive a recovery link'}
          </p>
        </div>

        {/* Tab switchers */}
        {mode !== 'forgot' && (
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'signin' ? 'active' : ''}`}
              onClick={() => switchMode('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Notifications */}
        {errorMessage && (
          <div className="auth-alert error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert success">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label>Full Name / Gamer Tag</label>
              <div className="input-box">
                <User size={18} className="field-icon" />
                <input
                  type="text"
                  placeholder="e.g. ShadowHunter"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-box">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                placeholder="player@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => switchMode('forgot')}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="input-box">
                <Lock size={18} className="field-icon" />
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
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-box">
                <Lock size={18} className="field-icon" />
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

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-wrapper">
                <RefreshCw className="spin-icon" size={18} />
                Processing...
              </span>
            ) : (
              <span className="btn-content">
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
                <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        {/* Footer toggles */}
        <div className="auth-footer">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-button highlight"
                onClick={() => switchMode('signup')}
              >
                Sign up now
              </button>
            </p>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-button highlight"
                onClick={() => switchMode('signin')}
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Remembered your password?{' '}
              <button
                type="button"
                className="link-button highlight"
                onClick={() => switchMode('signin')}
              >
                Back to Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
