import Link from 'next/link';
import { UserCircle, HeartHandshake } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HeartHandshake color="var(--accent)" size={28} />
          <span>VoluntHero</span>
        </Link>
        <div className="nav-links">
          <Link href="/tasks" className="nav-link">Tasks</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/articles" className="nav-link">Articles</Link>
          <Link href="/donate" className="nav-link text-gradient" style={{ fontWeight: 600 }}>Donate</Link>
          <Link href="/profile" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
