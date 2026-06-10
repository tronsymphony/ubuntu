'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button 
      className="btn btn-outline" 
      style={{ color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.3)', width: '100%' }} 
      onClick={handleLogout}
    >
      <LogOut size={20} />
      <span>Sign Out</span>
    </button>
  );
}
