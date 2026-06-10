import Image from 'next/image';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image 
            src="/logo.jpg" 
            alt="Sacred Geometry Eye Logo" 
            width={32} 
            height={32} 
            style={{ borderRadius: '50%', background: 'white' }} 
          />
          <span>Ubuntu</span>
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
