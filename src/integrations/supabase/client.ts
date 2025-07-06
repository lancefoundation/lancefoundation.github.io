import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = 'https://gzefinshznzvlpygghxj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZWZpbnNoem56dmxweWdnaHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjQyNDUsImV4cCI6MjA2NjgwMDI0NX0.qfvxqfRfVkk6s0aIYmgFSoQ_bNznEj-gi8OG5zRpp9M'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})