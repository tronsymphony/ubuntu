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
            alt="Ubuntu Geometric Logo" 
            width={48} 
            height={48} 
            style={{ borderRadius: '50%', objectFit: 'cover' }} 
          />
          <span>Ubuntu</span>
        </Link>
        <div className="nav-links">
          <Link href="/tasks" className="nav-link">Tasks</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/articles" className="nav-link">Articles</Link>
          <Link href="/donate" className="nav-link text-gradient" style={{ fontWeight: 600 }}>Donate</Link>
          <Link href="/login" className="nav-link">Login</Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>Sign Up</Link>
          <Link href="/profile" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
            <UserCircle size={18} />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
