import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import { Auth } from './components/Auth'
import { Dashboard } from './components/Dashboard'
import { Gamepad2, RefreshCw } from 'lucide-react'
import './App.css'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <Gamepad2 className="pulse-icon" size={48} />
          <p className="loading-text">
            <RefreshCw className="spin-icon inline-spin" size={16} /> Loading Game Arena...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {user ? <Dashboard user={user} /> : <Auth />}
    </div>
  )
}
