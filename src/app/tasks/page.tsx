'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestedTasks, setRequestedTasks] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, [supabase]);

  const handleRequest = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to request a task.");
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update({ status: 'Assigned', assigned_to: user.id })
      .eq('id', id);

    if (!error) {
      // Optimistic UI update
      setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Assigned', assigned_to: user.id } : t));
      setRequestedTasks([...requestedTasks, id]);
    } else {
      alert("Failed to request task: " + error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Available Tasks</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Find a task that fits your skills and schedule. Request to undertake a task, and our coordinators will be in touch.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading live tasks...</div>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks available right now. Check back later!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {tasks.map(task => (
            <div key={task.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{task.title}</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1 }}>
                <p>{task.description}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--accent)' }}>
                  Status: {task.status}
                </div>
              </div>

              {requestedTasks.includes(task.id) || task.status !== 'Open' ? (
                <button className="btn" style={{ width: '100%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', cursor: 'default' }} disabled>
                  <CheckCircle size={20} /> Requested / Unavailable
                </button>
              ) : (
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleRequest(task.id)}>
                  Request Task
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
