'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, [supabase]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Educational Resources</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Learn about the causes we support and how you can maximize your impact as a volunteer.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading live articles...</div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No articles published yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {articles.map(article => (
            <div key={article.id} className="glass-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                <BookOpen size={20} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Article</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{article.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>{article.content.slice(0, 150)}...</p>
              <div style={{ marginTop: '1.5rem', color: 'var(--accent)', fontWeight: 600 }}>
                Read more →
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
