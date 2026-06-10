'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      setError('You must be logged in as an Administrator.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('articles')
      .insert([
        { 
          title, 
          content, 
          author_id: user.id 
        }
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/articles');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>
          Publish Educational Article
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="input-label">Article Title</label>
            <input 
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="input-label">Content (Markdown supported in future)</label>
            <textarea 
              className="input-field" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              rows={10}
            />
          </div>

          {error && <div style={{ color: 'var(--error)', fontSize: '0.875rem' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
