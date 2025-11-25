'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    
    const user = await res.json();
    if (user.id) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/create'); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Clash Deck Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Masukkan nama kamu..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Masuk / Daftar</button>
        </form>
      </div>
    </div>
  );
}