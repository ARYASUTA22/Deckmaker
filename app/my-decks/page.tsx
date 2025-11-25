'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyDecksPage() {
  const [decks, setDecks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/decks')
      .then((res) => res.json())
      .then((data) => setDecks(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Koleksi Deck Tersimpan</h2>
        <Link href="/explore" className="btn btn-primary">+ Buat Baru</Link>
      </div>

      {decks.length === 0 && <p className="text-center text-muted">Belum ada deck tersimpan.</p>}

      {decks.map((deck) => {
        const cards = JSON.parse(deck.cards); 

        return (
          <div key={deck.id} className="card mb-4 shadow border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0 fw-bold">{deck.name}</h5>
                <small className="text-muted">Dibuat oleh: {deck.user?.username} pada {new Date(deck.createdAt).toLocaleDateString()}</small>
              </div>
              <span className="badge bg-info text-dark">8 Kartu</span>
            </div>
            <div className="card-body bg-light">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {cards.map((card: any, idx: number) => (
                  <div key={idx} className="text-center" style={{width: '70px'}}>
                    <img src={card.image} alt={card.name} className="img-fluid drop-shadow" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}