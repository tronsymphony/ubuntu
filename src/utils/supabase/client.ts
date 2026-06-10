import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // We use placeholder strings so the app doesn't crash before the user adds their environment variables.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
