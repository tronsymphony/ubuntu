'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ManageUsersPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProfiles(data);
    setLoading(false);
  }

  const updateRole = async (id: string, newRole: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);
    
    if (!error) {
      fetchProfiles();
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Manage Users</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Promote trusted volunteers to Administrators, or demote them back to Members.
      </p>
      
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</p>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>User ID</th>
                <th style={{ padding: '1rem' }}>Points</th>
                <th style={{ padding: '1rem' }}>Current Role</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {profile.id}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>
                    {profile.engagement_points}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      color: profile.role === 'Administrator' ? 'var(--accent)' : 'inherit',
                      background: profile.role === 'Administrator' ? 'rgba(217, 119, 6, 0.1)' : 'transparent',
                      padding: profile.role === 'Administrator' ? '0.25rem 0.5rem' : '0',
                      borderRadius: '4px',
                      fontWeight: profile.role === 'Administrator' ? 600 : 400
                    }}>
                      {profile.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    {profile.role === 'Member' ? (
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem', background: 'rgba(217, 119, 6, 0.2)', color: 'var(--accent)' }} 
                        onClick={() => updateRole(profile.id, 'Administrator')}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }} 
                        onClick={() => updateRole(profile.id, 'Member')}
                      >
                        Remove Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
