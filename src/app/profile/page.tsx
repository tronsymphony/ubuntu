import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Fetch user profile from database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'Member';
  const tasksAgreed = 0; // We'll query tasks table later if needed
  const engagementPoints = profile?.engagement_points || 0;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'var(--glass-bg)', 
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'var(--accent)'
          }}>
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{user.email}</h1>
            <span style={{ 
              background: 'rgba(139, 92, 246, 0.2)', 
              color: 'var(--accent)', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              {role}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Tasks Undertaken</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{tasksAgreed}</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Engagement Points</h3>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)' }}>{engagementPoints}</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Contact Info (Private)</h2>
          <p style={{ color: 'var(--text-muted)' }}>Email: {user.email}</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Phone: Not provided</p>
          
          {role === 'Administrator' && (
            <Link href="/admin" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center' }}>
              Go to Admin Dashboard
            </Link>
          )}

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
