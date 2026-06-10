'use client';

import { BookOpen } from 'lucide-react';

const articles = [
  { id: 1, title: 'How to Organize a Local Cleanup', excerpt: 'A step-by-step guide to gathering volunteers, securing permits, and ensuring safety during a neighborhood cleanup.', readTime: '5 min' },
  { id: 2, title: 'Understanding the Impact of Food Banks', excerpt: 'Discover how food banks operate and the tangible difference they make in fighting food insecurity in urban areas.', readTime: '8 min' },
  { id: 3, title: 'Effective Communication in Volunteer Teams', excerpt: 'Learn the best practices for coordinating with fellow volunteers to execute projects flawlessly.', readTime: '6 min' },
];

export default function ArticlesPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Educational Resources</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Learn about the causes we support and how you can maximize your impact as a volunteer.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {articles.map(article => (
          <div key={article.id} className="glass-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
              <BookOpen size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{article.readTime} read</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{article.title}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>{article.excerpt}</p>
            <div style={{ marginTop: '1.5rem', color: 'var(--accent)', fontWeight: 600 }}>
              Read more →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
