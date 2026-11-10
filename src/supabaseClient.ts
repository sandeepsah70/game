import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://lvegqboxssrwuysrqvwl.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZWdxYm94c3Nyd3V5c3JxdndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyODM4NDcsImV4cCI6MjEwOTg1OTg0N30.nVdX7w11Qr46Pmn6BjPkXxCvd1iiP3VOgpC-RON2tjI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
