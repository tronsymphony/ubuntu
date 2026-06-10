'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProposeProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to propose a project.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('projects')
      .insert([
        { 
          title, 
          description, 
          created_by: user.id 
        }
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/projects');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
          Propose a New Project
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
          Have an idea to improve the community? Submit it here for other volunteers to vote on.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="input-label">Project Title</label>
            <input 
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="e.g. City Park Cleanup"
            />
          </div>
          
          <div>
            <label className="input-label">Description</label>
            <textarea 
              className="input-field" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              rows={5}
              placeholder="Describe the project, its goals, and why it's important..."
            />
          </div>

          {error && <div style={{ color: 'var(--error)', fontSize: '0.875rem' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      </div>
    </div>
  );
}
