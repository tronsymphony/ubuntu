'use client';

import { useState } from 'react';
import { ThumbsUp, CheckCircle, Lightbulb } from 'lucide-react';

const proposedProjects = [
  { id: 1, title: 'City-wide Tree Planting', description: 'Planting 1000 trees across various neighborhoods to improve air quality.', votes: 245 },
  { id: 2, title: 'Youth Coding Bootcamp', description: 'A 4-week free weekend bootcamp for underprivileged youth to learn HTML/CSS.', votes: 189 },
];

const accomplishedProjects = [
  { id: 3, title: 'River Cleanup 2025', description: 'Removed 2 tons of plastic from the local river system.', date: 'Dec 2025' },
  { id: 4, title: 'Winter Coat Drive', description: 'Distributed over 500 coats to families in need during the winter freeze.', date: 'Jan 2026' },
];

export default function ProjectsPage() {
  const [votedProjects, setVotedProjects] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'future' | 'accomplished'>('future');

  const handleVote = (id: number) => {
    // Check auth in real app
    if (!votedProjects.includes(id)) {
      setVotedProjects([...votedProjects, id]);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Our Projects</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Vote on future initiatives or browse our history of making a positive impact.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <button 
          className={`btn ${activeTab === 'future' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('future')}
        >
          <Lightbulb size={20} /> Proposed Projects
        </button>
        <button 
          className={`btn ${activeTab === 'accomplished' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('accomplished')}
        >
          <CheckCircle size={20} /> Accomplished
        </button>
      </div>

      {activeTab === 'future' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {proposedProjects.map(project => {
            const isVoted = votedProjects.includes(project.id);
            return (
              <div key={project.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    className="btn" 
                    style={{ 
                      background: isVoted ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                      color: isVoted ? 'white' : 'var(--text-main)',
                      padding: '1rem',
                      borderRadius: '50%'
                    }}
                    onClick={() => handleVote(project.id)}
                  >
                    <ThumbsUp size={24} />
                  </button>
                  <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{project.votes + (isVoted ? 1 : 0)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'accomplished' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {accomplishedProjects.map(project => (
            <div key={project.id} className="glass-panel" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                <CheckCircle size={24} />
                <span style={{ fontWeight: 600 }}>{project.date}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
