'use client';

import { Heart, CreditCard, Coffee } from 'lucide-react';

export default function DonatePage() {
  const handleDonate = (amount: string) => {
    // In a real app, this would redirect to a Stripe Checkout Session URL or open a modal.
    alert(`Redirecting to Stripe Checkout for $${amount}...`);
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          Support Our Mission <Heart color="var(--error)" size={48} fill="var(--error)" />
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Your contributions help us fund community projects, supply our volunteers, and keep this platform running.
        </p>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Choose a Donation Amount</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className="btn btn-outline" 
            style={{ padding: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}
            onClick={() => handleDonate('10')}
          >
            $10
          </button>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}
            onClick={() => handleDonate('25')}
          >
            $25
          </button>
          <button 
            className="btn btn-outline" 
            style={{ padding: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}
            onClick={() => handleDonate('50')}
          >
            $50
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ color: 'var(--text-muted)' }}>or enter custom amount</span>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.25rem' }}>$</span>
            <input 
              type="number" 
              className="input-field" 
              placeholder="0.00" 
              style={{ paddingLeft: '2.5rem', fontSize: '1.25rem' }} 
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0 2rem' }} onClick={() => handleDonate('Custom')}>
            Donate
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={18} /> Secure via Stripe
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Coffee size={18} /> One-time or Monthly
          </div>
        </div>

      </div>
    </div>
  );
}
