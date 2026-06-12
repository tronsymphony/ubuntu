'use client';

import { ShieldAlert, Users, PlusCircle, Settings } from 'lucide-react';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <ShieldAlert size={40} color="var(--accent)" />
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>Administrator Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage volunteers, tasks, projects, and articles securely.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Users size={24} color="var(--accent)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Manage Users</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Review new sign-ups, manage roles, and monitor user engagement metrics.</p>
          <Link href="/admin/users/manage" className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', borderColor: 'var(--accent)', color: 'var(--accent)' }}>View Users Database</Link>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <PlusCircle size={24} color="var(--success)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create Content</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/admin/tasks/manage" className="btn btn-outline" style={{ justifyContent: 'center' }}>Manage Tasks</Link>
            <Link href="/admin/projects/manage" className="btn btn-outline" style={{ justifyContent: 'center' }}>Manage Projects</Link>
            <Link href="/admin/tasks/new" className="btn btn-outline" style={{ justifyContent: 'center' }}>Post New Task</Link>
            <Link href="/projects/new" className="btn btn-outline" style={{ justifyContent: 'center' }}>Propose Project</Link>
            <Link href="/admin/articles/new" className="btn btn-outline" style={{ justifyContent: 'center' }}>Publish Article</Link>
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Settings size={24} color="var(--text-muted)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>System Settings</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Configure Stripe API keys, Supabase webhooks, and application defaults.</p>
          <button className="btn btn-outline" style={{ width: '100%' }}>Go to Settings</button>
        </div>

      </div>
    </div>
  );
}
