'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedProjects, setVotedProjects] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'future' | 'accomplished'>('future');
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjectsAndVotes() {
      const [{ data: projectsData }, { data: { user } }] = await Promise.all([
        supabase.from('projects').select('*').order('vote_count', { ascending: false }),
        supabase.auth.getUser()
      ]);
      
      if (projectsData) setProjects(projectsData);

      if (user) {
        const { data: votesData } = await supabase
          .from('votes')
          .select('project_id')
          .eq('user_id', user.id);
        
        if (votesData) {
          setVotedProjects(votesData.map(v => v.project_id));
        }
      }
      setLoading(false);
    }
    fetchProjectsAndVotes();
  }, [supabase]);

  const handleVote = async (id: string) => {
    if (votedProjects.includes(id)) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to vote.");
      return;
    }

    const { error } = await supabase
      .from('votes')
      .insert([{ project_id: id, user_id: user.id }]);

    if (!error || error.code === '23505') { // 23505 is unique violation, means they already voted
      setVotedProjects([...votedProjects, id]);
    } else {
      alert("Failed to record vote: " + error.message);
    }
  };

  const proposedProjects = projects.filter(p => p.status === 'Proposed');
  const accomplishedProjects = projects.filter(p => p.status === 'Accomplished');

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Our Projects</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Vote on future initiatives or browse our history of making a positive impact.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <Link href="/projects/new" className="btn btn-primary" style={{ fontSize: '1.125rem' }}>
          + Propose a New Project
        </Link>
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

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading live projects...</div>
      ) : activeTab === 'future' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {proposedProjects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No proposed projects yet.</p>}
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
                  <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{project.vote_count + (isVoted ? 1 : 0)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {accomplishedProjects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>No accomplished projects recorded yet.</p>}
          {accomplishedProjects.map(project => (
            <div key={project.id} className="glass-panel" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                <CheckCircle size={24} />
                <span style={{ fontWeight: 600 }}>Completed</span>
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
