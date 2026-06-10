'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('vote_count', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  }

  const updateStatus = async (id: string, newStatus: string) => {
    // Need admin role check in RLS to allow this!
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) {
      fetchProjects();
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Manage Projects</h1>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Project Title</th>
                <th style={{ padding: '1rem' }}>Votes</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem' }}>{project.title}</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{project.vote_count}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: project.status === 'Accomplished' ? 'var(--success)' : project.status === 'Approved' ? 'var(--accent)' : 'inherit' }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {project.status === 'Proposed' && (
                      <button className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent)' }} onClick={() => updateStatus(project.id, 'Approved')}>
                        Approve
                      </button>
                    )}
                    {project.status !== 'Accomplished' && (
                      <button className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }} onClick={() => updateStatus(project.id, 'Accomplished')}>
                        Accomplished
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
