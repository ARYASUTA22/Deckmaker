'use client'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateDeckPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [deckName, setDeckName] = useState('');
  const [avgElixir, setAvgElixir] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
        router.push('/login');
        return;
    }
    
    fetch('/api/clash/cards')
      .then(res => res.json())
      .then(data => {
        if(data.items) setCards(data.items);
      });
  }, []);

  useEffect(() => {
    if (selectedCards.length > 0) {
        const total = selectedCards.reduce((sum, card) => sum + (card.elixirCost || 0), 0);
        setAvgElixir(parseFloat((total / selectedCards.length).toFixed(1)));
    } else {
        setAvgElixir(0);
    }
  }, [selectedCards]);

  const toggleCard = (card: any) => {
    const exists = selectedCards.find((c) => c.id === card.id);
    if (exists) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else {
      if (selectedCards.length < 8) setSelectedCards([...selectedCards, card]);
      else alert("Maksimal 8 kartu! Hapus salah satu kartu untuk menggantinya.");
    }
  };

  const saveDeck = async () => {
    if (!deckName) return alert("Mohon isi nama deck terlebih dahulu.");
    if (selectedCards.length !== 8) return alert("Deck harus berisi tepat 8 kartu.");
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        alert("Sesi tidak valid.");
        router.push('/login');
        return;
    }
    const user = JSON.parse(userStr);

    setIsSaving(true); 

    try {
      const res = await fetch('/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: deckName,
          cardData: selectedCards.map(c => ({ name: c.name, image: c.iconUrls.medium })),
          averageElixir: avgElixir,
          username: user.username 
        })
      });

      const result = await res.json();

      if (res.ok) {
        router.push('/profile');
      } else {
        console.error(result);
        alert(`Gagal menyimpan: ${result.error || "Terjadi kesalahan server."}`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan koneksi internet.");
    } finally {
      setIsSaving(false); 
    }
  };

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="row g-4">
      <div className="col-lg-4 mb-3">
        <div className="card shadow border-0 rounded-4 sticky-top" style={{top: '100px', zIndex: 100}}>
            <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-primary">Deck Builder</h5>
                
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold text-uppercase">Nama Deck</label>
                    <input 
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="Contoh: Hog Cycle 2.6..." 
                        value={deckName} 
                        onChange={e => setDeckName(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold text-uppercase">Cari Kartu</label>
                    <input 
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="Ketik nama kartu..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-between mb-4 gap-2">
                    <div className="text-center p-2 bg-light rounded flex-fill border">
                        <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>ELIXIR</small>
                        <span className="fw-bold fs-5 text-dark">{avgElixir}</span>
                    </div>
                    <div className="text-center p-2 bg-light rounded flex-fill border">
                        <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>KARTU</small>
                        <span className={`fw-bold fs-5 ${selectedCards.length === 8 ? 'text-success' : 'text-danger'}`}>
                            {selectedCards.length}/8
                        </span>
                    </div>
                </div>

                <button 
                    onClick={saveDeck} 
                    className="btn btn-primary w-100 py-2 fw-bold" 
                    disabled={selectedCards.length !== 8 || isSaving}
                >
                    {isSaving ? 'Menyimpan...' : 'Simpan Deck'}
                </button>

                {selectedCards.length > 0 && (
                    <div className="mt-4 pt-3 border-top">
                        <small className="text-muted mb-2 d-block">Preview:</small>
                        <div className="d-flex flex-wrap gap-1">
                            {selectedCards.map(c => (
                                <img key={c.id} src={c.iconUrls.medium} style={{width: '35px'}} alt={c.name} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card-scroll-area shadow-sm">
            <div className="d-flex justify-content-between align-items-center bg-white p-2 border-bottom sticky-top mb-3">
                <h6 className="mb-0 fw-bold">Pilih Kartu</h6>
                <small className="text-muted">{filteredCards.length} kartu tersedia</small>
            </div>
            
            <div className="clash-card-grid">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => {
                        const isSelected = selectedCards.find((c) => c.id === card.id);
                        return (
                            <div 
                                key={card.id} 
                                className={`clash-card-item ${isSelected ? 'selected' : ''}`} 
                                onClick={() => toggleCard(card)}
                            >
                                <img src={card.iconUrls.medium} alt={card.name} loading="lazy" />
                                <span className="elixir-badge">{card.elixirCost}</span>
                                {isSelected && (
                                    <div className="selected-overlay">
                                        <span className="fw-bold text-white fs-3">OK</span>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted">Kartu tidak ditemukan</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}