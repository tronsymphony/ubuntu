import Link from 'next/link';
import { Users, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Home() {
  // Mock data for initial UI
  const volunteerCount = 1248;
  const completedProjects = 156;

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 0', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--glass-bg)',
          borderRadius: '999px',
          border: '1px solid var(--glass-border)',
          color: 'var(--accent)',
          fontWeight: 500,
          marginBottom: '1rem'
        }}>
          <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
            <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: 'var(--accent)', opacity: 0.75 }}></span>
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', background: 'var(--accent)' }}></span>
          </span>
          Join {volunteerCount.toLocaleString()} Active Volunteers
        </div>

        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
          Make a difference <br />
          <span className="text-gradient">in your community.</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          VoluntHero connects passionate individuals with meaningful tasks and projects. 
          Sign up to track your impact, vote on future initiatives, and change the world.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Become a Volunteer <ArrowRight size={20} />
          </Link>
          <Link href="/projects" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            View Projects
          </Link>
        </div>
      </section>

      {/* Stats / Features Section */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        padding: '4rem 0'
      }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Users size={24} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{volunteerCount}+ Heroes</h3>
          <p style={{ color: 'var(--text-muted)' }}>A growing community of dedicated volunteers ready to tackle any challenge.</p>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Secure & Verified</h3>
          <p style={{ color: 'var(--text-muted)' }}>All our volunteers are authenticated. Your privacy and safety are our top priorities.</p>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(244, 114, 182, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6' }}>
            <Heart size={24} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{completedProjects} Projects Done</h3>
          <p style={{ color: 'var(--text-muted)' }}>From local cleanups to educational workshops, see the real impact we've made.</p>
        </div>
      </section>

      {/* Ping Animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}} />
    </div>
  );
}
