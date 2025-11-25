'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [myDecks, setMyDecks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
        router.push('/login');
        return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    fetch('/api/decks')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((d: any) => d.userId === parsedUser.id);
        setMyDecks(filtered);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="bg-white text-dark p-4 rounded-4 mb-4 shadow-sm border d-flex justify-content-between align-items-center">
        <div>
            <h2 className="fw-bold mb-1">Halo, {user.username}</h2>
            <p className="text-muted mb-0">Selamat datang di dashboard deck kamu.</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger fw-bold rounded-pill px-4">Logout</button>
      </div>

      <h5 className="mb-3 border-bottom pb-2 fw-bold text-secondary">Deck Buatan Saya ({myDecks.length})</h5>
      
      {myDecks.length === 0 && (
          <div className="alert alert-light border text-center py-5">
              <p className="mb-3 text-muted">Kamu belum membuat deck.</p>
              <a href="/create" className="btn btn-primary rounded-pill px-4">Buat Sekarang</a>
          </div>
      )}

      <div className="row g-3">
        {myDecks.map((deck) => (
           <div key={deck.id} className="col-md-6 mb-3">
             <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-1 fw-bold">{deck.name}</h6>
                        <small className="text-muted">Avg Elixir: {deck.averageElixir}</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">Active</span>
                </div>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}