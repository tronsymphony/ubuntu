'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
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
      setError('You must be logged in to post a task.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('tasks')
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
      router.push('/tasks');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="input-label">Task Title</label>
            <input 
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="input-label">Description (Location, Time, Details)</label>
            <textarea 
              className="input-field" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              rows={4}
            />
          </div>

          {error && <div style={{ color: 'var(--error)', fontSize: '0.875rem' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
