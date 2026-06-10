'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

const mockTasks = [
  { id: 1, title: 'Community Park Cleanup', date: '2026-06-15', duration: '4 hours', location: 'Riverside Park', urgency: 'High' },
  { id: 2, title: 'Elderly Tech Support', date: '2026-06-18', duration: '2 hours', location: 'Community Center', urgency: 'Medium' },
  { id: 3, title: 'Food Bank Distribution', date: '2026-06-20', duration: '5 hours', location: 'Downtown Shelter', urgency: 'High' },
];

export default function TasksPage() {
  const [requestedTasks, setRequestedTasks] = useState<number[]>([]);

  const handleRequest = (id: number) => {
    // In a real app, this would check if user is logged in, and if so, send a request to Supabase.
    // For now, we mock the UI interaction.
    setRequestedTasks([...requestedTasks, id]);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Available Tasks</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Find a task that fits your skills and schedule. Request to undertake a task, and our coordinators will be in touch.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {mockTasks.map(task => (
          <div key={task.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{task.title}</h2>
              {task.urgency === 'High' && (
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)', borderRadius: '999px', fontWeight: 600 }}>
                  Urgent
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} /> {task.date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} /> {task.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> {task.location}
              </div>
            </div>

            {requestedTasks.includes(task.id) ? (
              <button className="btn" style={{ width: '100%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', cursor: 'default' }} disabled>
                <CheckCircle size={20} /> Requested
              </button>
            ) : (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleRequest(task.id)}>
                Request Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
