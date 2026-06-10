'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ManageTasksPage() {
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*, assignee:profiles!tasks_assigned_to_fkey(full_name)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(error);
    }
    
    if (data) setTasks(data);
    setLoading(false);
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus, assigned_to: newStatus === 'Open' ? null : undefined })
      .eq('id', id);
    
    if (!error) {
      fetchTasks();
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Manage Tasks</h1>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Assigned To</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem' }}>{task.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: task.status === 'Completed' ? 'var(--success)' : task.status === 'Assigned' ? 'var(--accent)' : 'inherit' }}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    {task.assignee?.full_name || task.assigned_to?.substring(0, 8) || 'Unassigned'}
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {task.status !== 'Completed' && (
                      <button className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }} onClick={() => updateStatus(task.id, 'Completed')}>
                        Complete
                      </button>
                    )}
                    {task.status !== 'Open' && (
                      <button className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)' }} onClick={() => updateStatus(task.id, 'Open')}>
                        Unassign
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
