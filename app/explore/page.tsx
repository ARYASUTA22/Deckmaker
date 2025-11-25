'use client';
import { useState, useEffect } from 'react';

export default function ExplorePage() {
  const [decks, setDecks] = useState<any[]>([]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetch(`/api/decks?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => setDecks(data));
  }, [sort]);

  return (
    <div className="container mt-4">
      {/* Header Explore */}
      <div className="p-4 mb-4 bg-white rounded-4 shadow-sm border d-flex justify-content-between align-items-center">
        <div>
            <h4 className="fw-bold mb-1 text-primary">Explore Decks</h4>
            <p className="mb-0 text-muted small">Temukan strategi terbaik dari pemain lain.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
            <label className="fw-bold small text-muted text-uppercase">Urutkan:</label>
            <select className="form-select form-select-sm w-auto cursor-pointer border-0 bg-light fw-bold" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="elixir_asc">Elixir Terendah</option>
                <option value="elixir_desc">Elixir Tertinggi</option>
            </select>
        </div>
      </div>

      {/* Grid Decks */}
      <div className="row g-4">
        {decks.map((deck) => {
          const cards = JSON.parse(deck.cards);
          return (
            <div key={deck.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm card-hover rounded-4 overflow-hidden">
                <div className="card-header bg-white border-bottom-0 pt-3 px-3 d-flex justify-content-between align-items-start">
                    <div>
                        <h6 className="card-title fw-bold text-dark mb-1">{deck.name}</h6>
                        <p className="card-subtitle text-muted small">
                            by {deck.user?.username || 'Anonim'}
                        </p>
                    </div>
                    <span className="badge bg-light text-primary border">
                        Avg: <span className="fw-bold">{deck.averageElixir}</span>
                    </span>
                </div>

                <div className="card-body px-3 pb-3">
                  <div className="d-flex flex-wrap gap-1 justify-content-center bg-light p-2 rounded-3">
                    {cards.map((c: any, i: number) => (
                      <img key={i} src={c.image} style={{width: '19%'}} className="rounded shadow-sm" alt={c.name} />
                    ))}
                  </div>
                </div>

                <div className="card-footer bg-white border-top-0 pb-3 text-end">
                   <small className="text-muted fst-italic" style={{fontSize: '0.7rem'}}>
                      {new Date(deck.createdAt).toLocaleDateString()}
                   </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}